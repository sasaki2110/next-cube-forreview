////////////////////////////////////////////////////////////////////////////////////////////////
//
// 店舗詳細画面
//
////////////////////////////////////////////////////////////////////////////////////////////////
'use client'
import * as React from "react"
import Image from 'next/image'
import Link from "next/link"

import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

/**
 * 環境変数をstring型で代入できるよう、typeチェック
 * @param str 環境変数
 * @returns string 型に限定した環境変数
 */
function etos(str:string | undefined):string {
  return(typeof(str)==="string"?str:"")
}

export default function Home() {
  // オートプレイ（自動スワイプ用プラグイン生成）
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <main className="container flex flex-col mx-auto px-2 md:px-24 pt-32 min-h-screen bg-gray-cube">
      {/* タイトルエリア */}
      <div className="md:my-4 md:mx-2">
          <h1 className="text-3xl font-semibold text-blue-cube">店舗情報</h1>
      </div>

      {/* 次に店舗概要エリア */}
      <div  className="md:my-4 md:mx-2 md:px-4 border-2 border-gray-cube rounded-md bg-white ">
        <h1 className="text-2xl font-semibold text-green-cube mx-8 mt-8">CUBE 秋葉原</h1>
        <p className="text-xs mx-8 mt-2">◆2023年7月　増室OPEN！</p>
        <p className="text-xs mx-8 mt-2 mb-8">◆秋葉原・神田・岩本町エリアからのアクセス良好で、24時間365日利用可能な店舗です。</p>
        <hr className="mx-8 bg-green-cube"/>
      </div>

      {/* 次に店舗詳細エリア */}
      <div  className="md:my-4 md:mx-2 md:px-4 pt-4 border-2 border-gray-cube rounded-md bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-2 py-2 ">
          {/* 店舗画像エリア */}
          <div>
            <Carousel
              plugins={[plugin.current]}
              className="w-full"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                <CarouselItem key={1}>
                  <Image src={etos(process.env.NEXT_PUBLIC_IMAGE_STOREDETAUL1)} alt="店舗画像" width="700" height="100"/>
                </CarouselItem>

                <CarouselItem  key={2}>
                  <Image src={etos(process.env.NEXT_PUBLIC_IMAGE_STOREDETAUL2)} alt="店舗画像" width="700" height="100"/>
                </CarouselItem>

                <CarouselItem  key={3}>
                  <Image src={etos(process.env.NEXT_PUBLIC_IMAGE_STOREDETAUL3)} alt="店舗画像" width="700" height="100"/>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>

          {/* マップエリア */}
          <div>
            <iframe 
              src={etos(process.env.NEXT_PUBLIC_URL_MAP)}
              loading="lazy" 
              title="map" 
              width="100%" height="380px" />

            <p className="text-sm text-green-cube pt-8">車をご利用の方</p>
            <p className="text-sm">首都高速５号線で、池袋・高島平方面からお越しの場合は「飯田橋ランプ」、銀座・新宿方面からお越しの場合は「西神田ランプ」で降り、外堀通りを秋葉原方面にお進みください。</p>

            <p className="text-sm text-green-cube pt-8">電車をご利用の方</p>
            <p className="text-sm">①JR各線「品川」駅 港南口より徒歩14分</p>
            <p className="text-sm">②京急線「北品川」駅より徒歩8分</p>
            <p className="text-sm">③東京モノレール「天王洲アイル」駅南口より徒歩10分 </p>
            <p className="text-sm">④りんかい線「天王洲アイル」駅B出口より徒歩11分</p>
          </div>
        </div>
      </div>
      
      {/* お部屋一覧エリア */}
      <div  className="md:my-4 md:mx-2 md:px-4 border-2 border-gray-cube rounded-md bg-white ">
        <h1 className="text-2xl font-semibold text-green-cube mx-8 mt-8">お部屋一覧</h1>

        {/* グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 px-2 py-2 mx-1 my-1 md:mx-8 md:my-8">
          {/* 画像エリア */}
          <div>
          　　<Image src={etos(process.env.NEXT_PUBLIC_IMAGE_ROOMTYPE1)} alt="店舗画像" width="200" height="100"/>
          </div>
          {/* テーブルエリア */}
          <div className="col-span-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">お部屋番号</TableHead>
                  <TableHead className="text-center">広さ</TableHead>
                  <TableHead className="text-center">月額利用料</TableHead>
                  <TableHead className="text-center">管理費</TableHead>
                  <TableHead className="text-center">3ヵ月月額利用料<br/>半額キャンペーン</TableHead>
                  <TableHead className="text-center">WEB申込み</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Room1</TableCell>
                  <TableCell>1.0帖/1.66㎡</TableCell>
                  <TableCell className="text-right">16,020円</TableCell>
                  <TableCell className="text-right">2,200円</TableCell>
                  <TableCell className="text-right">9,100円</TableCell>
                  {/* スマホだとボタンが重なるから対処が必要 */}
                  <TableCell className="text-center">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div>
                        <Link href="/detail/reservation/input" 
                              className="py-2 px-2 rounded-lg text-green-cube border border-green-cube hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none " >
                          内覧予約
                        </Link>
                      </div>
                      <div>
                        <Link href="/detail/reservation/input" 
                              className="py-2 px-2 rounded-lg text-white bg-blue-cube border border-blue-cube hover:shadow-teal-md hover:bg-blue-200 hover:text-black transition-all outline-none " >
                          お申込み
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Room1</TableCell>
                  <TableCell>1.0帖/1.66㎡</TableCell>
                  <TableCell className="text-right">16,020円</TableCell>
                  <TableCell className="text-right">2,200円</TableCell>
                  <TableCell className="text-right">9,100円</TableCell>
                  {/* スマホだとボタンが重なるから対処が必要 */}
                  <TableCell className="text-center">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div>
                        <Link href="/detail/reservation/input" 
                              className="py-2 px-2 rounded-lg text-green-cube border border-green-cube hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none " >
                          内覧予約
                        </Link>
                      </div>
                      <div>
                        <Link href="/detail/reservation/input" 
                              className="py-2 px-2 rounded-lg text-white bg-blue-cube border border-blue-cube hover:shadow-teal-md hover:bg-blue-200 hover:text-black transition-all outline-none " >
                          お申込み
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
   </main>
  )
}