import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          //   justifyContent: "space-between",
          //   margin: "0 5px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "5px",
            padding: "0 10px",
          }}
        >
          <label
            style={{
              padding: "5px 0",
              gap: "5px",
            }}
          >
            From:
            <input
              style={{ padding: "0 5px " }}
              type="text"
              name="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </label>
          <label
            style={{
              borderWidth: "0.5px 0 0 0",
              borderStyle: "solid",
              padding: "5px 0",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2px 5px",
              }}
            >
              To:
              {to.map((email, index) => (
                <p style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                  {email + "  "}

                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      setTo(to.filter((x) => x !== email));
                    }}
                    style={{
                      height: "90%",
                      borderRadius: "40%",
                      borderWidth: 0,
                    }}
                  >
                    X
                  </button>
                </p>
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
                style={{ borderWidth: 0 }}
              />
            </div>
          </label>
          <label
            style={{
              borderWidth: "0.5px 0 0 0",
              borderStyle: "solid",
              padding: "5px 0",
            }}
          >
            Subject:
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </label>
          <label
            style={{
              borderWidth: "0.5px 0 0 0",
              borderStyle: "solid",
              padding: "5px 0",
            }}
          >
            date:
            <input
              type="datetime-local"
              name="date"
              min={new Date()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "98%",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <textarea
            value={content}
            placeholder="content"
            onChange={(e) => setContent(e.target.value)}
            style={{
              height: "90%",
              width: "100%",
              borderWidth: 0,
              resize: "none",
            }}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "10px",
              justifyContent: "flex-start",
            }}
          >
            <button>attach</button>
            <button onClick={composeScheduledMail}>submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComposeEmail;
