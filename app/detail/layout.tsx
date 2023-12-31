////////////////////////////////////////////////////////////////////////////////////////////////
//
// 本プロジェクトのレイアウトページ
// アプリ内のページをラップし、全体のページレイアウトをそろえる
// ナビゲーションバーもここに配置し、各ページに表示させる
//
// tanstackQueryの問題を解決するために、Providersを追加
//
////////////////////////////////////////////////////////////////////////////////////////////////
import NavBar from '@/app/components/NavBar';
import Providers from '@/app/api/providers';

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <NavBar />
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
    </Providers>
  )
}
