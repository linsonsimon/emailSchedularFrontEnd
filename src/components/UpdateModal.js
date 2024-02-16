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
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };
    console.log(from, to, subject, content);
    const { data } = await axios.patch(
      "http://localhost:5000/api/v1/mail/reSchedule",
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
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "red",
        alignItems: "center",
      }}
    >
      <button onClick={() => setShowModal(false)}>close</button>
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
                  e.preventDefault();
                  setTo(to.filter((x) => x !== email));
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
            min={new Date()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <button onClick={reScheduledMail}>submit</button>
      </div>
    </div>
  );
};

export default UpdateModal;
