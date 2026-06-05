"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [selectedColor, setSelectedColor] = useState("blue");

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

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 via-blue-100 to-purple-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">
          新規登録
        </h1>

        <div className="mb-4">
          <label className="block text-black font-semibold mb-2">
            店舗名
          </label>

          <input
            type="text"
            placeholder="店舗名を入力"
            className="w-full border rounded-xl p-3 text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black font-semibold mb-3">
            ピン色
          </label>

          <div className="grid grid-cols-4 gap-3">
            {colors.map((color) => (
              <button
                key={color.value}
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
        </div>

        <p className="text-center text-black mb-6">
          選択中:{" "}
          {colors.find((c) => c.value === selectedColor)?.name}
        </p>

        <button className="w-full bg-pink-300 hover:bg-pink-400 text-black font-bold py-3 rounded-2xl">
          登録
        </button>
      </div>
    </main>
  );
}