////////////////////////////////////////////////////////////////////////////////////////////////
//
// tanstackQueryでエラーが出る問題を回避するためのプロバイダ
// layout.tsxに配置し、アプリ全体をラップ
//
// 参考URL：https://tanstack.com/query/v5/docs/react/guides/suspense#suspense-on-the-server-with-streaming
//
// 今はツールバーをつけているが、後で削除しておかないと。
//
////////////////////////////////////////////////////////////////////////////////////////////////
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function Providers(props: { children: React.ReactNode }): React.ReactNode{
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <ReactQueryStreamedHydration>
            {props.children}
        </ReactQueryStreamedHydration>
    </QueryClientProvider>
  )
}