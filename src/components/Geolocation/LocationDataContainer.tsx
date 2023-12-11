import React from "react";
import { useState } from "react";
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
  Link,
  Spacer,
} from "@nextui-org/react";
import "../../css/LocationDataContainer.css";

const LocationDataContainer = (props) => {
  // Checking is location avaible
  const [isLocAvaiStr, setIsLocAvaiStr] = useState("");
  const [isLocAvaiCol, setIsLocAvaiCol]: any = useState("");

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocAvaiStr("Avaible");
        setIsLocAvaiCol("success");
      },
      (error) => {
        setIsLocAvaiStr("Error");
        setIsLocAvaiCol("danger");
      }
    );
  } else {
    setIsLocAvaiStr("Not avaible");
    setIsLocAvaiCol("warning");
  }

  const [location, setLocation]: any = useState("No location avaible");
  const [errorColor, setErrorColor] = useState("#ecedee");

  setInterval(() => {
    navigator.geolocation.watchPosition((LocRes) => {
      let NavArr: any = [
        {
          latitude: LocRes.coords.latitude.toFixed(7),
          longitude: LocRes.coords.longitude.toFixed(7),
          altitude: LocRes.coords.altitude,
          accuracy: LocRes.coords.accuracy.toFixed(2),
          altAccuracy : LocRes.coords.altitudeAccuracy,
          timestamp: new Date().toLocaleString(),
        },
      ];
      props.latlongLoc(NavArr);

      if (NavArr[0].altitude == null && NavArr[0].altAccuracy == null) {
        setErrorColor("#f31260");
        NavArr[0].altitude = "Not detected"
        NavArr[0].altAccuracy = "Not detected"
      } else if (NavArr[0].altitude != null && NavArr[0].altAccuracy != null) {
        NavArr[0].altitude = NavArr[0].altitude.toFixed(2);
        NavArr[0].altAccuracy = NavArr[0].altAccuracy.toFixed(2);
        NavArr[0].altitude += " meters";
      }
      setLocation(NavArr);
    });
  }, 1000);

  let appleMapsLink = `http://maps.apple.com/?ll=${location[0].latitude},${location[0].longitude}&t=k&z=18`;

  return (
    <div className="p-0">
      <Card className="bg-zinc-900 w-80 lg:h-80 sm:w-96 m-1">
        <CardHeader className="bg-zinc-900 flex justify-between">
          {/* <Location set="curved" primaryColor="#ecedee" size='large'/> */}
          {/* <p className="">Location</p> */}
          <div>
            <p className={`font-semibold text-3xl text-white`}>Geolocation</p>
            <p>
              <Link
                className={`font-normal text-xs `}
                showAnchorIcon
                isExternal
                href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation"
              >
                Geolocation API
              </Link>
            </p>
          </div>

          <Chip
            className="mt-2"
            size="sm"
            variant="shadow"
            color={isLocAvaiCol}
          >
            {isLocAvaiStr}
          </Chip>
        </CardHeader>
        <CardBody className="bg-zinc-900">
          <p className="text-zinc-300">
            <span className="font-semibold">Timestamp: </span>
            {location[0].timestamp}
          </p>

          <p className="text-zinc-300">
            <span className="font-semibold">Latitude: </span>
            {location[0].latitude}
          </p>
          <p className="text-zinc-300">
            <span className="font-semibold">Longtitude: </span>
            {location[0].longitude}
          </p>
          <p className="text-zinc-300">
            <span className="font-semibold">Altitude: </span>
            <span style={{ color: `${errorColor}` }}>
              {location[0].altitude}
            </span>
          </p>
          <Spacer y={2}/>
          <p className="text-zinc-300">
            <span className="font-semibold">Accuracy (meters): </span>
            <span>
              {location[0].accuracy}
            </span>
          </p>
          <p className="text-zinc-300">
            <span className="font-semibold">Altitude accuracy (meters): </span>
            <span style={{ color: `${errorColor}` }}>
              {location[0].altAccuracy}
            </span>
          </p>
        </CardBody>
        <CardFooter style={{ backgroundColor: "#16181a" }}>
          <a href={appleMapsLink}>
            <Button color="primary" size={"sm"}>
              Open in Maps
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LocationDataContainer;