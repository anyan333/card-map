import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 via-blue-100 to-purple-100 flex flex-col items-center justify-center p-6">

      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-black mb-3">
          🃏 カード販売情報共有マップ
        </h1>

        <p className="text-gray-700">
          みんなで在庫・購入情報を共有しよう
        </p>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-4">

        <Link href="/map">
          <button className="bg-white rounded-3xl shadow-lg p-5 text-lg font-bold text-black hover:scale-105 transition w-full">
            📍 Map
          </button>
        </Link>

        <Link href="/register">
          <button className="bg-white rounded-3xl shadow-lg p-5 text-lg font-bold text-black hover:scale-105 transition w-full">
            📝 新規登録
          </button>
        </Link>

        <Link href="/stores">
          <button className="bg-white rounded-3xl shadow-lg p-5 text-lg font-bold text-black hover:scale-105 transition w-full">
            🏪 購入店舗一覧
          </button>
        </Link>

        <Link href="/buyback">
          <button className="bg-white rounded-3xl shadow-lg p-5 text-lg font-bold text-black hover:scale-105 transition w-full">
            💰 買取実績
          </button>
        </Link>

      </div>

      <p className="mt-10 text-sm text-gray-600">
        Pokémon Card Community Map
      </p>

    </main>
  );
}