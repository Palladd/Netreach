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
  Link,
} from "@nextui-org/react";
import axios from "axios";
import CellularMoonIcon from "./CellularMoonIcon";
import CellularSunIcon from "./CellularSunIcon";
import Geolocation from "./Geolocation";

const Connection = (props) => {
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

  const [rawData , setRawData] = useState('')

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
        setRawData(res.data)
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

  // height changer handler
  const [heightChanger, setHeightChanger] = useState("lg:h-80");
  const heightChangerHandler = (e) => {
    if (heightChanger === "lg:h-80") {
      setHeightChanger("lg:h-fit");
    } else {
      setTimeout(() => {
        setHeightChanger("lg:h-80");
      }, 300);
    }
  };

  return (
    <Card
      className={`${
        isSelected ? "bg-zinc-900" : "bg-white"
      } pb-4 w-80 ${heightChanger} sm:w-96 m-1`}
    >
      <CardHeader className="flex justify-between">
        <div>
          <p
            className={`${
              isSelected ? "text-white" : "text-zinc-900"
            } font-semibold text-3xl`}
          >
            Connection{" "}
          </p>
          <p>
            <Link
              className={`font-normal text-xs`}
              showAnchorIcon
              isExternal
              href="https://www.abstractapi.com/"
            >
              API provided by Absctract API
            </Link>
          </p>
        </div>
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

        {/* <p>{JSON.stringify(rawData, null, 2)}</p> all response*/}
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

      <Accordion variant="splitted">
        <AccordionItem
          key="1"
          aria-label="glossary"
          title="Glossary"
          onClick={heightChangerHandler}
          style={{
            backgroundColor: `${
              isSelected ? "rgb(39, 39, 42)" : "rgb(215, 215, 220)"
            }`,
          }}
          classNames={{
            title: isSelected
              ? "text-white font-semibold"
              : "text-zinc-900 font-semibold",
          }}
        >
          <p
            className={`${
              isSelected ? "text-white" : "text-zinc-900"
            } font-semibold`}
          >
            isp name -{" "}
            <span
              className={`font-normal ${
                isSelected ? "text-zinc-300" : "text-zinc-900"
              }`}
            >
              (Internet Service Provider) Company that provides Internet
              connection and services to individuals and organizations.
            </span>
          </p>
          <p
            className={`${
              isSelected ? "text-white" : "text-zinc-900"
            } font-semibold`}
          >
            isp organization name -{" "}
            <span
              className={`font-normal ${
                isSelected ? "text-zinc-300" : "text-zinc-900"
              }`}
            >
              Official name of ISP organization.
            </span>
          </p>
          <p
            className={`${
              isSelected ? "text-white" : "text-zinc-900"
            } font-semibold`}
          >
            connection type -{" "}
            <span
              className={`font-normal ${
                isSelected ? "text-zinc-300" : "text-zinc-900"
              }`}
            >
              Type of network connection. Your's must be one of this:{" "}
              <Link
                isExternal
                href="https://en.wikipedia.org/wiki/Dial-up_Internet_access"
                showAnchorIcon
              >
                Dial-up
              </Link>
              ,{" "}
              <Link
                isExternal
                href="https://en.wikipedia.org/wiki/Digital_subscriber_line"
                showAnchorIcon
              >
                Cable/DSL
              </Link>
              ,{" "}
              <Link
                isExternal
                href="https://en.wikipedia.org/wiki/Cellular_network"
                showAnchorIcon
              >
                Cellular
              </Link>
              ,{" "}
              <Link
                isExternal
                href="https://simple.wikipedia.org/wiki/Corporate_network"
                showAnchorIcon
              >
                Corporate
              </Link>
              .
            </span>
          </p>
          <p
            className={`${
              isSelected ? "text-white" : "text-zinc-900"
            } font-semibold`}
          >
            internet provider -{" "}
            <span
              className={`font-normal ${
                isSelected ? "text-zinc-300" : "text-zinc-900"
              }`}
            >
              (autonomous system organization). For example AT&T, T-Mobile, O2,
              Virgin, Vodafone.
            </span>
          </p>
          <p
            className={`${
              isSelected ? "text-white" : "text-zinc-900"
            } font-semibold`}
          >
            VPN -{" "}
            <span
              className={`font-normal ${
                isSelected ? "text-zinc-300" : "text-zinc-900"
              }`}
            >
              A VPN, or Virtual Private Network, is a technology that creates a
              secure and encrypted connection over the internet, allowing users
              to access resources and browse the web privately and securely. It
              masks the user's IP address and encrypts their online activities,
              making it difficult for third parties, such as hackers or
              government agencies, to intercept or monitor their data. VPNs are
              commonly used for enhancing online privacy, bypassing
              geo-restrictions, and securing data when using public Wi-Fi
              networks.
            </span>
          </p>
          <p
            className={`${
              isSelected ? "text-white" : "text-zinc-900"
            } font-semibold`}
          >
            IP address -{" "}
            <span
              className={`font-normal ${
                isSelected ? "text-zinc-300" : "text-zinc-900"
              }`}
            >
              (Internet Protocol address) Unique sequence of numbers identifying
              device connected to the internet. IP addresses can be either IPv4
              (32-bit) or IPv6 (128-bit).
            </span>
          </p>
          <p
            className={`${
              isSelected ? "text-white" : "text-zinc-900"
            } font-semibold`}
          >
            timestamp -{" "}
            <span
              className={`font-normal ${
                isSelected ? "text-zinc-300" : "text-zinc-900"
              }`}
            >
              Assigns the time at which API was requested from server.
            </span>
          </p>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default Connection;
