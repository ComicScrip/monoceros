import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import * as L from "leaflet";
import { useEffect, useRef, useState } from "react";
import style from "../styles/deliveries.module.css";
import moment from "moment";

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

const Map = ({
  location,
  deliveryId,
  deliveries,
  packageId,
  packageLimits,
  minDate,
  maxDate,
  alerts,
}) => {
  const [map, setMap] = useState(null);
  const [filteredData, setFilteredData] = useState(location);

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

  useEffect(() => {
    setFilteredData(
      location.filter((dataset) =>
        moment(dataset.date).isBetween(minDate, maxDate, undefined, "[]")
      )
    );
  }, [minDate, maxDate, location]);

  return (
    <>
      <div data-cy="deliveryDetailMap">
        <MapContainer
          ref={setMap}
          center={
            filteredData.length !== 0
              ? [
                  filteredData[filteredData.length - 1].location.gpsla,
                  filteredData[filteredData.length - 1].location.gpslo,
                ]
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
          {filteredData?.map((point) => (
            <CustomMarker
              key={point.date}
              isActive
              map={map}
              data={{
                position: [point.location.gpsla, point.location.gpslo],
                title: moment(point.date).format("DD-MM-YY, hh:mm:ss"),
                icon: alerts.includes(point.date) ? redIcon : greenIcon,
                //icon: greenIcon,
                maxWidth: "95px",
                className: style.popupDetail,
                closeButton: false,
              }}
            />
          ))}
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
