// import "./css/appStyles.css";
import React, { useState } from "react";
import { Input, NextUIProvider } from "@nextui-org/react";
import axios from "axios";
import "./css/appStyles.css";

import Connection from "./components/Connection/Connection_sd";
import LocationDataContainer from "./components/Geolocation/LocationDataContainer";
import GoogleMaps from "./components/Map/Map";
import Time from "./components/Time/Time";

const App = (props) => {
  const [latlongData, setlatlongData] = useState("");
  const retback = (returnedData) => {
    setlatlongData(...returnedData);
  };

  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");

  return (
    <NextUIProvider>
      <div className="flex flex-col items-center sm:flex-wrap lg:items-start lg:flex-row">
        <Time />
        <LocationDataContainer latlongLoc={retback} className="md:w-32" />
        <GoogleMaps
          className="w-36 dark text-foreground"
          locData={latlongData}
        />
        <Connection />
      </div>
    </NextUIProvider>
  );
};

export default App;
