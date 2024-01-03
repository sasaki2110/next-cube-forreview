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
          <li className="current">完了</li>
        </ul>
      </div>
      <div className="md:flex md:items-center mb-6">
        <p>内覧のご予約ありがとうございます。</p>
        <p>後日、担当者よりご連絡差し上げますので、今しばらくお待ち頂ければ幸いです。</p>
      </div>


    </main>
  )
}
