////////////////////////////////////////////////////////////////////////////////////////////////
//
// 店舗詳細画面
//
////////////////////////////////////////////////////////////////////////////////////////////////
'use client'
import * as React from "react"
import Image from 'next/image'

import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

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
                  <Image src="https://bucksam1.s3.amazonaws.com/sinagawa1.png" alt="店舗画像" width="700" height="100"/>
                </CarouselItem>

                <CarouselItem  key={2}>
                  <Image src="https://bucksam1.s3.amazonaws.com/sinagawa3.jpg" alt="店舗画像" width="700" height="100"/>
                </CarouselItem>

                <CarouselItem  key={3}>
                  <Image src="https://bucksam1.s3.amazonaws.com/sinagawa5.jpg" alt="店舗画像" width="700" height="100"/>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>

          {/* マップエリア */}
          <div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5773.476662101816!2d139.77558612629016!3d35.69536342160449!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188fdcada147ed%3A0x557e5c5217353871!2z44OI44Op44Oz44Kv44Or44O844OgQ1VCRSDnp4vokYnljp_lupc!5e0!3m2!1sja!2sjp!4v1704271224853!5m2!1sja!2sjp" 
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
    </main>
  )
}