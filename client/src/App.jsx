import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewEntry from "./components/NewEntry";
import Login from "./components/Login";
import axios from "axios";

function App() {
  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />;
  } else {
    localStorage.setItem("x-access-token", token);
    axios.interceptors.request.use((config) => {
      config.headers["x-access-token"] = token.accessToken;
      return config;
    });
  }

  return (
    <>
      <h1>Applications</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewEntry />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
