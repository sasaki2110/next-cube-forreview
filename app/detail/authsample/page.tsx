////////////////////////////////////////////////////////////////////////////////////////////////
//
// amazon-cognito-identity-jsを利用した、ログイン（＋IDトークン取得）のサンプル
//
////////////////////////////////////////////////////////////////////////////////////////////////

'use client'
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { useRef } from "react";

const Login = () => {
  // 画面内で使用するrefを定義
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);

  // Cognito User Poolへの接続情報を設定
  const poolData:AmazonCognitoIdentity.ICognitoUserPoolData = {
    UserPoolId: (typeof(process.env.NEXT_PUBLIC_COGNITO_USERPOOLID)==="string")?process.env.NEXT_PUBLIC_COGNITO_USERPOOLID:"",
    ClientId: (typeof(process.env.NEXT_PUBLIC_COGNITO_APPCLIENTID)==="string")?process.env.NEXT_PUBLIC_COGNITO_APPCLIENTID:"",
  };

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  // Loginボタン押下時の処理を実装
  const submitHandler = (e: { preventDefault: () => void }) => {
    // E-mail未入力エラー時のハンドリングを実装する
    if (!refEmail.current?.value) {
      console.log("E-mail is Empty");
      return;
    }
    // パスワード未入力エラー時のハンドリングを実装する
    if (!refPassword.current?.value) {
      console.log("Password is Empty");
      return;
    }

    // ログイン認証の対象とするCognito User Poolとユーザを設定する
    let userData = {
      Username: refEmail.current.value,
      Pool: userPool,
    };
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    // 認証用に渡すusernameとpasswordを設定する
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      {
        Username: refEmail.current.value,
        Password: refPassword.current.value,
      }
    );

    console.log(authenticationDetails);

    // ログイン認証を実行する
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        // ログイン成功時の処理を実装する
        console.log("Login Success");
        //console.log(result);
        console.log(
          "Access Token(jwtToken)=" + result.getAccessToken().getJwtToken()
        );
      },
      onFailure: function (err) {
        console.log("Login Failed");
        console.log(err);
        // ログイン失敗時の処理を実装する
        alert(JSON.stringify(err));
      },
    });
  };

  return (
    <>
      <h1>This is Login page</h1>
      <div>
        E-mail:
        <input type="text" ref={refEmail} />
        Password:
        <input type="text" ref={refPassword} />
        <button onClick={submitHandler}>Login</button>
      </div>
    </>
  );
};

export default Login;