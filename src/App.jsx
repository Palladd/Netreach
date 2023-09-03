// import "./css/appStyles.css";
import React, { useState } from "react";
import { Spacer, NextUIProvider } from "@nextui-org/react";
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
