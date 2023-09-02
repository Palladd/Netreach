import React, { useEffect, useState } from "react";
import axios from "axios";

const API = (props) => {
    const apiResArr = [
        {
            lat: null,
            lon: null,
        }
    ] 

    const [apiRes, setApiRes] = useState(apiResArr[0].lat)


  useEffect(() => {
    const API_KEY = "1d1c4593dc4212aeff0a8ad97ba2db21";
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=szczecin,pl&appid=${API_KEY}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally();
  }, []);

  return;
};

export default API;
