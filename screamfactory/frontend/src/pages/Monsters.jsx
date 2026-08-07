import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import sullyImg from "../assets/sully.png";
import mikeImg from "../assets/mike.png";
import boobotImg from "../assets/boobot.png";
import defaultMonsterImg from "../assets/default-monster.png";
import Swal from "sweetalert2";
import {getMonsters,createMonster,updateMonster,deleteMonster as removeMonster,} from "../services/monsterService";

function Monsters() {
  const { user, token } = useContext(AuthContext);

  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const [search, setSearch] = useState("");

  const monsterTypes = [
    "Asustador",
    "Recolector",
    "Asistente",
    "Supervisor",
  ];

  const getMonsterImage = (monster) => {
    const normalizedName = monster.name?.toLowerCase() || "";

    if (
      normalizedName.includes("sullivan") ||
      normalizedName.includes("sully")
    ) {
      return sullyImg;
    }

    if (normalizedName.includes("mike")) {
      return mikeImg;
    }

    if (normalizedName.includes("randall")) {
      return boobotImg;
    }

    return defaultMonsterImg;
  };

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMonsters(token);
        setMonsters(data.monsters || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchMonsters();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !type) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      setSubmitting(true);

      const data = await createMonster(
        {
          name: name.trim(),
          type,
          energy: 0,
          status: "Activo",
          description: "Nuevo monstruo registrado.",
          image: "",
        },
        token
      );

      setMonsters((currentMonsters) => [
        data.monster,
        ...currentMonsters,
      ]);

      setName("");
      setType("");

      await Swal.fire({
        icon: "success",
        title: "Monstruo creado",
        text: `${data.monster.name} fue registrado correctamente.`,
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

  const startEdit = (monster) => {
    setEditingId(monster._id);
    setEditName(monster.name);
    setEditType(monster.type);
    setEditStatus(monster.status);
    setError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditType("");
    setEditStatus("");
  };

  const saveEdit = async (monsterId) => {
    if (!editName.trim() || !editType || !editStatus) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      setError("");

      const data = await updateMonster(
        monsterId,
        {
          name: editName.trim(),
          type: editType,
          status: editStatus,
        },
        token
      );

      setMonsters((currentMonsters) =>
        currentMonsters.map((monster) =>
          monster._id === monsterId ? data.monster : monster
        )
      );

      cancelEdit();

      await Swal.fire({
        icon: "success",
        title: "Monstruo actualizado",
        text: "Los cambios se guardaron correctamente.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#22d3ee",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteMonster = async (monsterId) => {
    const result = await Swal.fire({
      title: "¿Eliminar monstruo?",
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

    if (!result.isConfirmed) {
      return;
    }

    try {
      setError("");

      await removeMonster(monsterId, token);

      setMonsters((currentMonsters) =>
        currentMonsters.filter(
          (monster) => monster._id !== monsterId
        )
      );

      await Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "El monstruo fue eliminado correctamente.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#22d3ee",
      });
    } catch (error) {
      setError(error.message);

      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#22d3ee",
      });
    }
  };

  const filteredMonsters =
    user?.role === "employee"
      ? monsters.filter((monster) =>
          monster.name
            .toLowerCase()
            .includes(search.toLowerCase().trim())
        )
      : monsters;

  if (loading) {
    return (
      <div className="container">
        <p>Cargando monstruos...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Monstruos empleados</h1>

      {error && <p className="form-error">{error}</p>}

      {user?.role === "admin" && (
        <div className="admin-form">
          <h2>Agregar monstruo</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              disabled={submitting}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />

            <select
              value={type}
              disabled={submitting}
              onChange={(e) => {
                setType(e.target.value);
                setError("");
              }}
            >
              <option value="">Seleccionar tipo</option>

              {monsterTypes.map((monsterType) => (
                <option
                  key={monsterType}
                  value={monsterType}
                >
                  {monsterType}
                </option>
              ))}
            </select>

            <button type="submit" disabled={submitting}>
              {submitting ? "Agregando..." : "Agregar"}
            </button>
          </form>
        </div>
      )}

      {user?.role === "employee" && (
        <div className="monster-search">
          <input
            type="text"
            placeholder="Buscar monstruo por nombre..."
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

      {filteredMonsters.length === 0 ? (
        <div className="monster-card empty-state">
          <h2>
            {monsters.length === 0
              ? "Sin monstruos"
              : "Sin resultados"}
          </h2>

          <p>
            {monsters.length === 0
              ? "Todavía no hay monstruos registrados."
              : "No se encontraron monstruos con ese nombre."}
          </p>
        </div>
      ) : (
        <div className="monsters-grid">
          {filteredMonsters.map((monster) => (
            <div
              key={monster._id}
              className="monster-card"
            >
              <img
                src={getMonsterImage(monster)}
                alt={monster.name}
                className="monster-img"
              />

              {editingId === monster._id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => {
                      setEditName(e.target.value);
                      setError("");
                    }}
                  />

                  <select
                    value={editType}
                    onChange={(e) => {
                      setEditType(e.target.value);
                      setError("");
                    }}
                  >
                    <option value="">
                      Seleccionar tipo
                    </option>

                    {monsterTypes.map((monsterType) => (
                      <option
                        key={monsterType}
                        value={monsterType}
                      >
                        {monsterType}
                      </option>
                    ))}
                  </select>

                  <select
                    value={editStatus}
                    onChange={(e) => {
                      setEditStatus(e.target.value);
                      setError("");
                    }}
                  >
                    <option value="Activo">
                      Activo
                    </option>

                    <option value="En entrenamiento">
                      En entrenamiento
                    </option>

                    <option value="Inactivo">
                      Inactivo
                    </option>
                  </select>

                  <div className="card-actions">
                    <button
                      type="button"
                      onClick={() =>
                        saveEdit(monster._id)
                      }
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
                </>
              ) : (
                <>
                  <h2>{monster.name}</h2>

                  <p>Tipo: {monster.type}</p>

                  <p>
                    ⚡ Energía: {monster.energy}
                  </p>

                  <p>
                    Estado: {monster.status}
                  </p>

                  <div className="card-actions">
                    <Link
                      className="btn btn-detail"
                      to={`/monsters/${monster._id}`}
                    >
                      Ver detalle
                    </Link>

                    {user?.role === "admin" && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            startEdit(monster)
                          }
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          className="danger"
                          onClick={() =>
                            handleDeleteMonster(
                              monster._id
                            )
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

export default Monsters;