import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardOverview from "./pages/DashboardOverview";

import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
