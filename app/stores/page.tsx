"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

type Store = {
  id: string;
  name: string;
};

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      const snapshot = await getDocs(
        collection(db, "stores")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      })) as Store[];

      setStores(data);
    };

    fetchStores();
  }, []);

  const filteredStores = stores.filter((store) =>
    store.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 via-blue-100 to-purple-100 p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-black mb-6">
          購入店舗一覧
        </h1>

        <input
          type="text"
          placeholder="🔍 店舗名を検索"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-6 rounded-2xl border border-gray-300 shadow-sm text-black"
        />

        {filteredStores.length === 0 ? (
          <p className="text-center text-black">
            該当する店舗がありません
          </p>
        ) : (
          filteredStores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-2xl shadow-md p-4 mb-4 transition hover:shadow-xl hover:-translate-y-1"
            >
              <p className="text-lg font-semibold text-black">
                {store.name}
              </p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}