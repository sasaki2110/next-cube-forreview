////////////////////////////////////////////////////////////////////////////////////////////////
//
// ナビゲーションバー
//
// こっちの方がしっくりくる。こっちの前提で進める。
//
////////////////////////////////////////////////////////////////////////////////////////////////
"use client";
'use client'
import React, { useState } from 'react';
import Link from "next/link"
import Image from "next/image"

export default function NavBar2() {
  // スマホ画面でのハンバーガーメニューオープン状態
  const [isOpen, setIsOpen] = useState(false);

  return (
      <div className="fixed container mx-auto text-blue-navbar bg-white">
        <div className="flex justify-between items-center">
          <div>
            <Link className="" href="/">
              <Image src="/log-cube.png" width={250} height={60} alt="Tailwind CSS" />
            </Link>
          </div>
          <div>
            <button className="md:hidden" onClick={()=> {setIsOpen(!isOpen)}}>
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/>
              </svg>    
            </button>
          </div>
          <div className="hidden md:block ">
            <ul className="flex flex-col md:flex-row justify-center md:justify-end items-end">
              <Link href="#" className="block px-2 py-2 text-center">店舗情報</Link>
              <Link href="#" className="block px-2 py-2 text-center">ご利用の流れ</Link>
              <Link href="#" className="block px-2 py-2 text-center">よくあるご質問</Link>
              <Link href="#" className="block px-2 py-2 text-center">お問い合わせ</Link>
              <Link href="/detail/mypage" className="block px-2 py-2 text-center">ログイン</Link>
              <Link href="/detail/reservation/input" className="block px-2 py-2 text-center" >
                <Image className="" src="/goyoyaku.png" width={200} height={40} alt="内覧予約" />
              </Link>
            </ul>
          </div>
        </div>
        <div className={isOpen?"block":"hidden"}>
          <ul className="flex flex-col md:flex-row justify-center md:justify-end items-center">
            <Link href="#" className="block px-2 py-2 text-center">店舗情報</Link>
            <Link href="#" className="block px-2 py-2 text-center">ご利用の流れ</Link>
            <Link href="#" className="block px-2 py-2 text-center">よくあるご質問</Link>
            <Link href="#" className="block px-2 py-2 text-center">お問い合わせ</Link>
            <Link href="/detail/mypage" className="block px-2 py-2 text-center">ログイン</Link>
            <Link href="/detail/reservation/input" className="block px-2 py-2 text-center" >
              内覧予約
            </Link>
          </ul>
        </div>
      </div>
  )
}