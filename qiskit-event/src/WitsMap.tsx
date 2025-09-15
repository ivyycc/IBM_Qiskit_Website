import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px", // fixed height to start
};

const witsCoords = { lat: -26.1912498, lng: 28.0261846 };

export default function WitsMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY! ,
  });

  if (!isLoaded) return <p className="text-center text-yellow-500">Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={witsCoords}
      zoom={16}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
      }}
    >
      <Marker position={witsCoords} />
    </GoogleMap>
  );
}
