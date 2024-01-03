
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

//------------------------------------------------------------------------------------
// ↓ ここから認証用設定（JWT取得ができないなら、実装方法を変更要）
import { Amplify } from 'aws-amplify';

import {
  withAuthenticator,
  WithAuthenticatorProps,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: (typeof(process.env.NEXT_PUBLIC_COGNITO_APPCLIENTID)==="string")?process.env.NEXT_PUBLIC_COGNITO_APPCLIENTID:"",
      userPoolId: (typeof(process.env.NEXT_PUBLIC_COGNITO_USERPOOLID)==="string")?process.env.NEXT_PUBLIC_COGNITO_USERPOOLID:"",
   }
  }
})

const loginMechanisms:"email" | "phone_number" | "username" = "email";

const withAuthenticatorOptions = {
  hideSignUp: true,
  loginMechanisms: [loginMechanisms]
}

import { I18n } from 'aws-amplify/utils';
// ↑ ここまで
//------------------------------------------------------------------------------------

/**
 * おしらせページ処理
 * @returns 画面表示するReactNode
 */
function App({ signOut, user }: WithAuthenticatorProps) {

  // API（Lambda）のURLを設定（念のため、環境変数で定義）
  let url = (typeof(process.env.NEXT_PUBLIC_URL_GETCOSTMERS)==="string")?process.env.NEXT_PUBLIC_URL_GETCOSTMERS:"";
  
  console.log(url);

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
  console.log(data)

  // 画面を描画してリターン
  return (
    <main className="container flex flex-col mx-auto px-2 md:px-24 fbg-gray-cube">
    {/*<main className="flex flex-col min-h-screen px-2 md:px-24 py-2 md:py-12 bg-gray-cube">*/}
      
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

            {/* toDo keyには何を設定すべきか？ */}
            {notifications.map((notification) => (
            <div className="mx-2 md:mx-8 my-4 md:my-8 px-2 md:px-8 py-4 md:py-8 bg-gray-cube border rounded-xl" key={null}>
              <p className="text-grey-cube text-sm" >{notification.date}</p>
              <p className="text-grey-cube text-lg">{notification.title}</p>
            </div>           
          ))}

      </div>
    </main>
)
}
export default withAuthenticator(App, withAuthenticatorOptions);

const dict = {
  'ja': {
    'Back to Sign In': 'サインイン画面に戻る',
    'Confirm': '確認',
    'Confirm Password': 'パスワードの確認',
    'Confirm Sign Up': 'サインアップの確認',
    'Confirmation Code': '確認コード',
    'Create Account': '新規登録',
    'Create a new account': 'アカウントの新規登録',
    'Create account': '新規登録',
    'Email': 'メールアドレス',
    'Enter your code': '確認コードを入力してください',
    'Enter your email': '登録したメールアドレスを入力してください',
    'Enter your password': 'パスワードを入力してください',
    'Enter your username': 'ユーザー名を入力してください',
    'Forgot your password?': 'パスワードをお忘れの方 ',
    'Have an account? ': 'アカウント登録済みの方 ',
    'Hello': 'こんにちは ',
    'Incorrect username or password': 'ユーザー名またはパスワードが異なります',
    'Lost your code? ': 'コードを紛失した方 ',
    'No account? ': 'アカウント未登録の方 ',
    'Password': 'パスワード',
    'Phone Number': '電話番号',
    'Resend Code': '確認コードの再送',
    'Reset Password': 'パスワードのリセット',
    'Reset your password': 'パスワードのリセット',
    'Send code': 'コードの送信',
    'Sign In': 'サインイン',
    'Sign Out': 'サインアウト',
    'Sign in': 'サインイン',
    'Sign in to your account': 'サインイン',
    'User does not exist': 'ユーザーが存在しません',
    'Username': 'ユーザー名',
    'Username cannot be empty': 'ユーザー名は必須入力です',
    'Username/client id combination not found.': 'ユーザー名が見つかりません',
   }
};

I18n.putVocabularies(dict);
I18n.setLanguage('ja');