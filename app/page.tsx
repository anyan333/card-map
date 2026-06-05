import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 via-blue-100 to-purple-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-black mb-10 text-center">
        カード販売情報共有マップ
      </h1>

      <div className="w-full max-w-sm flex flex-col gap-4">
    <Link href="/map">
  <button className="bg-white rounded-2xl shadow-md p-4 text-lg font-semibold text-black hover:scale-105 transition w-full">
    Map
  </button>
</Link>

<Link href="/register">
  <button className="bg-white rounded-2xl shadow-md p-4 text-lg font-semibold text-black hover:scale-105 transition w-full">
    新規登録
  </button>
</Link>

<Link href="/stores">
  <button className="bg-white rounded-2xl shadow-md p-4 text-lg font-semibold text-black hover:scale-105 transition w-full">
    購入店舗一覧
  </button>
</Link>

<Link href="/buyback">
  <button className="bg-white rounded-2xl shadow-md p-4 text-lg font-semibold text-black hover:scale-105 transition w-full">
    買取実績
  </button>
</Link>
      </div>
    </main>
  );
}