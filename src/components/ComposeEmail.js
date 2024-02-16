import React, { useEffect, useState } from "react";
import axios from "axios";

import "./ComposeEmail.css";

const ComposeEmail = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState([]);
  const [tempTo, setTempTo] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    console.log(to);
  }, [to]);

  const composeScheduledMail = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };
    console.log(from, to, subject, content);
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/mail/schedule",
      {
        date: new Date(date),
        from: from,
        to: to,
        subject: subject,
        content: content,
      },
      config
    );

    console.log(data);
  };

  const del = async (email, index, e) => {
    e.preventDefault();
    console.log(email, index);
    setTo(to.filter((x) => x !== email));
  };
  return (
    <div>
      <div className="compose-form">
        <label>
          From:
          <input
            type="text"
            name="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </label>
        <label>
          To:
          <div style={{ display: "flex", gap: "10px" }}>
            {to.map((email, index) => (
              <button
                key={index}
                onClick={(e) => {
                  //   e.preventDefault;
                  del(email, index, e);
                }}
              >
                {email}
              </button>
            ))}
            <input
              type="text"
              name="to"
              value={tempTo}
              onChange={(e) => setTempTo(e.target.value)}
              onBlur={() => {
                tempTo.trim() !== "" && setTo((prev) => [...prev, tempTo]);
                setTempTo("");
              }}
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  tempTo.trim() !== "" && setTo((prev) => [...prev, tempTo]);
                  setTempTo("");
                }
              }}
            />
          </div>
        </label>
        <label>
          Subject:
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>

        <label>
          date:
          <input
            type="datetime-local"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <button onClick={composeScheduledMail}>submit</button>
      </div>
    </div>
  );
};

export default ComposeEmail;
