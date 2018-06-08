import React from "react";
import { spinner } from "../../images";

const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading..."
        style={{
          width: "200px",
          margin: "auto",
          display: "block"
        }}
      />{" "}
    </div>
  );
};

export default Spinner;
