"use client";

import { useEffect, useState } from "react";
import L from "leaflet";
import {
MapContainer,
TileLayer,
Marker,
Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
iconRetinaUrl:
"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
iconUrl:
"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
shadowUrl:
"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const markerIcons: Record<string, L.Icon> = {
red: new L.Icon({
iconUrl:
"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
shadowUrl:
"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
iconSize: [25, 41],
iconAnchor: [12, 41],
}),

blue: new L.Icon({
iconUrl:
"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
shadowUrl:
"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
iconSize: [25, 41],
iconAnchor: [12, 41],
}),

green: new L.Icon({
iconUrl:
"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
shadowUrl:
"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
iconSize: [25, 41],
iconAnchor: [12, 41],
}),

orange: new L.Icon({
iconUrl:
"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
shadowUrl:
"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
iconSize: [25, 41],
iconAnchor: [12, 41],
}),

yellow: new L.Icon({
iconUrl:
"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
shadowUrl:
"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
iconSize: [25, 41],
iconAnchor: [12, 41],
}),

purple: new L.Icon({
iconUrl:
"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
shadowUrl:
"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
iconSize: [25, 41],
iconAnchor: [12, 41],
}),
};

type Store = {
id: string;
name: string;
color: string;
lat: number;
lng: number;
};

type Report = {
id: string;
storeId: string;
product: string;
quantity: number;
unit: string;
memo: string;
 createdAt?: any;
};

export default function MapView() {
    const deleteReport = async (
  reportId: string
) => {
  const ok = confirm(
    "この購入報告を削除する？"
  );

  if (!ok) return;

  await deleteDoc(
    doc(db, "reports", reportId)
  );

  setReports((prev) =>
    prev.filter(
      (report) =>
        report.id !== reportId
    )
  );
};
const deleteStore = async (
storeId: string
) => {
const ok = confirm(
"店舗と購入履歴を全部削除する？"
);

if (!ok) return;

const reportsQuery = query(
  collection(db, "reports"),
  where("storeId", "==", storeId)
);

const reportsSnapshot =
  await getDocs(reportsQuery);

for (const reportDoc of reportsSnapshot.docs) {
  await deleteDoc(
    doc(db, "reports", reportDoc.id)
  );
}

await deleteDoc(
  doc(db, "stores", storeId)
);

setStores((prev) =>
  prev.filter(
    (store) =>
      store.id !== storeId
  )
);

setReports((prev) =>
  prev.filter(
    (report) =>
      report.storeId !== storeId
  )
);

};
const [stores, setStores] = useState<Store[]>([]);
const [reports, setReports] = useState<Report[]>([]);
const [search, setSearch] = useState("");

useEffect(() => {
const fetchData = async () => {
const storesSnapshot = await getDocs(
collection(db, "stores")
);


  const storesData = storesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Store[];

  setStores(storesData);

  const reportsSnapshot = await getDocs(
    collection(db, "reports")
  );

  const reportsData = reportsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Report[];

  setReports(reportsData);
};

fetchData();


}, []);
const filteredStores = stores.filter((store) =>
  store.name
    .toLowerCase()
    .includes(search.toLowerCase())
);


return (
  <>
    <div
      style={{
        position: "fixed",
        top: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
      }}
    >
      <input
        type="text"
        placeholder="🔍 店舗検索"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          borderRadius: "12px",
          border: "1px solid #ccc",
          background: "white",
          color: "black",
  fontSize: "16px",
        }}
      />
    </div>

    <MapContainer
      center={[34.4859, 133.3623]}
      zoom={13}
      style={{
        height: "100vh",
        width: "100%",
      }}
    >

    <TileLayer
     attribution="&copy; OpenStreetMap contributors"
     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
   />


  {filteredStores.map((store) => {
    const storeReports = reports.filter(
      (report) => report.storeId === store.id
    );

    return (
      <Marker
        key={store.id}
        position={[store.lat, store.lng]}
        icon={
          markerIcons[store.color] ??
          markerIcons.blue
        }
      >
<Popup>
  <div style={{ minWidth: "220px" }}>
    <strong>{store.name}</strong>
    <br />

<button
type="button"
onClick={() =>
deleteStore(store.id)
}
style={{
marginTop: "6px",
marginBottom: "8px",
backgroundColor: "#ff4d4d",
color: "white",
border: "none",
padding: "6px 10px",
borderRadius: "6px",
cursor: "pointer",
}}

>

店舗削除 </button>


    <hr />

    <strong>
      購入履歴 ({storeReports.length}件)
    </strong>
    {storeReports.length === 0 ? (

  <p>報告なし</p>
) : (
  storeReports
    .sort((a, b) => {
      const aTime =
        a.createdAt?.seconds ?? 0;
      const bTime =
        b.createdAt?.seconds ?? 0;


  return bTime - aTime;
})
.map((report) => (
  <div
    key={report.id}
    style={{
      marginTop: "8px",
      marginBottom: "8px",
      borderBottom: "1px solid #ddd",
      paddingBottom: "6px",
    }}
  >
    <div>
      <strong>
        {report.product}
      </strong>
    </div>

    <div>
      {report.quantity}
      {report.unit}
    </div>

    {report.createdAt && (
      <div
        style={{
          fontSize: "12px",
          color: "#666",
        }}
      >
        {new Date(
          report.createdAt.seconds *
            1000
        ).toLocaleString("ja-JP")}
      </div>
    )}

    {report.memo && (
      <div>
        メモ: {report.memo}
      </div>
    )}
    <button
  type="button"
  onClick={(e) => {
    e.stopPropagation();
    deleteReport(report.id);
  }}
  style={{
    marginTop: "6px",
    backgroundColor: "#ff8080",
    border: "none",
    padding: "4px 8px",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  購入報告削除
</button>
  </div>
))


)}


  </div>
</Popup>
</Marker>
);
})}
</MapContainer>
</>
);
}
