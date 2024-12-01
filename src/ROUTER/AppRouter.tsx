import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import Login from "../pages/login/Login";
import LayOut from "../layout/LayOut";
import Cookies from "js-cookie";

const AppRouter: React.FC = () => {
  const isAuthenticated = Boolean(Cookies.get("token")); // Check token existence
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<LayOut />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
