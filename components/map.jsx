import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import moment from "moment";
import { getDeliveriesLocalisation } from "../lib/sensorDataAPI";
import { getSensorData } from "../lib/sensorDataAPI";
import * as L from "leaflet";
import { useEffect, useRef, useState } from "react";
import style from "../styles/deliveries.module.css";

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
        maxWidth={data.maxWidth}
        className={data.className}
        closeButton={data.closeButton}
      >
        {data.title}
      </Popup>
    </Marker>
  );
};

// const Map = ({ deliveryId, packageId = 0, type }) => {
//   const [deliveryLocation, setDeliveryLocation] = useState([]);
//   const [location, setLocation] = useState([]);

//   useEffect(() => {
//     if (type === "delivery") {
//       getDeliveriesLocalisation().then(setDeliveryLocation);
//     }
//   }, [type, deliveryId]);

//   useEffect(() => {
//     if (type === "package") {
//       getSensorData(deliveryId, packageId, "location").then(setLocation);
//     }
//   }, [type, deliveryId, packageId]);

//   const [delivery] = deliveryLocation.filter((loc) => loc.id === deliveryId);
//   const lastLoc = location[location.length - 1];
//   console.log("lastloc", lastLoc);
//   console.log("location", location);
//   console.log("deliveryloc", deliveryLocation);

const Map = ({ location, deliveryId, deliveries, packageId, type }) => {
  const [deliveryLocation, setDeliveryLocation] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [delivery] = location.filter((loc) => loc.id === deliveryId);

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (type === "delivery") {
      getDeliveriesLocalisation().then(setDeliveryLocation);
    }
  }, [type, deliveryId]);

  useEffect(() => {
    if (type === "package") {
      getSensorData(deliveryId, packageId, "location").then(setLocationData);
    }
  }, [type, deliveryId, packageId]);

  const greenIcon = L.icon({
    iconUrl: "/images/marker-icon-green.png",
    iconSize: [25, 40],
    popupAnchor: [0, -20],
  });

  const redIcon = L.icon({
    iconUrl: "/images/marker-icon-red.png",
    iconSize: [25, 40],
    popupAnchor: [0, -20],
  });

  const deliveriesArray = deliveries.filter((p) => p.id === delivery?.id);
  const deliveryAlert = deliveriesArray[0]?.alerts_count;
  const lastLoc = location[location.length - 1];

  return (
    <>
      <div data-cy="deliveryDetailMap">
        <MapContainer
          ref={setMap}
          center={
            type === "delivery"
              ? [delivery?.location.gpsla, delivery?.location.gpslo]
              : type === "package"
              ? [lastLoc?.location.gpsla, lastLoc?.location.gpslo]
              : [46.388392427843584, 6.5068032539801255]
          }
          // center={
          //   lastLoc ? [lastLoc.location.gpsla, lastLoc.location.gpslo] : [0, 0]
          // }
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
          {/* {location.map((coordinates) => (
            <Marker
              key={coordinates.date}
              position={[
                coordinates.location.gpsla,
                coordinates.location.gpslo,
              ]}
              draggable={true}
              animate={true}
            >
              <Popup>
                {moment(coordinates.date).format("DD-MM-YY, hh:mm:ss")}
              </Popup>
            </Marker>
          ))} */}
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
          </Marker> */}{" "}
          <CustomMarker
            isActive
            map={map}
            data={{
              position: delivery?.location
                ? [delivery.location.gpsla, delivery.location.gpslo]
                : [46.388392427843584, 6.5068032539801255],
              title: delivery?.id,
              icon: deliveryAlert !== null ? redIcon : greenIcon,
              maxWidth: "65px",
              className: style.popup,
              closeButton: false,
            }}
          />
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
