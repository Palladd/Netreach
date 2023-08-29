import React from "react";
import { useState } from "react";
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import "../../css/LocationDataContainer.css";

const LocationDataContainer = (props) => {
  const [location, setLocation] = useState("No location avaible");
  const [errorColor, setErrorColor] = useState("#ecedee");

  setInterval(() => {
    navigator.geolocation.watchPosition((LocRes) => {
      let NavArr = [
        {
          latitude: LocRes.coords.latitude.toFixed(5),
          longitude: LocRes.coords.longitude.toFixed(5),
          altitude: LocRes.coords.altitude,
          heading: LocRes.coords.heading,
          speed: LocRes.coords.speed,
          timestamp: new Date().toLocaleString(),
        },
      ];

      props.latlongLoc(NavArr);

      if (NavArr[0].altitude == null) {
        setErrorColor("#f31260");
        NavArr[0].altitude = "Not detected";
      } else if (NavArr[0].altitude != null) {
        NavArr[0].altitude = NavArr[0].altitude.toFixed(2);
        NavArr[0].altitude += " meters";
      }
      setLocation(NavArr);
    });
  }, 1000);

  let appleMapsLink = `http://maps.apple.com/?ll=${location[0].latitude},${location[0].longitude}&t=k&z=18`;

  return (
    <div className="p-0">
      <Card className="bg-zinc-900" variant="bordered">
        <CardHeader className="bg-zinc-900">
          {/* <Location set="curved" primaryColor="#ecedee" size='large'/> */}
          <p className="font-semibold text-3xl text-white">Location</p>
        </CardHeader>
        <CardBody className="bg-zinc-900">
          <p className="text-zinc-300">
            <span className="font-semibold">Timestamp:</span>{" "}
            {location[0].timestamp}
          </p>

          <p className="text-zinc-300">
            <span className="font-semibold">Latitude:</span>{" "}
            {location[0].latitude}
          </p>
          <p className="text-zinc-300">
            <span className="font-semibold">Longtitude:</span>{" "}
            {location[0].longitude}
          </p>
          <p className="text-zinc-300">
            <span className="font-semibold">Altitude:</span>{" "}
            <span style={{ color: `${errorColor}` }}>
              {location[0].altitude}
            </span>
          </p>
          {/* <p color="#ecedee"><span className='font-semibold'>Heading:</span>  <span style={{ color: `${errorColor}` }}>{location[0].heading}</span></p>
          <p color="#ecedee"><span className='font-semibold'>Speed:</span>    <span style={{ color: `${errorColor}` }}>{location[0].speed}</span></p> */}
        </CardBody>
        {/* <Divider className="bg-white my-2" color="#ffffff" /> */}
        <CardFooter style={{ backgroundColor: "#16181a" }}>
          <a href={appleMapsLink}>
            <Button color="primary" size={"sm"}>
              Open Apple Maps
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LocationDataContainer;

// color #ecedee
