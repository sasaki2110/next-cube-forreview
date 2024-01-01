
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
 * おしらせページ処理
 * @returns 画面表示するReactNode
 */
export default function Home() {
  // API（Lambda）のURLを設定（念のため、環境変数で定義）
  let url = ""
  if(typeof(process.env.NEXT_PUBLIC_URL_GETCOSTMERS)==="string") {
    url = process.env.NEXT_PUBLIC_URL_GETCOSTMERS;
  }
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
    <main className="flex flex-col min-h-screen px-24 py-12 bg-gray-cube">
      {/* タイトルエリア */}
      <div className="my-4 mx-2">
          <h1 className="text-3xl font-semibold text-blue-cube">マイページ</h1>
      </div>

      {/* 次にお知らせエリア */}
      <div  className="my-4 mx-2 px-4 border-2 border-gray-cube rounded-md bg-white ">
          <h1 className="text-2xl font-semibold text-green-cube mx-8 my-8">お知らせ</h1>
          <hr className="mx-8 bg-green-cube"/>

            {/* toDo keyには何を設定すべきか？ */}
            {notifications.map((notification) => (
            <div className="mx-8 my-8 px-8 py-8 bg-gray-cube border rounded-xl" key={null}>
              <p className="text-grey-cube text-sm" >{notification.date}</p>
              <p className="text-grey-cube text-lg">{notification.title}</p>
            </div>           
          ))}

      </div>
    </main>
)
}