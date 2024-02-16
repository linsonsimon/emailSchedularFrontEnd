import React, { useEffect, useState } from "react";
import { CANCELLED, COMPLETED, PENDING, FAILED } from "../constants";
import axios from "axios";
import UpdateModal from "./UpdateModal";

const ScheduledEmail = () => {
  const [mails, setMails] = useState([]);
  const [selectedOption, setSelectedOption] = useState(PENDING);
  const [selectedMail, setSelectedMail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const options = [PENDING, CANCELLED, COMPLETED, FAILED];
  const url = {
    PENDING: "getUnsent",
    CANCELLED: "getcancelled",
    COMPLETED: "getCompleted",
    FAILED: "getfailed",
  };
  const dataType = {
    PENDING: "unSentMails",
    CANCELLED: "cancelledMails",
    COMPLETED: "completedMails",
    FAILED: "failedMails",
  };
  useEffect(() => {
    fetchmails();
  }, []);

  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);

  const fetchmails = async () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/mail/${url[selectedOption]}`,
      config
    );

    setMails(data.data[dataType[selectedOption]]);
    console.log(data.data);
  };

  const deletemails = async (mailId) => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };
    const { data } = await axios.patch(
      "http://localhost:5000/api/v1/mail/delete",
      { mailId },
      config
    );

    setMails(data.data.unSentMails);
    console.log(data.data.unSentMails);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <label>
          Pick a option:
          <select
            name="selectedOptions"
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {options.map((o, index) => (
              <option key={index} value={o} selected={index == 0 && "selected"}>
                {o}
              </option>
            ))}
          </select>
        </label>

        <button onClick={fetchmails}>search</button>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Subject</th>
              <th>Status</th>
              <th>del</th>
            </tr>

            {mails &&
              mails.map((mail, index) => (
                <tr key={index}>
                  <td>{mail?.from}</td>
                  <td>{mail?.to[0]}</td>
                  <td>{mail?.subject}</td>
                  <td>{mail?.status}</td>
                  <td>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setSelectedMail(mail);
                      }}
                      disabled={
                        mail?.status === PENDING || mail.status === CANCELLED
                          ? false
                          : true
                      }
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        deletemails(mail._id);
                      }}
                      disabled={mail?.status === PENDING ? false : true}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {!mails && <h4>no mails</h4>}
        {showModal && (
          <UpdateModal setShowModal={setShowModal} mailData={selectedMail} />
        )}
      </div>
    </div>
  );
};

export default ScheduledEmail;
