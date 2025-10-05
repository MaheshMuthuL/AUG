import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import viteLogo from "/vite.svg";
import "./App.css";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import DigiGold from "./pages/DigiGold";
import Token from "./pages/Token";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/digi" element={<DigiGold/>} />
          <Route path="/token" element={<Token/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
