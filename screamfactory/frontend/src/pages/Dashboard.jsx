import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getMonsters } from "../services/monsterService";
import { getMissions } from "../services/missionService";

function Dashboard() {
  const { user, token } = useContext(AuthContext);

  const [monsters, setMonsters] = useState([]);
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [monstersData, missionsData] = await Promise.all([
          getMonsters(token),
          getMissions(token),
        ]);

        setMonsters(monstersData.monsters || []);
        setMissions(missionsData.missions || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboardData();
    }
  }, [token]);

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

  const inProgressMissions = missions.filter(
    (mission) => mission.status === "En progreso"
  ).length;

  const topMonster =
    monsters.length > 0
      ? [...monsters].sort((a, b) => b.energy - a.energy)[0]
      : null;

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-hero">
          <p>Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-hero">
          <h1>No se pudo cargar el dashboard</h1>
          <p className="form-error">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <span className="hero-badge">
          {user?.role === "admin"
            ? "Panel administrativo"
            : "Panel de empleado"}
        </span>

        <h1>
          {user?.role === "admin"
            ? "Dashboard ScreamFactory"
            : `Hola, ${user?.name}`}
        </h1>

        <p>
          {user?.role === "admin"
            ? "Supervisá los monstruos, las misiones y la producción energética de la fábrica."
            : "Consultá el estado de tus misiones y tu rendimiento energético."}
        </p>
      </section>

      <section className="stats">
        {user?.role === "admin" && (
          <div className="stat-card">
            <h2>👹</h2>
            <h3>{monsters.length}</h3>
            <p>Monstruos registrados</p>
          </div>
        )}

        <div className="stat-card">
          <h2>📋</h2>
          <h3>{missions.length}</h3>
          <p>
            {user?.role === "admin"
              ? "Misiones totales"
              : "Mis misiones"}
          </p>
        </div>

        <div className="stat-card">
          <h2>⚡</h2>
          <h3>{totalEnergy}</h3>
          <p>Energía esperada</p>
        </div>

        <div className="stat-card">
          <h2>✅</h2>
          <h3>{completedMissions}</h3>
          <p>Completadas</p>
        </div>

        <div className="stat-card">
          <h2>⏳</h2>
          <h3>{pendingMissions}</h3>
          <p>Pendientes</p>
        </div>

        <div className="stat-card">
          <h2>🚪</h2>
          <h3>{inProgressMissions}</h3>
          <p>En progreso</p>
        </div>
      </section>

      {user?.role === "admin" && topMonster && (
        <section className="ranking-card">
          <div>
            <span className="hero-badge">🏆 Ranking energético</span>

            <h2>{topMonster.name}</h2>

            <p>
              Es el monstruo con mayor energía registrada, con{" "}
              <strong>{topMonster.energy}</strong> puntos.
            </p>
          </div>

          <div className="ranking-energy">
            ⚡ {topMonster.energy}
          </div>
        </section>
      )}

      {user?.role === "employee" && user?.monster && (
        <section className="ranking-card">
          <div>
            <span className="hero-badge">👁️ Perfil energético</span>

            <h2>{user.monster.name}</h2>

            <p>
              Tipo: {user.monster.type} · Estado: {user.monster.status}
            </p>
          </div>

          <div className="ranking-energy">
            ⚡ {user.monster.energy}
          </div>
        </section>
      )}
    </div>
  );
}

export default Dashboard;