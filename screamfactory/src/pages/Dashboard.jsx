import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import monsters from "../data/monsters.json";
import missions from "../data/missions.json";

function Dashboard() {
  const { user } = useContext(AuthContext);

  const totalEnergy = missions.reduce(
    (total, mission) => total + mission.energy,
    0
  );

  const completedMissions = missions.filter(
    (mission) => mission.status === "Completada"
  ).length;

  const pendingMissions = missions.filter(
    (mission) => mission.status === "Pendiente"
  ).length;

  const topMonster = [...monsters].sort(
    (a, b) => b.energy - a.energy
  )[0];

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <span className="hero-badge">Panel de control</span>

        <h1>Dashboard ScreamFactory</h1>

        <p>
          Bienvenido, {user?.name}. Desde acá podés visualizar el estado general
          de la fábrica.
        </p>
      </section>

      <section className="stats">
        <div className="stat-card">
          <h2>👹</h2>
          <h3>{monsters.length}</h3>
          <p>Monstruos registrados</p>
        </div>

        <div className="stat-card">
          <h2>📋</h2>
          <h3>{missions.length}</h3>
          <p>Misiones totales</p>
        </div>

        <div className="stat-card">
          <h2>⚡</h2>
          <h3>{totalEnergy}</h3>
          <p>Energía esperada</p>
        </div>

        <div className="stat-card">
          <h2>✅</h2>
          <h3>{completedMissions}</h3>
          <p>Misiones completadas</p>
        </div>

        <div className="stat-card">
          <h2>⏳</h2>
          <h3>{pendingMissions}</h3>
          <p>Misiones pendientes</p>
        </div>
      </section>

      <section className="ranking-card">
        <div>
          <span className="hero-badge">🏆 Ranking energético</span>
          <h2>{topMonster.name}</h2>
          <p>
            Es el monstruo con mayor energía registrada actualmente, con{" "}
            <strong>{topMonster.energy}</strong> puntos.
          </p>
        </div>

        <div className="ranking-energy">
          ⚡ {topMonster.energy}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;