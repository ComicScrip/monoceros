import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import * as L from "leaflet";
import { useEffect, useRef, useState } from "react";

const CustomMarker = ({ isActive, data, map }) => {
  const [refReady, setRefReady] = useState(false);
  let popupRef = useRef();

  useEffect(() => {
    if (refReady && isActive) {
      map.openPopup(popupRef);
    }
  }, [isActive, refReady, map]);

  return (
    <Marker position={data.position} icon={data.icon}>
      <Popup
        ref={(r) => {
          popupRef = r;
          setRefReady(true);
        }}
      >
        {data.title}
      </Popup>
    </Marker>
  );
};

const Map = ({ location, deliveryId, deliveryPackage }) => {
  const [delivery] = location.filter((loc) => loc.id === deliveryId);
  const [map, setMap] = useState(null);

  const greenIcon = L.icon({
    iconUrl: "/images/marker-icon-green.png",
    iconSize: [25, 40],
  });

  const redIcon = L.icon({
    iconUrl: "/images/marker-icon-red.png",
    iconSize: [25, 40],
  });

  return (
    <div>
      <MapContainer
        ref={setMap}
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
        <CustomMarker
          isActive
          map={map}
          data={{
            position: delivery?.location
              ? [delivery.location.gpsla, delivery.location.gpslo]
              : [46.388392427843584, 6.5068032539801255],
            title: delivery?.id,
            icon: deliveryPackage.filter((p) => p.alert === true)[0]
              ? redIcon
              : greenIcon,
          }}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
