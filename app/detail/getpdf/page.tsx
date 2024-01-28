import { redirect } from "next/navigation";

// ポーリン時時のスリープ処理
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default async function Home() {

  console.log("aaa")

  // 最初のリクエストを await で同期的に呼び出し、リクエストIDを取得
  const reqId: string = await firstReq()
  let priUrl: string | undefined = undefined

  // もし、まだリクエストIDがなければスルー
  if(reqId === null) {
    console.log("まだリクエストIDは無い")
  } else {
    console.log("リクエストIDが入った。「" + JSON.stringify(reqId) + "」")

    // DONEになるまで無限ループ（これって無限でいいの？）
    do {
      // ２回目のリクエストを呼び出し
      priUrl = await secondReq(reqId)

      // １秒待ち合わせ
      await sleep(1000)
    } while(priUrl === null || priUrl == undefined)
  }

  // ここまでくればプリサイン度URLは入ってるはずだけど、ねんの為
  if(priUrl === null || priUrl === undefined) {
    console.log("まだプリサイン度URLは無い")
  } else {
    console.log("プリサイン度URLが入った。「" + JSON.stringify(priUrl) + "」")

    // 取得したプリサイン度URLへリダイレクト
    redirect(priUrl)
  }
  
  console.log("bbb")

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <p>ここにPDF？？？</p>
      <p>{priUrl}</p>
    </main>
  );
}

async function firstReq() {
  const url = "https://ockfubou9l.execute-api.ap-northeast-3.amazonaws.com/default/payments/1234/invoice/download/"
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "origin", // no-referrer, *no-referrer-when-downgrade, origin, 
    cache: "no-store",
  })

  const data = await response.json()

  return(data.requestId)
}

async function secondReq(reqId: string) {
  console.log("in the secondReq")
  const url = "https://ockfubou9l.execute-api.ap-northeast-3.amazonaws.com/default/payments/1234/invoice/download/" + reqId
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "origin", // no-referrer, *no-referrer-when-downgrade, origin, 
    cache: "no-store",
  })

  const data = await response.json()

  return( data.downloadUrl)
}

