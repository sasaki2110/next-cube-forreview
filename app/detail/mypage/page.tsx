
////////////////////////////////////////////////////////////////////////////////////////////////
//
// マイページ画面
//
////////////////////////////////////////////////////////////////////////////////////////////////
'use client'
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

import { useForm, SubmitHandler } from "react-hook-form"

// 後のエラー回避の為、type宣言
type Notification = {
  "notificationId": String,
  "date": String,
  "title": String,
  "content": String,
  "hasOpened": boolean;
}

// daialog用のタイプ宣言
type UserInfo = {
  name: string,
  phone: string,
  email: string,
  address: string,
  utype: string,
  cname: string,
  cphone: string,
  caddress: string,
}

/**
 * 環境変数をstring型で代入できるよう、typeチェック
 * @param str 環境変数
 * @returns string 型に限定した環境変数
 */
function etos(str:string | undefined):string {
  return(typeof(str)==="string"?str:"")
}

//------------------------------------------------------------------------------------
// ↓ ここから認証用設定
import { Amplify } from 'aws-amplify';

import {
  withAuthenticator,
  WithAuthenticatorProps,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { fetchAuthSession } from 'aws-amplify/auth';
import { AuthInfoContext } from "@/app/contexts/AuthContext";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: etos(process.env.NEXT_PUBLIC_COGNITO_APPCLIENTID),
      userPoolId: etos(process.env.NEXT_PUBLIC_COGNITO_USERPOOLID),
   }
  }
})

// ログインメカニズムをemailに設定するための変数
// なぜか"email"をloginMechanismsに代入しようとすると、
// エラーになるので、やむなく事前に型定義
const loginMechanisms:"email" | "phone_number" | "username" = "email";

// サインイン画面のフッターを、空にする為のコンポーネント
const components = {
  SignIn: {
    Footer() {
      return (<></>);
    },
  },
}

// 認証ラッパー（withAuthenticator）のオプション
const withAuthenticatorOptions = {
  // サインアップ画面を非表示
  hideSignUp: true,
  // ログインメカニズムをemailに設定
  loginMechanisms: [loginMechanisms],
  // パスワードをお忘れの方を消すために、フッターを空にする
  components: components
}

// 翻訳用多言語対応
import { I18n } from 'aws-amplify/utils';
import { useContext, useState } from "react";
// ↑ ここまで
//------------------------------------------------------------------------------------

/**
 * おしらせページ処理
 * @returns 画面表示するReactNode
 */
