import "../css/InputFormStyles.css";
import React, { useState } from "react";
import axios from "axios";

const InputForm = (props) => {
  const APIKEY = "88a6e781b6994a86bbd0c82520550865";
  
  const [enteredIP, setEnteredIP] = useState('')

  const [apiResponseCity, setApiResponseCity] = useState("");
  const [apiResponseCountry, setApiResponseCountry] = useState("");
  const [apiResponseContinent, setApiResponseContinent] = useState("");
  
// On demand connection
  const apiDownloadHandler = () => {
    axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${APIKEY}&ip_address=${enteredIP}`)
      .then((res) => {
        
        setApiResponseCity(res.data.city)
        setApiResponseCountry(res.data.country)
        setApiResponseContinent(res.data.continent)

        const responseArr = {
          city: {apiResponseCity},
          country: {apiResponseCountry},
          continent: {apiResponseContinent}
        }

        props.gatheredDataConveyor(responseArr)
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        // console.warn("Operation finished");
      });
  };

  const inputHandler = (e) => {
    setEnteredIP(e.target.value)
    props.sendDataToParent(e.target.value)
  }

  return (
    <div className="outputForm_style">
      <div className="btnCont">
        <form>
          <input className="IPinput" type="text" placeholder="Enter IP" onChange={inputHandler}/>
        </form>
        
        <button onClick={apiDownloadHandler}>Request info</button>
      </div>
    </div>
  );
};

export default InputForm;