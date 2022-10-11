import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { fetchData } from "@utils/helper";
import { Geocode } from "@tstypes/Geocode";

export type MapProps = {
  address: string;
};

export function EventMap({ address }: MapProps) {
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);

  useEffect(() => {
    const geocode = async (address: string) => {
      const data = await fetchData<[Geocode]>(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json&polygon_geojson=1&addressdetails=1&limit=1`
      );

      setLat(parseFloat(data[0].lat));
      setLon(parseFloat(data[0].lon));
    };

    geocode(address).catch((err) => {
      throw new Error();
    });
  }, [address]);

  if (!lat || !lon)
    return (
      <div className="mt-4 flex items-center justify-center" style={{ height: "500px", width: "100%" }}>
        <h1 className="font-lato text-3xl">Unable to locate</h1>
      </div>
    );

  return (
    <MapContainer
      className="mt-4"
      style={{ height: "500px", width: "100%" }}
      center={[lat as number, lon as number]}
      zoom={20}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat as number, lon as number]} />
    </MapContainer>
  );
}
