import { Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRouter from "./components/ProtectedRouter";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Monsters from "./pages/Monsters";
import MonsterDetail from "./pages/MonsterDetail";
import Missions from "./pages/Missions";
import NotFound from "./pages/NotFound";

import "./styles/app.css";

function App() {
  return (
    <>

      <Navbar />

      <main className="main-container">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRouter>
                <Dashboard />
              </ProtectedRouter>
            }
          />

          <Route
            path="/monsters"
            element={
              <ProtectedRouter>
                <Monsters />
              </ProtectedRouter>
            }
          />

          <Route
            path="/monsters/:id"
            element={
              <ProtectedRouter>
                <MonsterDetail />
              </ProtectedRouter>
            }
          />

          <Route
            path="/missions"
            element={
              <ProtectedRouter>
                <Missions />
              </ProtectedRouter>
            }
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;