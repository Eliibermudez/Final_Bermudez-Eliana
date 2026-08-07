import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getMonsterById } from "../services/monsterService";
import sullyImg from "../assets/sully.png";
import mikeImg from "../assets/mike.png";
import boobotImg from "../assets/boobot.png";
import defaultMonsterImg from "../assets/default-monster.png";

function MonsterDetail() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [monster, setMonster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getMonsterImage = (monsterData) => {
    if (!monsterData?.name) {
      return defaultMonsterImg;
    }

    const normalizedName = monsterData.name.toLowerCase();

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
    const fetchMonster = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMonsterById(id, token);

        setMonster(data.monster);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token && id) {
      fetchMonster();
    }
  }, [id, token]);

  if (loading) {
    return (
      <div className="detail-page">
        <div className="detail-card">
          <p>Cargando monstruo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-page">
        <div className="detail-card">
          <div className="detail-info">
            <h1>No se pudo cargar el monstruo</h1>

            <p className="form-error">{error}</p>

            <Link to="/monsters" className="btn">
              Volver a monstruos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!monster) {
    return (
      <div className="detail-page">
        <div className="detail-card">
          <div className="detail-info">
            <h1>Monstruo no encontrado</h1>

            <Link to="/monsters" className="btn">
              Volver a monstruos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-card">
        <img
          src={getMonsterImage(monster)}
          alt={monster.name}
          className="detail-img"
        />

        <div className="detail-info">
          <span className="detail-badge">
            {monster.status}
          </span>

          <h1>{monster.name}</h1>

          <p className="detail-description">
            {monster.description ||
              "Monstruo registrado en ScreamFactory."}
          </p>

          <div className="detail-stats">
            <div>
              <strong>Tipo</strong>
              <p>{monster.type}</p>
            </div>

            <div>
              <strong>Energía</strong>
              <p>⚡ {monster.energy}</p>
            </div>
          </div>

          <Link to="/monsters" className="btn btn-detail-back">
            Volver a monstruos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MonsterDetail;