import axios from "axios";
import React, { useState } from "react";
import PropTypes from "prop-types";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signin",
        credentials
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({ email, password });
    if (token?.accessToken) {
      setToken(token.accessToken);
      axios.interceptors.request.use((config) => {
        config.headers["x-access-token"] = token.accessToken;
        return config;
      });
      alert(token.accessToken);
    } else {
      alert("Password Failed!");
    }
  };

  return (
    <>
      <h1>Please Log In!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
