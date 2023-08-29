// import "./css/appStyles.css";
import React, { useState } from "react";
import { Spacer, NextUIProvider } from '@nextui-org/react';
import './css/appStyles.css'

import Cellurar from "./components/Cellular/Cellular";
import LocationDataContainer from "./components/Containers/LocationDataContainer";
import GoogleMaps from "./components/Location/GoogleMaps";
import Time from "./components/Time";
// import TestServersChildren from "./components/TestServersChildren";

const App = (props) => {
  const [latlongData, setlatlongData] = useState('')
  const retback = (returnedData) => {
    setlatlongData(...returnedData)
  }


  return (
    <NextUIProvider>
         <Time />
         <Spacer y={3}/>
         <LocationDataContainer latlongLoc={retback} />
         {/* <Spacer y={2}/> */}
         {/* <GoogleMaps locData={latlongData} /> TO WORK OUT */}
         <Spacer y={3}/> 
        <Cellurar />
      </NextUIProvider>
  );
};

export default App;