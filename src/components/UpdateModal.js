import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateModal = ({ setShowModal, mailData }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState([]);
  const [tempTo, setTempTo] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setFrom(mailData.from);
    setTo(mailData.to);
    setSubject(mailData.subject);
    setContent(mailData.content);
    setDate(mailData.date);
  }, [mailData]);

  const reScheduledMail = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      };
      const { data } = await axios.patch(
        `http://localhost:5000/api/v1/mail/reSchedule/${mailData._id}`,
        {
          date: new Date(date),
          from: from,
          to: to,
          subject: subject,
          content: content,
          mailId: mailData._id,
        },
        config
      );

      console.log(data);
      setShowModal(false);
    } catch (error) {
      alert(
        error.response.data.statusCode + " : " + error.response.data.message
      );
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        background: "rgba(179, 181, 186, 0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "80%",
          width: "60%",
          gap: "10px",
          padding: "5px 5px",
          backgroundColor: "whitesmoke",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "25px",
            justifyContent: "space-between",
          }}
        >
          <p>Reshedule Mail</p>
          <button
            onClick={() => setShowModal(false)}
            style={{ height: "25px", width: "25px" }}
          >
            X
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            rowGap: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "5px",
            }}
          >
            <label
              style={{
                borderWidth: "0.5px 0 0 0",
                borderStyle: "solid",
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
            <label>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  rowGap: "2px",
                  gap: "2px 5px",
                  borderWidth: "0.5px 0 0 0",
                  borderStyle: "solid",
                  padding: "5px 0",
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
                      tempTo.trim() !== "" &&
                        setTo((prev) => [...prev, tempTo]);
                      setTempTo("");
                    }
                  }}
                  style={{ borderWidth: 0 }}
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
              date:
              <input
                type="datetime-local"
                name="date"
                min={new Date()
                  .toLocaleString("sv-SE", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                  .replace(" ", "T")}
                value={new Date(date)
                  .toLocaleString("sv-SE", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                  .replace(" ", "T")}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
          </div>

          <textarea
            value={content}
            placeholder="content"
            onChange={(e) => setContent(e.target.value)}
            style={{ height: "80%" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button>attach</button>
            <button onClick={reScheduledMail}>submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
