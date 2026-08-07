import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getMissions, createMission, updateMission, deleteMission as removeMission, } from "../services/missionService";
import { getMonsters } from "../services/monsterService";
import Swal from "sweetalert2";

function Missions() {
  const { user, token } = useContext(AuthContext);

  const [missions, setMissions] = useState([]);
  const [monsters, setMonsters] = useState([]);

  const [title, setTitle] = useState("");
  const [monsterId, setMonsterId] = useState("");
  const [energy, setEnergy] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editMonsterId, setEditMonsterId] = useState("");
  const [editEnergy, setEditEnergy] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const missionsData = await getMissions(token);
        setMissions(missionsData.missions || []);

        if (user?.role === "admin") {
          const monstersData = await getMonsters(token);
          setMonsters(monstersData.monsters || []);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, user?.role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !monsterId || !energy) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (Number(energy) <= 0) {
      setError("La energía debe ser mayor que cero");
      return;
    }

    try {
      setSubmitting(true);

      const data = await createMission(
        {
          title: title.trim(),
          monster: monsterId,
          energy: Number(energy),
          status: "Pendiente",
        },
        token
      );

      setMissions((currentMissions) => [
        data.mission,
        ...currentMissions,
      ]);

      setTitle("");
      setMonsterId("");
      setEnergy("");

      await Swal.fire({
        icon: "success",
        title: "Misión creada",
        text: "La misión fue registrada correctamente.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#22d3ee",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const changeStatus = async (missionId, status) => {
    try {
      setError("");

      const data = await updateMission(
        missionId,
        { status },
        token
      );

      setMissions((currentMissions) =>
        currentMissions.map((mission) =>
          mission._id === missionId ? data.mission : mission
        )
      );
      await Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        text: `La misión ahora está ${status.toLowerCase()}.`,
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#22d3ee",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const startEdit = (mission) => {
    setEditingId(mission._id);
    setEditTitle(mission.title);
    setEditMonsterId(mission.monster?._id || "");
    setEditEnergy(String(mission.energy));
    setEditStatus(mission.status);
    setEditDescription(mission.description || "");
    setError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditMonsterId("");
    setEditEnergy("");
    setEditStatus("");
    setEditDescription("");
  };

  const saveEdit = async (missionId) => {
    if (
      !editTitle.trim() ||
      !editMonsterId ||
      !editEnergy ||
      !editStatus
    ) {
      setError("Todos los campos obligatorios deben estar completos");
      return;
    }

    if (Number(editEnergy) <= 0) {
      setError("La energía debe ser mayor que cero");
      return;
    }

    try {
      setError("");

      const data = await updateMission(
        missionId,
        {
          title: editTitle.trim(),
          monster: editMonsterId,
          energy: Number(editEnergy),
          status: editStatus,
          description: editDescription.trim(),
        },
        token
      );

      setMissions((currentMissions) =>
        currentMissions.map((mission) =>
          mission._id === missionId ? data.mission : mission
        )
      );

      cancelEdit();

      await Swal.fire({
        icon: "success",
        title: "Misión actualizada",
        text: "Los cambios se guardaron correctamente.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#22d3ee",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteMission = async (missionId) => {
    const result = await Swal.fire({
      title: "¿Eliminar misión?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#0f172a",
      color: "#f8fafc",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
    });

    if (!result.isConfirmed) return;

    try {
      setError("");

      await removeMission(missionId, token);

      setMissions((currentMissions) =>
        currentMissions.filter(
          (mission) => mission._id !== missionId
        )
      );

      await Swal.fire({
        icon: "success",
        title: "Eliminada",
        text: "La misión fue eliminada correctamente.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#22d3ee",
      });
    } catch (error) {
      setError(error.message);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#22d3ee",
      });
    }
  };

  const filteredMissions =
    user?.role === "employee"
      ? missions.filter((mission) => {
        const titleText = mission.title?.toLowerCase() || "";
        const normalizedSearch = search.toLowerCase().trim();

        return titleText.includes(normalizedSearch);
      })
      : missions;

  if (loading) {
    return (
      <div className="container">
        <p>Cargando misiones...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>
        {user?.role === "admin"
          ? "Misiones energéticas"
          : "Mis misiones"}
      </h1>

      {error && <p className="form-error">{error}</p>}

      {user?.role === "admin" && (
        <div className="admin-form">
          <h2>Crear misión</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre de la misión"
              value={title}
              disabled={submitting}
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
              }}
            />

            <select
              value={monsterId}
              disabled={submitting}
              onChange={(e) => {
                setMonsterId(e.target.value);
                setError("");
              }}
            >
              <option value="">Seleccionar monstruo</option>

              {monsters.map((monster) => (
                <option key={monster._id} value={monster._id}>
                  {monster.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              placeholder="Energía esperada"
              value={energy}
              disabled={submitting}
              onChange={(e) => {
                setEnergy(e.target.value);
                setError("");
              }}
            />

            <button type="submit" disabled={submitting}>
              {submitting ? "Creando..." : "Crear misión"}
            </button>
          </form>
        </div>
      )}

      {user?.role === "employee" && (
        <div className="monster-search">
          <input
            type="text"
            placeholder="Buscar por misión..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            type="button"
            className="btn-secondary"
            disabled={!search}
            onClick={() => setSearch("")}
          >
            Limpiar
          </button>
        </div>
      )}

      {filteredMissions.length === 0 ? (
        <div className="mission-card empty-state">
          <h2>
            {missions.length === 0
              ? "Sin misiones"
              : "Sin resultados"}
          </h2>

          <p>
            {missions.length === 0
              ? user?.role === "admin"
                ? "Todavía no hay misiones registradas."
                : "No tenés misiones asignadas por el momento."
              : "No se encontraron misiones con ese nombre."}
          </p>
        </div>
      ) : (
        <div className="missions-grid">
          {filteredMissions.map((mission) => (
            <div key={mission._id} className="mission-card">
              {editingId === mission._id ? (
                <div className="mission-edit-form">
                  <input
                    type="text"
                    placeholder="Nombre de la misión"
                    value={editTitle}
                    onChange={(e) => {
                      setEditTitle(e.target.value);
                      setError("");
                    }}
                  />

                  <select
                    value={editMonsterId}
                    onChange={(e) => {
                      setEditMonsterId(e.target.value);
                      setError("");
                    }}
                  >
                    <option value="">Seleccionar monstruo</option>

                    {monsters.map((monster) => (
                      <option
                        key={monster._id}
                        value={monster._id}
                      >
                        {monster.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min="1"
                    placeholder="Energía esperada"
                    value={editEnergy}
                    onChange={(e) => {
                      setEditEnergy(e.target.value);
                      setError("");
                    }}
                  />

                  <select
                    value={editStatus}
                    onChange={(e) => {
                      setEditStatus(e.target.value);
                      setError("");
                    }}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Completada">Completada</option>
                  </select>

                  <textarea
                    placeholder="Descripción"
                    value={editDescription}
                    onChange={(e) => {
                      setEditDescription(e.target.value);
                      setError("");
                    }}
                  />

                  <div className="mission-actions">
                    <button
                      type="button"
                      onClick={() => saveEdit(mission._id)}
                    >
                      Guardar
                    </button>

                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={cancelEdit}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mission-header">
                    <h2>{mission.title}</h2>

                    <span
                      className={`status-badge ${mission.status === "Completada"
                        ? "completed"
                        : "pending"
                        }`}
                    >
                      {mission.status}
                    </span>
                  </div>

                  <p>
                    👹 Monstruo asignado:{" "}
                    {mission.monster?.name || "Sin asignar"}
                  </p>

                  <p>⚡ Energía esperada: {mission.energy}</p>

                  {mission.description && (
                    <p>{mission.description}</p>
                  )}

                  <div className="mission-actions">
                    {mission.status !== "Completada" && (
                      <button
                        type="button"
                        onClick={() =>
                          changeStatus(
                            mission._id,
                            "Completada"
                          )
                        }
                      >
                        Marcar como completada
                      </button>
                    )}

                    {user?.role === "admin" && (
                      <>
                        <button
                          type="button"
                          onClick={() => startEdit(mission)}
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          className="danger"
                          onClick={() =>
                            handleDeleteMission(mission._id)
                          }
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Missions;