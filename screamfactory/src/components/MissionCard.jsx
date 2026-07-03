function MissionCard({
  mission,
  monster,
  user,
  onComplete,
  onDelete,
}) {
  return (
    <div className="card">
      <h2>{mission.title}</h2>

      <p>
        Monstruo asignado:
        {" "}
        {monster?.name}
      </p>

      <p>
        ⚡ Energía:
        {" "}
        {mission.energy}
      </p>

      <p>
        Estado:
        {" "}
        {mission.status}
      </p>

      {mission.status !==
        "Completada" && (
          <button
            onClick={() =>
              onComplete(mission.id)
            }
          >
            Completar
          </button>
        )}

      {user?.role === "admin" && (
        <button
          onClick={() =>
            onDelete(mission.id)
          }
        >
          Eliminar
        </button>
      )}
    </div>
  );
}

export default MissionCard;