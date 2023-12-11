import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { useState, useEffect } from "react";
import { Card, CardFooter, Select, SelectItem } from "@nextui-org/react";
import "leaflet/dist/leaflet.css";

import "leaflet.fullscreen";
import "leaflet.fullscreen/Control.FullScreen.css";

import crosshair from "../../Assets/images/Location.png";
import { MapSelectionItems } from "./MapSelectionItems.jsx";

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
      props.locData.latitude !== undefined &&
      props.locData.longitude !== undefined
    ) {
      setlatArr(props.locData.latitude);
      setlngArr(props.locData.longitude);
    }
  }, 3000);

  const locIcon = new Icon({
    iconUrl: crosshair,
    iconSize: [13.5, 13.5],
  });

  // Map selection
  const selectionArr = [
    {
      OSM_base: {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> GeoNetReach',
        url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      },
      stadiaDark: {
        attribution:
          '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> GeoNetReach',
        url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
      },
      OTM: {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> GeoNetReach, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>',
        url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      },
      esri_sat: {
        attribution:
          "&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS GeoNetReach",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      },
      NASA_nightSat: {
        attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
        url: 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/0/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg'
      }
    },
  ];
  // Attribution select
  const [attributionSelect, setAttributionSelect] = useState(selectionArr[0].stadiaDark.attribution);
  const [urlSelect, setUrlSelect] = useState(selectionArr[0].stadiaDark.url);
  const [maxZoom, setMaxZoom] = useState(20)

  const attributionHandler = (e) => {
    if (e.target.value === "Dark Street") {
      setAttributionSelect(selectionArr[0].stadiaDark.attribution);
      setUrlSelect(selectionArr[0].stadiaDark.url)
      setMaxZoom(20)
    } else if (e.target.value === "Street") {
      setAttributionSelect(selectionArr[0].OSM_base.attribution)
      setUrlSelect(selectionArr[0].OSM_base.url)
      setMaxZoom(19)
    } else if (e.target.value === "Topographic") {
      setAttributionSelect(selectionArr[0].OTM.attribution)
      setUrlSelect(selectionArr[0].OTM.url)
      setMaxZoom(17)
    } else if (e.target.value === "Satellite") {
      setAttributionSelect(selectionArr[0].esri_sat.attribution)
      setUrlSelect(selectionArr[0].esri_sat.url)
      setMaxZoom(20)
    } else if (e.target.value === "Satellite - Night") {
      setAttributionSelect(selectionArr[0].NASA_nightSat.attribution)
      setUrlSelect(selectionArr[0].NASA_nightSat.url)
      setMaxZoom(8)
    }
  };
  return (
    // <div
    //   style={{ backgroundColor: "#16181a" }}
    //   className="rounded p-0 bg-slate-600 h-fit"
    // >
    <Card className="bg-zinc-900 w-80 lg:h-80 sm:w-96 m-1">
      {showComponent && (
        <MapContainer
          center={[`${latArr}`, `${lngArr}`]}
          zoom={2}
          scrollWheelZoom={true}
          fullscreenControl={true}
          className="w-full h-64 rounded-md"
        >
          <TileLayer
            detectRetina={true}
            attribution={attributionSelect}
            maxZoom={maxZoom}
            url={urlSelect}
          />

          <Marker position={[`${latArr}`, `${lngArr}`]} icon={locIcon}>
            <Popup>
              <p>Recently downloaded location</p>
            </Popup>
          </Marker>
        </MapContainer>
      )}

      <CardFooter>
        <Select
          label="Select map"
          className="dark text-foreground"
          items={MapSelectionItems}
          onChange={attributionHandler}
          defaultSelectedKeys={["Dark Street"]}
        >
          {(map) => (
            <SelectItem
              key={map.label}
              value={map.value}
              description={map.description}
            >
              {map.label}
            </SelectItem>
          )}
        </Select>
      </CardFooter>
    </Card>
    //  </div>
  );
};

export default GoogleMaps;
