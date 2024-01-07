////////////////////////////////////////////////////////////////////////////////////////////////
//
// 認証情報のコンテキスト
//
////////////////////////////////////////////////////////////////////////////////////////////////
import { createContext } from "react";
import { JWT } from "aws-amplify/auth";

export type AuthInfo = {
    idToken: JWT | undefined,
    accessToken:  JWT | undefined,
}

export const AuthInfoContext = createContext<AuthInfo>({ 
    idToken: undefined,
    accessToken: undefined,
})