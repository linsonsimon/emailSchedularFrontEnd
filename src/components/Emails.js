import React, { useEffect, useState } from "react";
import ComposeEmail from "./ComposeEmail";
import ScheduledEmail from "./ScheduledEmail";

const Emails = () => {
  const [option, setOption] = useState(0);

  const menuOptions = ["ComposeEmail", "ScheduledEmail"];

  //   useEffect(() => {
  //     displayComponent(option);
  //   }, [option]);

  const displayComponent = (option) => {
    switch (option) {
      case 0:
        return <ComposeEmail />;
        break;
      case 1:
        return <ScheduledEmail />;
        break;
    }
  };
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "96%",
        height: "96%",
        rowGap: "5px",
        backgroundColor: "rgb(242,242,242)",
      }}
    >
      <h2 style={{ padding: "0 5px" }}>Emails</h2>

      <div
        style={{
          display: "flex",
          padding: "0 5px",
        }}
      >
        {menuOptions.map((menu, index) => (
          <div
            style={{
              cursor: "pointer",
              width: `calc(100% / ${menuOptions.length})`,
              padding: "3px",
              display: "flex",
              justifyContent: "space-around",
              backgroundColor: `${
                index === option ? "rgb(240,220,240)" : "inherit"
              }`,
            }}
            key={index}
            onClick={() => setOption(index)}
          >
            <p>{menu}</p>
          </div>
        ))}
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {displayComponent(option)}
      </div>
    </div>
  );
};

export default Emails;
