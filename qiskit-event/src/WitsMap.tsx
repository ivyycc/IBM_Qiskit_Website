import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const witsCoords = {
  lat: -26.1912498,
  lng: 28.0261846,
};

export default function WitsMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
  });

  return (
    <div className="w-full lg:w-1/2 h-80 lg:h-auto rounded-xl overflow-hidden shadow-lg">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={witsCoords}
          zoom={15}
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
      ) : (
        <p className="text-center text-yellow-500">Loading map...</p>
      )}
    </div>
  );
}
