import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import moment from "moment";
import { useEffect, useState } from "react";
import { getDeliveriesLocalisation } from "../lib/sensorDataAPI";
import { getSensorData } from "../lib/sensorDataAPI";

const Map = ({ deliveryId, packageId = 0, type }) => {
  const [deliveryLocation, setDeliveryLocation] = useState([]);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    if (type === "delivery") {
      getDeliveriesLocalisation().then(setDeliveryLocation);
    }
  }, [type, deliveryId]);

  useEffect(() => {
    if (type === "package") {
      getSensorData(deliveryId, packageId, "location").then(setLocation);
    }
  }, [type, deliveryId, packageId]);

  const [delivery] = deliveryLocation.filter((loc) => loc.id === deliveryId);
  const lastLoc = location[location.length - 1];
  console.log("lastloc", lastLoc);
  console.log("location", location);
  console.log("deliveryloc", deliveryLocation);
  return (
    <>
      <div data-cy="deliveryDetailMap">
        <MapContainer
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
              <Popup>
                {moment(coordinates.date).format("DD-MM-YY, hh:mm:ss")}
              </Popup>
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
