////////////////////////////////////////////////////////////////////////////////////////////////
//
// 内覧予約（チェック）画面
//
////////////////////////////////////////////////////////////////////////////////////////////////
'use client'

// 画面間受け渡し用コンテキストのインポート
import { useContext } from 'react'
import { UserInfoContext } from '@/app/contexts/UserInfoContext'

export default function Home() {
 // 受け渡しパラメータ用のコンテキストを取得
  const user = useContext(UserInfoContext);
  return (
    <main className="container flex flex-col mx-auto min-h-screen px-2 md:px-24 pt-32 ">
      {/* タイトルエリア */}
      <div className="my-4 mx-2">
        <h1 className="text-3xl font-semibold text-blue-cube">内覧予約</h1>
      </div>

      {/* 直線 */}
      <hr/>

      {/* ステップエリア */}
      <div className="my-4 mx-2">
        <ul className="step">
          <li className="prev">入力</li>
          <li className="current">内容確認</li>
          <li className="last">完了</li>
        </ul>
      </div>

      {/* フォームエリア */}
      <UserInfoContext.Provider value={user}>

      <div className="md:flex md:items-center mb-6 justify-center pt-14">
      <form className="w-full max-w-2xl" action="/detail/reservation/finish">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-black md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-last-name"
              >
                姓
              </label>
            </div>
            <div className="md:w-2/3">
              {user.lastName}
            </div>
          </div>
          
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-black md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-first-name"
              >
                名
              </label>
            </div>

            <div className="md:w-2/3">
              {user.firstName}
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-black md:text-right mb-1 md:mb-0 pr-4">
                メールアドレス
              </label>
            </div>
            <div className="md:w-2/3">
              {user.mailAddress}
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-black md:text-right mb-1 md:mb-0 pr-4">
                電話番号
              </label>
            </div>
            <div className="md:w-2/3">
              {user.phoneNumber}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className={
                "py-3 lg:py-3 px-14 lg:px-14 font-bold rounded-sm text-green-cube border border-green-cube hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none "
              }
              type="submit"
            >
              送信
            </button>
          </div>
        </form>
      </div>
      </UserInfoContext.Provider>
    </main>
  )
}
