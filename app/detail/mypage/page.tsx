
////////////////////////////////////////////////////////////////////////////////////////////////
//
// マイページ画面
//
////////////////////////////////////////////////////////////////////////////////////////////////
'use client'
import { useQuery } from "@tanstack/react-query"

// 後のエラー回避の為、type宣言
type Notification = {
  "notificationId": String,
  "date": String,
  "title": String,
  "content": String,
  "hasOpened": boolean;
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
import { useContext } from "react";
// ↑ ここまで
//------------------------------------------------------------------------------------

/**
 * おしらせページ処理
 * @returns 画面表示するReactNode
 */
function App({ signOut, user }: WithAuthenticatorProps) {
  // -------------------------------------------------
  // ↓　ここから認証情報関連

  // 認証情報保持用のコンテキスト
  const auth = useContext(AuthInfoContext);

  // カレントセッション取得
  async function currentSession() {
    try {
      const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
      console.log("accessToken = [" + accessToken + "]");
      console.log("idToken = [" + idToken + "]");

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

  // jwt確認用にお知らせを１個追加
  if(notifications.length<=2) {
    const addN1:Notification = {
      notificationId: "",
      date:"2023/12/11", 
      title: "idトークンは[" + JSON.stringify(auth.idToken) + "]です。",
      content: "",
      hasOpened: true,
    } 
    notifications.push(addN1);
    //const addN2:Notification = {date:"2023/12/11", title: "アクセストークンは[" + JSON.stringify(currentAccessToken) + "]です。"} 
    //notifications.push(addN2);
  }
  
  // 画面を描画してリターン
  return (
    <main className="container flex flex-col mx-auto px-2 md:px-24 pt-32 bg-gray-cube">
      
      {/* 動作確認用　サインアウトボタン */}
      <button onClick={signOut}>サインアウト（テスト用）</button>

      {/* タイトルエリア */}
      <div className="md:my-4 md:mx-2">
          <h1 className="text-3xl font-semibold text-blue-cube">マイページ</h1>
      </div>

      {/* 次にお知らせエリア */}
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