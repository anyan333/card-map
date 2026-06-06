"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const itemClass = (path: string) =>
    `flex flex-col items-center text-sm ${
      pathname === path
        ? "text-blue-600 font-bold"
        : "text-gray-500"
    }`;

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg z-[9999]">
      <div className="flex justify-around py-3">

        <Link href="/" className={itemClass("/")}>
          <span>🏠</span>
          <span>ホーム</span>
        </Link>

        <Link href="/map" className={itemClass("/map")}>
          <span>📍</span>
          <span>マップ</span>
        </Link>

        <Link href="/register" className={itemClass("/register")}>
          <span>📝</span>
          <span>登録</span>
        </Link>

        <Link href="/stores" className={itemClass("/stores")}>
          <span>🏪</span>
          <span>店舗</span>
        </Link>
        
        <Link href="/buyback" className={itemClass("/buyback")}>
  <span>💰</span>
  <span>買取</span>
</Link>

      </div>
    </nav>
  );
}