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

return ( <main className="min-h-screen bg-gradient-to-b from-pink-100 via-blue-100 to-purple-100 p-6"> <div className="max-w-xl mx-auto"> <h1 className="text-3xl font-bold text-center text-black mb-8">
購入店舗一覧 </h1>


    {stores.length === 0 ? (
      <p className="text-center text-black">
        店舗がありません
      </p>
    ) : (
      stores.map((store) => (
        <div
          key={store.id}
          className="bg-white rounded-2xl shadow-md p-4 mb-4"
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
