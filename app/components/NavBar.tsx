////////////////////////////////////////////////////////////////////////////////////////////////
//
// ナビゲーションバー
//
// でもパクッテきたけど、いまいち動きが変やからどうするか・・・・・・・・
//
////////////////////////////////////////////////////////////////////////////////////////////////
"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";

export default function NavBar():ReactNode {
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleMenuOpen = () => {
    setOpen(!isOpen);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  return (
    <header className="py-2 px-4 flex justify-between items-center text-blue-navbar">
      <Link className="z-50" href="/" onClick={handleMenuClose}>
        <Image src="/log-cube.png" width={300} height={40} alt="Tailwind CSS" />
      </Link>

      <nav
        className={
          isOpen
            ? "z-40 bg-blue-100 fixed top-0 right-0 bottom-0 left-0 h-screen flex flex-col"
            : "fixed right-[-100%] md:right-4 align-middle"
        }
      >
        <ul
          className={
            isOpen
              ? "flex h-screen justify-center items-center flex-col gap-6 text-xl"
              : "block md:flex md:gap-8 items-center"
          }
        >
          <li>
            <Link onClick={handleMenuClose} href="/about">
              店舗情報
            </Link>
          </li>
          <li>
            <Link onClick={handleMenuClose} href="/company">
              ご利用の流れ
            </Link>
          </li>
          <li>
            <Link onClick={handleMenuClose} href="/recruit">
              よくあるご質問
            </Link>
          </li>
          <li>
            <Link onClick={handleMenuClose} href="/detail/reservation/input">
              お問い合わせ
            </Link>
          </li>
          <li>
            <Link onClick={handleMenuClose} href="/detail/mypage">
              ログイン
            </Link>
          </li>
          <li>
            <Link className="z-50" href="/" onClick={handleMenuClose}>
              <Image src="/goyoyaku.png" width={200} height={40} alt="Tailwind CSS" />
            </Link>
          </li>
        </ul>
      </nav>
      <button className="z-50 space-y-2 md:hidden" onClick={handleMenuOpen}>
        <span
          className={
            isOpen
              ? "block w-8 h-0.5 bg-gray-600 translate-y-2.5 rotate-45 duration-300"
              : "block w-8 h-0.5 bg-gray-600 duration-300"
          }
        />
        <span
          className={
            isOpen ? "block opacity-0 duration-300" : "block w-8 h-0.5 bg-gray-600 duration-300"
          }
        />
        <span
          className={
            isOpen
              ? "block w-8 h-0.5 bg-gray-600 -rotate-45 duration-300"
              : "block w-8 h-0.5 bg-gray-600 duration-300"
          }
        />
      </button>
    </header>
  );
}

