// 自動生成されたルート画面
// 使用しない予定
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="detail" className="border border-blue-400 bg-white py-2 px-4 rounded-lg hover:bg-blue-100">
        店舗詳細画面へ
      </Link>
      <p></p>
        <p>ナビゲーションバーの「ログイン」でマイページのサンプルを表示。</p>
        <p>ナビゲーションバーの「電話番号のアイコンごよやく（スマホでは内覧予約）」で内覧予約ページのサンプルを表示。</p>
        <p></p>
        <p>認証はホストされたUIを利用しています。（@aws-amplify/ui-react aws-amplifyを利用）</p>
        <p>テストする際は下記を利用して下さい。</p>
        <p>mailaddress:tonkati2001@gmail.com</p>
        <p>password:Hoge-fuga001!</p>　
    </main>
  )
}
