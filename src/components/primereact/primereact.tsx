import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import ChartLineStyle, { PieChartDemo } from "./chartLineStyle";

const Primereact = () => {
  const [text, setText] = useState("");
  return (
    <div>
      <div>
        <ChartLineStyle />
      </div>
      <div>
        <PieChartDemo />
      </div>
    </div>
  );
};

export default Primereact;
