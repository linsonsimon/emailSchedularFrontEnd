import React from "react";
import Emails from "../components/Emails";

const HomePage = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Emails />
    </div>
  );
};

export default HomePage;
