import InputForm from "../InputForm";
import OutputForm from "../OutputForm";
import TestServers from "../Containers/TestServers";
import "../../css/FormContainerStyles.css";
import React, { useState } from "react";

const FormContainer = () => {
  const [resToOutput, setResToOutput] = useState("Waiting for input...");
  const [data, setData] = useState("Waiting for input...");

  const inputFormResponse = (apiResponse) => {
    setResToOutput(apiResponse);
  };

  const gatheredData = (data) => {
    console.log(data);
    setData(data);
  };

  return (
    <div className="container">
      <InputForm
        className="InputFormStyle"
        sendDataToParent={inputFormResponse}
        gatheredDataConveyor={gatheredData}
      />
      <TestServers /> 
      <OutputForm response={resToOutput} responseData={data} />
    </div>
  );
};

export default FormContainer;
