import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const Map = ({ location, deliveryId }) => {
  const [delivery] = location.filter((loc) => loc.id === deliveryId);
  return (
    <>
      <div data-cy="deliveryDetailMap">
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
          data-cy="deliveryDetailMap"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {location.map((coordinates) => (
            <Marker
              key={coordinates.date}
              position={[
                coordinates.location.gpsla,
                coordinates.location.gpslo,
              ]}
              draggable={true}
              animate={true}
            >
              <Popup>Hey ! you found me</Popup>
            </Marker>
          ))}
          {/* <Marker
            position={ 
              // delivery?.location
              //   ? [delivery.location.gpsla, delivery.location.gpslo]
              //   : [46.388392427843584, 6.5068032539801255]
            }
            draggable={true}
            animate={true}
          > */}
          {/* <Popup>Hey ! you found me</Popup>
          </Marker> */}
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
