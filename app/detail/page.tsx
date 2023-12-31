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
        <p>ナビゲーションバーの「ログイン」でマイページのサンプルを表示。</p>
      </Link>
    </main>
  )
}