import React from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { Icon } from "leaflet";
import { useState, useEffect } from "react";
import 'leaflet/dist/leaflet.css';

import 'leaflet.fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';

import crosshair from "../../Assets/images/Location.png";

// import "../../css/GoogleMaps.css";

const GoogleMaps = (props) => {
  // Delay of component loading
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setShowComponent(true), 4000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Setting map position to location
  const [latArr, setlatArr] = useState(" ");
  const [lngArr, setlngArr] = useState(" ");

  setInterval(() => {
    if (
      props.locData.latitude != undefined &&
      props.locData.longitude != undefined
    ) {
      setlatArr(props.locData.latitude);
      setlngArr(props.locData.longitude);
    }
  }, 3000);

  const locIcon = new Icon({
    iconUrl: crosshair,
    iconSize: [12, 12],
  });

  return (
    <div
      style={{ backgroundColor: "#16181a" }}
      className="rounded p-0 bg-slate-600"
    >
      Component delay
      {showComponent && (
        <MapContainer
          center={[`${latArr}`, `${lngArr}`]}
          zoom={9}
          scrollWheelZoom={true}
          fullscreenControl={true}
          className="w-full h-52 rounded-md"
        >
          <TileLayer
            detectRetina={true}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Palladd, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[`${latArr}`, `${lngArr}`]} icon={locIcon}>
            <Popup>
              <p>Recently downloaded location</p>
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default GoogleMaps;
