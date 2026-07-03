import { useState, useContext } from "react";
import missionsData from "../data/missions.json";
import monsters from "../data/monsters.json";
import { AuthContext } from "../context/AuthContext";

function Missions() {
  const [missions, setMissions] = useState(missionsData);
  const [title, setTitle] = useState("");
  const [monsterId, setMonsterId] = useState("");
  const [energy, setEnergy] = useState("");

  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !monsterId || !energy) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const newMission = {
      id: missions.length + 1,
      title,
      monsterId: Number(monsterId),
      energy: Number(energy),
      status: "Pendiente",
    };

    setMissions([...missions, newMission]);
    setTitle("");
    setMonsterId("");
    setEnergy("");
  };

  const changeStatus = (id) => {
    const updatedMissions = missions.map((mission) =>
      mission.id === id
        ? { ...mission, status: "Completada" }
        : mission
    );

    setMissions(updatedMissions);
  };

  const deleteMission = (id) => {
    setMissions(missions.filter((mission) => mission.id !== id));
  };

  const visibleMissions =
    user?.role === "admin"
      ? missions
      : missions.filter((mission) => mission.monsterId === user?.monsterId);

  return (
    <div className="container">
      <h1>Misiones energéticas</h1>

      {user?.role === "admin" && (
        <div className="admin-form">
          <h2>Agrega una misión</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre de la misión"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select
              value={monsterId}
              onChange={(e) => setMonsterId(e.target.value)}
            >
              <option value="">Seleccionar monstruo</option>
              {monsters.map((monster) => (
                <option key={monster.id} value={monster.id}>
                  {monster.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Energía esperada"
              value={energy}
              onChange={(e) => setEnergy(e.target.value)}
            />

            <button type="submit">Crear misión</button>
          </form>
        </div>
      )}

      <div className="missions-grid">
        {visibleMissions.map((mission) => {
          const monster = monsters.find((m) => m.id === mission.monsterId);

          return (
            <div key={mission.id} className="mission-card">
              <div className="mission-header">
                <h2>{mission.title}</h2>

                <span
                  className={
                    mission.status === "Completada"
                      ? "status-badge completed"
                      : "status-badge pending"
                  }
                >
                  {mission.status}
                </span>
              </div>

              <p>👹 Monstruo asignado: {monster?.name}</p>
              <p>⚡ Energía esperada: {mission.energy}</p>

              <div className="mission-actions">
                {mission.status !== "Completada" && (
                  <button onClick={() => changeStatus(mission.id)}>
                    Marcar como completada
                  </button>
                )}

                {user?.role === "admin" && (
                  <button
                    className="danger"
                    onClick={() => deleteMission(mission.id)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Missions;