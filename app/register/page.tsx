"use client";

import { useEffect, useState } from "react";
import {
collection,
addDoc,
getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import dynamic from "next/dynamic";

const RegisterMap = dynamic(
  () => import("./RegisterMap"),
  {
    ssr: false,
  }
);

type Store = {
id: string;
name: string;
};

export default function RegisterPage() {
const [storeName, setStoreName] = useState("");
const [selectedColor, setSelectedColor] = useState("blue");

const [lat, setLat] = useState<number | null>(null);
const [lng, setLng] = useState<number | null>(null);

const [stores, setStores] = useState<Store[]>([]);
const [selectedStoreId, setSelectedStoreId] = useState("");

const [product, setProduct] = useState("");
const [quantity, setQuantity] = useState(1);
const [unit, setUnit] = useState("パック");
const [memo, setMemo] = useState("");

const colors = [
{ name: "赤", value: "red", class: "bg-red-500" },
{ name: "オレンジ", value: "orange", class: "bg-orange-500" },
{ name: "黄", value: "yellow", class: "bg-yellow-400" },
{ name: "黄緑", value: "lime", class: "bg-lime-400" },
{ name: "緑", value: "green", class: "bg-green-500" },
{ name: "水色", value: "cyan", class: "bg-cyan-400" },
{ name: "青", value: "blue", class: "bg-blue-500" },
{ name: "紫", value: "purple", class: "bg-purple-500" },
];

useEffect(() => {
const fetchStores = async () => {
const snapshot = await getDocs(collection(db, "stores"));


  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
  })) as Store[];

  setStores(data);

  if (data.length > 0) {
    setSelectedStoreId(data[0].id);
  }
};

fetchStores();


}, []);

const handleRegisterStore = async () => {
if (!storeName.trim()) {
alert("店舗名を入力してね");
return;
}


if (lat === null || lng === null) {
  alert("地図をタップして場所を選んでね");
  return;
}

try {
  await addDoc(collection(db, "stores"), {
    name: storeName,
    color: selectedColor,
    lat,
    lng,
    createdAt: new Date(),
  });

  alert("店舗登録成功！");

  window.location.reload();
} catch (error) {
  console.error(error);
  alert("店舗登録失敗");
}


};

const handleAddReport = async () => {
if (!selectedStoreId) {
alert("店舗を選択してね");
return;
}


if (!product.trim()) {
  alert("商品名を入力してね");
  return;
}

try {
  await addDoc(collection(db, "reports"), {
    storeId: selectedStoreId,
    product,
    quantity,
    unit,
    memo,
    createdAt: new Date(),
  });

  alert("購入報告追加成功！");

  setProduct("");
  setQuantity(1);
  setUnit("パック");
  setMemo("");
} catch (error) {
  console.error(error);
  alert("購入報告追加失敗");
}


};

return ( <main className="min-h-screen bg-gradient-to-b from-pink-100 via-blue-100 to-purple-100 p-6"> <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6">


    <h1 className="text-2xl font-bold text-center mb-6 text-black">
      店舗登録
    </h1>

    <div className="mb-6">
      <p className="text-black font-semibold mb-2">
        地図をタップして店舗の場所を選択
      </p>

      <RegisterMap
        onSelect={(selectedLat, selectedLng) => {
          setLat(selectedLat);
          setLng(selectedLng);
        }}
      />
    </div>

    <div className="mb-4">
      <input
        type="text"
        placeholder="店舗名"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
        className="w-full border rounded-xl p-3 text-black"
      />
    </div>

    <div className="grid grid-cols-4 gap-3 mb-4">
      {colors.map((color) => (
        <button
          key={color.value}
          type="button"
          onClick={() => setSelectedColor(color.value)}
          className={`
            ${color.class}
            h-12
            rounded-xl
            ${
              selectedColor === color.value
                ? "ring-4 ring-black"
                : ""
            }
          `}
        />
      ))}
    </div>

    <button
      onClick={handleRegisterStore}
      className="w-full bg-pink-300 hover:bg-pink-400 text-black font-bold py-3 rounded-2xl mb-10"
    >
      店舗登録
    </button>

    <h2 className="text-2xl font-bold text-center mb-6 text-black">
      購入報告追加
    </h2>

    <select
      value={selectedStoreId}
      onChange={(e) => setSelectedStoreId(e.target.value)}
      className="w-full border rounded-xl p-3 text-black mb-4"
    >
      {stores.map((store) => (
        <option key={store.id} value={store.id}>
          {store.name}
        </option>
      ))}
    </select>

    <input
      type="text"
      placeholder="商品名"
      value={product}
      onChange={(e) => setProduct(e.target.value)}
      className="w-full border rounded-xl p-3 text-black mb-4"
    />

    <input
      type="number"
      min="1"
      value={quantity}
      onChange={(e) => setQuantity(Number(e.target.value))}
      className="w-full border rounded-xl p-3 text-black mb-4"
    />

    <select
      value={unit}
      onChange={(e) => setUnit(e.target.value)}
      className="w-full border rounded-xl p-3 text-black mb-4"
    >
      <option>パック</option>
      <option>BOX</option>
    </select>

    <textarea
      placeholder="メモ"
      value={memo}
      onChange={(e) => setMemo(e.target.value)}
      className="w-full border rounded-xl p-3 text-black mb-4"
    />

    <button
      onClick={handleAddReport}
      className="w-full bg-blue-300 hover:bg-blue-400 text-black font-bold py-3 rounded-2xl"
    >
      購入報告追加
    </button>

  </div>
</main>


);
}
