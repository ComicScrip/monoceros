import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const Map = ({ location, deliveryId }) => {
  const [delivery] = location.filter((loc) => loc.id === deliveryId);
  return (
    <div>
      <MapContainer
        center={
          delivery?.location
            ? [delivery.location.gpsla, delivery.location.gpslo]
            : [46.388392427843584, 6.5068032539801255]
        }
        zoom={14}
        scrollWheelZoom={false}
        style={{
          height: 200,
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "10px",
          borderRadius: "10px",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={
            delivery?.location
              ? [delivery.location.gpsla, delivery.location.gpslo]
              : [46.388392427843584, 6.5068032539801255]
          }
          draggable={true}
          animate={true}
        >
          <Popup>Hey ! you found me</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
