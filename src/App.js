import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const sendMail = async () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };
    console.log(from, to, subject, text);
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/mail",
      {
        to: to,
        subject: subject,
        from: from,
        text: text,
      },
      config
    );

    console.log(data);
  };
  return (
    <div>
      <div>
        from :<input value={from} onChange={(e) => setFrom(e.target.value)} />
      </div>
      <div>
        to :<input value={to} onChange={(e) => setTo(e.target.value)} />
      </div>
      <div>
        subject :
        <input value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>
      <div>
        text :<input value={text} onChange={(e) => setText(e.target.value)} />
      </div>

      <button
        onClick={() => {
          sendMail();
        }}
      >
        sendMail
      </button>
    </div>
  );
}

export default App;
