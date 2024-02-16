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
    <div>
      Emails
      <div style={{ display: "flex", gap: "10px" }}>
        {menuOptions.map((menu, index) => (
          <button key={index} onClick={() => setOption(index)}>
            {menu}
          </button>
        ))}
      </div>
      <div>{displayComponent(option)}</div>
    </div>
  );
};

export default Emails;
