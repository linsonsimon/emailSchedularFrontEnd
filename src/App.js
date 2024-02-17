import axios from "axios";
import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";

function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  return (
    <div>
      <HomePage />
    </div>
  );
}

export default App;
