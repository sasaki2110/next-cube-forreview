////////////////////////////////////////////////////////////////////////////////////////////////
//
// 内覧予約（完了）画面
//
////////////////////////////////////////////////////////////////////////////////////////////////
'use client'

export default function Home() {

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
          <li className="prev">内容確認</li>
          <li className="currentlast">完了</li>
        </ul>
      </div>
      <div className="md:flex md:items-center mb-6">
        <p>内覧のご予約ありがとうございます。</p>
        <p>後日、担当者よりご連絡差し上げますので、今しばらくお待ち頂ければ幸いです。</p>
      </div>
    </main>
  )
}
