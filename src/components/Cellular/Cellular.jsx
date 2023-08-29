import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Switch,
  Chip,
  Button,
  Accordion,
  AccordionItem,
  Link
} from "@nextui-org/react";
import axios from "axios";
import CellularMoonIcon from "./CellularMoonIcon";
import CellularSunIcon from "./CellularSunIcon";
import Geolocation from "./Geolocation";

const Cellurar = (props) => {
  const [isSelected, setIsSelected] = useState(true);
  const [onLineStatus, setOnLineStatus] = useState("not detected");

  // API HANDLER
  const APIKEY = "88a6e781b6994a86bbd0c82520550865";
  const [data, setData] = useState({
    ispName: "--",
    ispOrgName: "--",
    connType: "--",
    ASO: "--",
    isVPN: "--",
    ipAdd: "--",
    timestamp: "--",
  });

  const geolocHandler = () => {
    axios
      .get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${APIKEY}`)
      .then((res) => {
        console.log(res);
        const newData = {
          ispName: res.data.connection.isp_name,
          ispOrgName: res.data.connection.organization_name,
          connType: res.data.connection.connection_type,
          ASO: res.data.connection.autonomous_system_organization,
          isVPN: res.data.security.is_vpn,
          ipAdd: res.data.ip_address,
          timestamp: res.data.timezone.current_time,
        };
        setData(newData);
      })
      .catch((err) => {
        // console.error(err);
      })
      .finally(() => {
        // console.warn("Operation finished");
      });
  };
  // END API HANDLER

  // Online/Offline checker
  setInterval(myCallback, 6000);
  function myCallback() {
    setOnLineStatus(navigator.onLine);
  }

  return (
    <Card className={`${isSelected ? "bg-zinc-900" : "bg-white"} pb-4`}>
      <CardHeader className="flex justify-between">
        <p
          className={`${
            isSelected ? "text-white" : "text-zinc-900"
          } font-semibold text-3xl`}
        >
          Connection{" "}
        </p>
        <Chip
          className="mt-2"
          size="sm"
          variant="shadow"
          color={onLineStatus ? "success" : "danger"}
        >
          {onLineStatus ? "Online" : "Offline"}
        </Chip>
      </CardHeader>
      <CardBody>
        <Geolocation passedResArr={data} darkMode={isSelected} />
        <p className={`${isSelected ? "text-white" : "text-zinc-900"} `}></p>
      </CardBody>
      <CardFooter className="flex justify-between">
        <Button size="sm" color="primary" onClick={geolocHandler}>
          Send API request
        </Button>

        <div className="flex flex-row">
          <Switch
            defaultSelected
            onValueChange={setIsSelected}
            thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                <CellularMoonIcon className={className} />
              ) : (
                <CellularSunIcon className={className} />
              )
            }
          ></Switch>
          <p
            className={`${
              isSelected ? "text-white" : "text-zinc-900"
            } text-xs mt-1`}
          >
            {isSelected ? "Dark mode" : "Bright mode"}
          </p>
        </div>
      </CardFooter>
      
      {/* Accordion */}
      <Accordion isCompact>
      <AccordionItem key="1" aria-label="glossary" title="Glossary" className="font-semibold">
        <p>isp name - <span className="font-normal">(Internet Service Provider) Company that provides Internet connection and services to individuals and organizations.</span></p>
        <p>isp organization name - <span className="font-normal">Official name of ISP organization.</span></p>
        <p>connection type - <span className="font-normal">Type of network connection. Your's must be one of this: <Link isExternal href="https://en.wikipedia.org/wiki/Dial-up_Internet_access" showAnchorIcon >Dial-up</Link>, <Link isExternal href="https://en.wikipedia.org/wiki/Digital_subscriber_line" showAnchorIcon >Cable/DSL</Link>, <Link isExternal href="https://en.wikipedia.org/wiki/Cellular_network" showAnchorIcon >Cellular</Link>, <Link isExternal href="https://simple.wikipedia.org/wiki/Corporate_network" showAnchorIcon >Corporate</Link>.</span></p>
        <p>internet provider - <span className="font-normal">(autonomous system organization). For example AT&T, T-Mobile, O2, Virgin, Vodafone.</span></p>
        <p>VPN - <span className="font-normal">(Internet Service Provider) Company that provides Internet connection and services to individuals and organizations.</span></p>
        <p>IP address - <span className="font-normal">(Internet Service Provider) Company that provides Internet connection and services to individuals and organizations.</span></p>
        <p>timestamp - <span className="font-normal">(Internet Service Provider) Company that provides Internet connection and services to individuals and organizations.</span></p>
      </AccordionItem>
    </Accordion>
    </Card>
  );
};

export default Cellurar;

<Link isExternal href="https://github.com/nextui-org/nextui" showAnchorIcon >Dial-up</Link>