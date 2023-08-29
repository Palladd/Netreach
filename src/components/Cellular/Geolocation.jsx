import React from "react";
import "../../css/Geolocation.css";

const Geolocation = (props) => {

    let themeChanger;
    if(props.darkMode) {
        themeChanger = "text-white"
    }
    else {
        themeChanger = "text-black"
    }

  return (
    <div className="container">
        <div className="subcontainer">
            <p className={`RobotoMono text-sm whitespace-nowrap ${ themeChanger }`}><span className="font-extrabold">isp name:</span> { props.passedResArr.ispName }</p>
            <p className={`RobotoMono text-sm whitespace-nowrap ${ themeChanger }`}><span className="font-extrabold">isp organization name:</span> { props.passedResArr.ispOrgName }</p>
            <p className={`RobotoMono text-sm whitespace-nowrap ${ themeChanger }`}><span className="font-extrabold">connection type:</span> { props.passedResArr.connType }</p>
            <p className={`RobotoMono text-sm whitespace-nowrap ${ themeChanger }`}><span className="font-extrabold">internet provider:</span> { props.passedResArr.ASO }</p>
            <p className={`RobotoMono text-sm whitespace-nowrap ${ themeChanger }`}><span className="font-extrabold">VPN:</span> { props.passedResArr.isVPN.toString() }</p>
            <p className={`RobotoMono text-sm whitespace-nowrap ${ themeChanger }`}><span className="font-extrabold">IP address:</span> { props.passedResArr.ipAdd }</p>
            <p className={`RobotoMono text-sm whitespace-nowrap ${ themeChanger }`}><span className="font-extrabold">timestamp:</span> { props.passedResArr.timestamp }</p>
        </div>
    </div>
  );
};

export default Geolocation;
