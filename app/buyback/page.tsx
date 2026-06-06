"use client";

import { useEffect, useState } from "react";
import {
collection,
addDoc,
getDocs,
deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

type Store = {
id: string;
name: string;
};

type Buyback = {
id: string;
storeId: string;
storeName: string;
cardName: string;
price: number;
memo: string;
};

export default function BuybackPage() {
const [stores, setStores] =
useState<Store[]>([]);

const [buybacks, setBuybacks] =
useState<Buyback[]>([]);

const [selectedStoreId, setSelectedStoreId] =
useState("");

const [cardName, setCardName] =
useState("");

const [price, setPrice] =
useState(0);

const [memo, setMemo] =
useState("");

useEffect(() => {
const fetchData = async () => {
const storesSnapshot =
await getDocs(
collection(db, "stores")
);


  const storesData =
    storesSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    })) as Store[];

  setStores(storesData);

  if (storesData.length > 0) {
    setSelectedStoreId(
      storesData[0].id
    );
  }

  const buybackSnapshot =
    await getDocs(
      collection(db, "buybacks")
    );

  const buybackData =
    buybackSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Buyback[];

  setBuybacks(buybackData);
};

fetchData();


}, []);

const handleRegister = async () => {
if (!selectedStoreId) {
alert("店舗を選択してね");
return;
}


if (!cardName.trim()) {
  alert("カード名を入力してね");
  return;
}

const selectedStore =
  stores.find(
    (s) =>
      s.id === selectedStoreId
  );

await addDoc(
  collection(db, "buybacks"),
  {
    storeId: selectedStoreId,
    storeName:
      selectedStore?.name ?? "",
    cardName,
    price,
    memo,
    createdAt: new Date(),
  }
);

alert("登録成功");

window.location.reload();
};

const deleteBuyback = async (
  buybackId: string
) => {
  const ok = confirm(
    "この買取実績を削除する？"
  );

  if (!ok) return;

  await deleteDoc(
    doc(db, "buybacks", buybackId)
  );

  setBuybacks((prev) =>
    prev.filter(
      (buyback) =>
        buyback.id !== buybackId
    )
  );
};

return ( <main className="min-h-screen bg-gradient-to-b from-pink-100 via-blue-100 to-purple-100 p-6"> <div className="max-w-xl mx-auto">


    <h1 className="text-3xl font-bold text-center text-black mb-8">
      買取実績
    </h1>

    <div className="bg-white rounded-2xl shadow-md p-4 mb-8">

      <select
        value={selectedStoreId}
        onChange={(e) =>
          setSelectedStoreId(
            e.target.value
          )
        }
        className="w-full border rounded-xl p-3 text-black mb-4"
      >
        {stores.map((store) => (
          <option
            key={store.id}
            value={store.id}
          >
            {store.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="カード名"
        value={cardName}
        onChange={(e) =>
          setCardName(
            e.target.value
          )
        }
        className="w-full border rounded-xl p-3 text-black mb-4"
      />

      <input
        type="number"
        placeholder="買取価格"
        value={price}
        onChange={(e) =>
          setPrice(
            Number(
              e.target.value
            )
          )
        }
        className="w-full border rounded-xl p-3 text-black mb-4"
      />

      <textarea
        placeholder="メモ"
        value={memo}
        onChange={(e) =>
          setMemo(
            e.target.value
          )
        }
        className="w-full border rounded-xl p-3 text-black mb-4"
      />

      <button
        onClick={handleRegister}
        className="w-full bg-green-300 hover:bg-green-400 text-black font-bold py-3 rounded-2xl"
      >
        買取実績登録
      </button>
    </div>

    {buybacks.map((buyback) => (
      <div
        key={buyback.id}
        className="bg-white rounded-2xl shadow-md p-4 mb-4"
      >
        <div className="font-bold text-black">
          {buyback.storeName}
        </div>

        <div className="text-black">
          {buyback.cardName}
        </div>

        <div className="text-black">
          {buyback.price}円
        </div>

        {buyback.memo && (
          <div className="text-gray-600">
            {buyback.memo}
          </div>
        )}
        <button
  onClick={() =>
    deleteBuyback(buyback.id)
  }
  className="mt-3 bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-lg"
>
  削除
</button>
      </div>
    ))}
  </div>
</main>


);
}
