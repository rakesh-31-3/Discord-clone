import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegisterForm from "./components/landing/RegisterForm";
import LoginForm from "./components/landing/LoginForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route index path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
