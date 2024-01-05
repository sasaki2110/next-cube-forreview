////////////////////////////////////////////////////////////////////////////////////////////////
//
// 画面間受け渡し情報のコンテキスト
//
////////////////////////////////////////////////////////////////////////////////////////////////

import { createContext } from "react";

export type UserInfo = {
    lastName: string
    firstName: string
    mailAddress: string
    phoneNumber: string
}

export const UserInfoContext = createContext<UserInfo>({ 
    lastName: '', 
    firstName: '', 
    mailAddress: '', 
    phoneNumber: '', 
})