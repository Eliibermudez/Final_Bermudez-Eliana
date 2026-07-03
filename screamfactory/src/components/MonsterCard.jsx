import { Link } from "react-router-dom";

function MonsterCard({ monster, user, onDelete }) {
  return (
    <div className="card">
      <h2>{monster.name}</h2>

      <p>Tipo: {monster.type}</p>

      <p>
        ⚡ Energía: {monster.energy}
      </p>

      <Link
        className="btn"
        to={`/monsters/${monster.id}`}
      >
        Ver detalle
      </Link>

      {user?.role === "admin" && (
        <button
          onClick={() =>
            onDelete(monster.id)
          }
        >
          Eliminar
        </button>
      )}
    </div>
  );
}

export default MonsterCard;