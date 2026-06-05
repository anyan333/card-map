"use client";

import { useState } from "react";
import L from "leaflet";

import {
Marker,
TileLayer,
MapContainer,
useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
iconRetinaUrl:
"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

iconUrl:
"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

shadowUrl:
"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function ClickMarker({
onSelect,
}: {
onSelect: (lat: number, lng: number) => void;
}) {
const [position, setPosition] =
useState<[number, number] | null>(null);

useMapEvents({
click(e) {
setPosition([
e.latlng.lat,
e.latlng.lng,
]);


  onSelect(
    e.latlng.lat,
    e.latlng.lng
  );
},


});

return position ? ( <Marker position={position} />
) : null;
}

export default function RegisterMap({
onSelect,
}: {
onSelect: (lat: number, lng: number) => void;
}) {
return (
<MapContainer
center={[34.4859, 133.3623]}
zoom={13}
style={{
height: "300px",
width: "100%",
}}
> <TileLayer
     attribution="&copy; OpenStreetMap contributors"
     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
   />


  <ClickMarker
    onSelect={onSelect}
  />
</MapContainer>


);
}
