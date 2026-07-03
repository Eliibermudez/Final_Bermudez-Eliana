import { useParams, Link } from "react-router-dom";
import monsters from "../data/monsters.json";

import sullyImg from "../assets/sully.png";
import mikeImg from "../assets/mike.png";
import boobotImg from "../assets/boobot.png";
import defaultMonsterImg from "../assets/default-monster.png";

function MonsterDetail() {
  const { id } = useParams();

  const monster = monsters.find(
    (monster) => monster.id === Number(id)
  );

  const monsterImages = {
    1: sullyImg,
    2: mikeImg,
    3: boobotImg,
  };

  if (!monster) {
    return <h1>Monstruo no encontrado</h1>;
  }

  return (
    <div className="detail-page">
      <div className="detail-card">
        <img
          src={monsterImages[monster.id] || defaultMonsterImg}
          alt={monster.name}
          className="detail-img"
        />

        <div className="detail-info">
          <span className="detail-badge">{monster.status}</span>

          <h1>{monster.name}</h1>

          <p className="detail-description">
            {monster.description}
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

          <Link to="/monsters" className="btn">
            Volver a monstruos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MonsterDetail;