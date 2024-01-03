'use client'

import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const lastName = searchParams.get("lastName");
  const firstName = searchParams.get("firstName");
  const mailAddress = searchParams.get("mailAddress");
  const phoneNumber  = searchParams.get("phoneNumber");

  console.log(lastName + ":" + firstName + ":" + mailAddress + ":" + phoneNumber)

  return (
    <main className="container flex flex-col mx-auto min-h-screen px-20">

  {/*<main className="flex flex-col min-h-screen px-2 md:px-24 py-2 md:py-12 bg-gray-cube justify-center">*/}
            {/* タイトルエリア */}
            <div className="my-4 mx-2">
        <h1 className="text-3xl font-semibold text-blue-cube">内覧予約</h1>
      </div>

      {/* 直線 */}
      <hr/>

      {/* ステップエリア */}
      <div className="my-4 mx-2">
        <ul className="step">
          <li className="current">入力</li>
          <li className="current">内容確認</li>
          <li className="last">完了</li>
        </ul>
      </div>
      <div className="md:flex md:items-center mb-6">
      <form className="w-full max-w-2xl" action="/detail/reservation/finish">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-last-name"
              >
                姓
              </label>
            </div>
            <div className="md:w-2/3">
              {lastName}
            </div>
          </div>
          
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-first-name"
              >
                名
              </label>
            </div>

            <div className="md:w-2/3">
              {firstName}
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                メールアドレス
              </label>
            </div>
            <div className="md:w-2/3">
              {mailAddress}
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                電話番号
              </label>
            </div>
            <div className="md:w-2/3">
              {phoneNumber}
            </div>
          </div>
          <div className="flex justify-center">
            {/*
            {isSubmitted ? (
              <div>
                <p className="text-green-500 text-lg text-bold">
                  お問合せを送信いたしました。
                </p>
              </div>
            ) : (*/}
              <button
                className={
                  "py-3 lg:py-3 px-14 lg:px-14 text-white-500 font-bold rounded-3xl bg-blue-400 hover:shadow-teal-md transition-all outline-none text-white"
                }
                type="submit"
              >
                送信
              </button>
            {/* )}*/}
          </div>
        </form>

      </div>


    </main>
  )
}
