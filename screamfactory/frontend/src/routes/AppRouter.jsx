import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Monsters from "../pages/Monsters";
import MonsterDetail from "../pages/MonsterDetail";
import Missions from "../pages/Missions";
import NotFound from "../pages/NotFound";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/monsters" element={<Monsters />} />
      <Route path="/monsters/:id" element={<MonsterDetail />} />
      <Route path="/missions" element={<Missions />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;