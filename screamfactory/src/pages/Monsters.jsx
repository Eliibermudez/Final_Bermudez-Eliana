import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import monstersData from "../data/monsters.json";
import { AuthContext } from "../context/AuthContext";

import sullyImg from "../assets/sully.png";
import mikeImg from "../assets/mike.png";
import boobotImg from "../assets/boobot.png";
import defaultMonsterImg from "../assets/default-monster.png";

function Monsters() {
  const [monsters, setMonsters] = useState(monstersData);
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const { user } = useContext(AuthContext);

  const monsterImages = {
    1: sullyImg,
    2: mikeImg,
    3: boobotImg,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !type) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const newMonster = {
      id: monsters.length + 1,
      name,
      type,
      energy: 0,
      status: "Activo",
      description: "Nuevo monstruo registrado.",
    };

    setMonsters([...monsters, newMonster]);
    setName("");
    setType("");
  };

  const deleteMonster = (id) => {
    setMonsters(monsters.filter((monster) => monster.id !== id));
  };

  const startEdit = (monster) => {
    setEditingId(monster.id);
    setEditName(monster.name);
    setEditType(monster.type);
  };

  const saveEdit = (id) => {
    if (!editName || !editType) {
      alert("Todos los campos son obligatorios");
      return;
    }

    setMonsters(
      monsters.map((monster) =>
        monster.id === id
          ? { ...monster, name: editName, type: editType, status: editStatus }
          : monster
      )
    );

    setEditingId(null);
    setEditName("");
    setEditType("");
  };

  return (
    <div className="container">
      <h1>Monstruos empleados</h1>

      {user?.role === "admin" && (
        <div className="admin-form">
          <h2>Agregar monstruo</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Tipo"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />

            <button type="submit">Agregar</button>
          </form>
        </div>
      )}

      <div className="monsters-grid">
        {monsters.map((monster) => (
          <div key={monster.id} className="monster-card">
            <img
              src={monsterImages[monster.id] || defaultMonsterImg}
              alt={monster.name}
              className="monster-img"
            />

            {editingId === monster.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />

                <input
                  type="text"
                  value={editType}
                  onChange={(e) => setEditType(e.target.value)}
                />

                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option value="Activo">Activo</option>
                  <option value="En entrenamiento">En entrenamiento</option>
                  <option value="Inactivo">Inactivo</option>
                </select>

                <div className="card-actions">
                  <button onClick={() => saveEdit(monster.id)}>
                    Guardar
                  </button>

                  <button onClick={() => setEditingId(null)}>
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>{monster.name}</h2>
                <p>Tipo: {monster.type}</p>
                <p>⚡ Energía: {monster.energy}</p>
                <p>Estado: {monster.status}</p>

                <div className="card-actions">
                  <Link
                    className="btn btn-detail"
                    to={`/monsters/${monster.id}`}
                  >
                    Ver detalle
                  </Link>

                  {user?.role === "admin" && (
                    <>
                      <button onClick={() => startEdit(monster)}>
                        Editar
                      </button>

                      <button
                        className="danger"
                        onClick={() => deleteMonster(monster.id)}
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
    </div>
  );
}

export default Monsters;