function App({ signOut, user }: WithAuthenticatorProps) {

  // -------------------------------------------------
  // ↓　ここからダイアログ関連

  // 情報受け渡し用のステート
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "磯野　かつお",
    phone: "090-1234-1234",
    email: "abcdefg@example.com",
    address: "-",
    utype: "法人",
    cname: "株式会社〇〇〇",
    cphone: "03-1234-1224",
    caddress: "",
  });

  // ダイアログのオープン状態を制御するステート
  const [open, setOpen] = useState(false);

  // useFormでフォーム部品を生成
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserInfo>()

  // onSubmitで呼び出す関数リテラルを定義
  const onSubmit: SubmitHandler<UserInfo> = (data) => {
    console.log(data);
    
    // 入力された値をコンテキストへ詰め替え
    setUserInfo(data);

    // ダイアログを閉じる
    setOpen(false);
  }


  // ↑　ここまでダイアログ関連
  // -------------------------------------------------

  // -------------------------------------------------
  // ↓　ここから認証情報関連

  // 認証情報保持用のコンテキスト
  const auth = useContext(AuthInfoContext);

  // カレントセッション取得
  async function currentSession() {
    try {
      const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};

      // 取得したトークンを、コンテキストへ詰め替え
      auth.idToken = idToken;
      auth.accessToken = accessToken;

    } catch (err) {
      console.log(err);
    }
  }
  currentSession();
  // ↑　ここまで認証情報関連
  // -------------------------------------------------


  // -------------------------------------------------
  // ↓ ここからAPI呼び出し関連
  // API（Lambda）のURLを設定（念のため、環境変数で定義）
  let url = etos(process.env.NEXT_PUBLIC_URL_GETCOSTMERS);
  
  // tanstackQuery呼び出し
  //   isPending:処理中
  //   error:エラー
  //   data:成功時のデータ
  const { isPending, error, data } = useQuery({
    queryKey: ['notifications'],
    queryFn: () =>
      fetch(url).then((res) => 
        res.json(),
      ),
  })

  // 処理中はリターン
  if (isPending) {
    console.debug("Loading...")
    return
  }

  // エラーもリターン
  if (error) {
    console.log('An error has occurred: ' + error.message)
    return 
  }

  // 戻り値の型を明確にするため、定数へ代入
  const notifications:Notification[] = data;
  // ↑　ここまでAPI呼び出し関連
  // -------------------------------------------------

  // 画面を描画してリターン
  return (
    <main className="container flex flex-col mx-auto px-2 md:px-24 pt-32 bg-gray-cube">
      
      {/* 動作確認用　サインアウトボタン */}
      <button onClick={signOut}>サインアウト（テスト用）</button>

      {/* タイトルエリア */}
      <div className="md:my-4 md:mx-2">
          <h1 className="text-3xl font-semibold text-blue-cube">マイページ</h1>
      </div>

      {/* お知らせエリア */}
      <div  className="md:my-4 md:mx-2 md:px-4 border-2 border-gray-cube rounded-md bg-white ">
          <h1 className="text-2xl font-semibold text-green-cube mx-8 my-8">お知らせ</h1>
          <hr className="mx-8 bg-green-cube"/>

            {/* toDo keyには何を設定すべきか？ shadcnカルーセルのサンプルが参考になりそう */}
            {notifications.map((notification) => (
            <div className="mx-2 md:mx-8 my-4 md:my-8 px-2 md:px-8 py-4 md:py-8 bg-gray-cube border rounded-xl" key={1}>
              <p className="text-grey-cube text-sm" >{notification.date}</p>
              <p className="text-grey-cube text-lg">{notification.title}</p>
            </div> 
          ))}
      </div>

      {/* お客様情報エリア */}
      <div  className="md:my-4 md:mx-2 md:px-4 border-2 border-gray-cube rounded-md bg-white ">
          <h1 className="text-2xl font-semibold text-green-cube mx-8 my-8">お客様情報</h1>
          <hr className="mx-8 bg-green-cube"/>

          
          {/* グリッド */}
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-5 mx-8 my-8 gap-4">
            {/* イメージエリア */}
            <div>
              <Image src={etos(process.env.NEXT_PUBLIC_IMAGE_ROOMTYPE1)} alt="店舗画像" width="200" height="100"/>
            </div>

            {/* 情報エリア１ */}
            <div className="col-span-2 grid grid-cols-2 grid-rows-4 mx-0 md:mx-8">
              <div className="text-sm">氏名</div><div>{userInfo.name}</div>
              <div className="text-sm">連絡先</div><div>{userInfo.phone}</div>
              <div className="text-sm">メールアドレス</div><div>{userInfo.email}</div>
              <div className="text-sm">住所</div><div>{userInfo.address}</div>
            </div>
            {/* 情報エリア２ */}
            <div className="col-span-2 grid grid-cols-2 grid-rows-4 mx-0 md:mx-8">
              <div className="text-sm">利用区分</div><div>{userInfo.utype}</div>
              <div className="text-sm">法人名</div><div>{userInfo.cname}</div>
              <div className="text-sm">法人連絡先</div><div>{userInfo.cphone}</div>
              <div className="text-sm">法人住所</div><div>{userInfo.caddress}</div>
            </div>
          </div>

          {/* ダイアログエリア */}
          <div className="text-center">
            <Dialog open={open} onOpenChange={setOpen}>

              {/* 主画面に表示する、ダイアログを開くボタン */}
              <DialogTrigger className="py-2 px-16 mb-10 rounded-lg text-green-cube border border-green-cube hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none ">
                お客様情報の変更
              </DialogTrigger>

              {/* ここからダイアログの中身 */}
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-green-cube">お客様情報変更</DialogTitle>
                </DialogHeader>

                {/* 入力フォーム */}
                <form onSubmit={handleSubmit(onSubmit)}>

                  <div className="grid grid-cols-3 grid-rows-9 mx-0 md:mx-8 gap-6 pt-8">
                    <div className="text-sm text-right">氏名：</div>
                    <div className="col-span-2">
                      <input className="border-2 rounded-md" 
                             defaultValue={userInfo.name}
                             {...register("name", { required: true })}
                      />
                      {errors.name && <span>　必須入力です。</span>}
                    </div>

                    <div className="text-sm text-right">連絡先：</div>
                    <div className="col-span-2">
                      <input className="border-2 rounded-md"
                             defaultValue={userInfo.phone}
                             {...register("phone", { required: true })}
                      />
                      {errors.phone && <span>　必須入力です。</span>}
                    </div>

                    <div className="text-sm  text-right">メールアドレス：</div>
                    <div className="col-span-2">
                      <input className="border-2 rounded-md"
                             defaultValue={userInfo.email}
                             {...register("email", { required: true })}
                      />
                      {errors.email && <span>　必須入力です。</span>}
                    </div>

                    <div className="text-sm text-right">住所：</div>
                    <div className="col-span-2">
                      <input className="border-2 rounded-md"
                             defaultValue={userInfo.address}
                             {...register("address", { required: true })}
                      />
                      {errors.address && <span>　必須入力です。</span>}
                    </div>

                    <div className="text-sm text-right">利用区分：</div>
                    <div className="col-span-2">
                      <input className="border-2 rounded-md"
                             defaultValue={userInfo.utype}
                             {...register("utype", { required: true })}
                      />
                      {errors.utype && <span>　必須入力です。</span>}
                    </div>

                    <div className="text-sm text-right">法人名：</div>
                    <div className="col-span-2">
                      <input className="border-2 rounded-md"
                             defaultValue={userInfo.cname}
                             {...register("cname", { required: true })}
                      />
                      {errors.cname && <span>　必須入力です。</span>}
                    </div>

                    <div className="text-sm text-right">法人連絡先：</div>
                    <div className="col-span-2">
                      <input className="border-2 rounded-md"
                             defaultValue={userInfo.cphone}
                             {...register("cphone", { required: true })}
                      />
                      {errors.cphone && <span>　必須入力です。</span>}
                    </div>

                    <div className="text-sm text-right">法人住所：</div>
                    <div className="col-span-2">
                      <input className="border-2 rounded-md"
                             defaultValue={userInfo.caddress}
                             {...register("caddress", { required: true })}
                      />
                      {errors.caddress && <span>　必須入力です。</span>}
                    </div>
                  </div>

                  <div className="col-span-2 text-center">
                    <button className="py-2 px-16 mb-4 rounded-lg text-green-cube border border-green-cube hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none "
                                type="submit"
                        >
                          入力内容を確定
                    </button>
                  </div>

                  <DialogFooter className="justify-center">
                    <DialogClose asChild>
                    </DialogClose>
                  </DialogFooter>
                </form>

              </DialogContent>
            </Dialog>
          </div>
      </div>      
    </main>
)
}
// 認証でラップしてexport
export default withAuthenticator(App, withAuthenticatorOptions);

// 翻訳用辞書（今回必要な分だけ定義）
const dict = {
  'ja': {
    'Email': 'メールアドレス',
    'Password': 'パスワード',
    'Sign In': 'サインイン',
   }
};

I18n.putVocabularies(dict);
I18n.setLanguage('ja');