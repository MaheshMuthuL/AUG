import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignUp from "./components/signup";
import SignIn from "./components/signin";
import Dashboard from "./components/dashboard";
import Layout from "./components/Layout";
import LandingPage from "./components/Landing";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<LandingPage/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
