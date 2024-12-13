import { Route, Routes } from "react-router-dom";

import Homepage from "@/pages/homepage";
import UserDashboard from "@/pages/user-dashboard";
import ExpertDetails from "./pages/expert-details";
import About from "./pages/about";
import Registration from "./pages/registration";
import FetchUserData from "./hooks/FetchUserData";
import AuthCheck from "./hooks/AuthCheck";
import { ExpertDashboard } from "./pages/expert-dashboard";

function App() {
  return (
    <Routes>
      <Route element={<Homepage />} path="/" />
      <Route element={<About />} path="/about" />
      <Route element={<UserDashboard />} path="/dashboard" />
      <Route element={<ExpertDetails />} path="/details/:id" />
      <Route element={<Registration />} path="/register" />
      <Route element={<FetchUserData />} path="/check" />
      <Route element={<ExpertDashboard />} path="/expert-dashboard" />
    </Routes>
  );
}

export default App;
