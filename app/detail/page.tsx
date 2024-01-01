////////////////////////////////////////////////////////////////////////////////////////////////
//
// 店舗詳細画面
//
////////////////////////////////////////////////////////////////////////////////////////////////
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="detail">
        <p>店舗詳細画面のサンプル</p>
        <p></p>
        <p>ナビゲーションバーの「お問い合わせ」で内覧予約ページのサンプルを表示。</p>
        <p>ナビゲーションバーの「ログイン」でマイページのサンプルを表示。</p>
        <p></p>
        <p>認証はホストされたUIを利用しています。（@aws-amplify/ui-react aws-amplifyを利用）</p>
        <p>テストする際は下記を利用して下さい。</p>
        <p>mailaddress:tonkati2001@gmail.com</p>
        <p>password:Hoge-fuga001!</p>
      </Link>
    </main>
  )
}