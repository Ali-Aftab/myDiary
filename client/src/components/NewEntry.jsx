import axios from "axios";
import React, { useState } from "react";

export default function NewEntry() {
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      alert("Please write an entry!");
    } else {
      try {
        console.log("Sending message:", message); // Debug line
        console.log(
          "Token in storage:",
          localStorage.getItem("x-access-token")
        );
        await axios.post("http://localhost:8000/api/entry/newEntry", {
          message,
        });
        alert("Message was successful!");
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <h1>Write Diary Entry Below!</h1>
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind today?"
        />
      </label>
      <label>
        <button type="submit">Submit New Entry!</button>
      </label>
    </form>
  );
}
