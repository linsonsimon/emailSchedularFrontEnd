import React from "react";
import ComposeEmail from "./ComposeEmail";

const Emails = () => {
  return (
    <div>
      Emails
      <div>
        <h2>Compose Email</h2>
        <h2>Scheduled Email</h2>
      </div>
      <div>
        <ComposeEmail />
      </div>
    </div>
  );
};

export default Emails;
