import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-page">
      <section className="hero">
        <span className="hero-badge">⚡ Sistema interno de energía</span>

        <h1>
          {user?.role === "admin"
            ? "Centro de Control de la Fábrica"
            : `Bienvenido, ${user?.name || "Visitante"}`}
        </h1>

        <p>
          {!user
            ? "Iniciá sesión para acceder a las misiones y administrar la fábrica."
            : user.role === "admin"
              ? "Gestioná monstruos, asigná misiones y supervisá la producción de energía de la fábrica."
              : "Consultá tus misiones, seguí tu rendimiento y ayudá a mantener la energía de la fábrica."}
        </p>

        <div className="hero-actions">
          <Link to="/dashboard" className="btn">
            Ir al Dashboard
          </Link>

          <Link to="/missions" className="btn btn-secondary">
            Ver misiones
          </Link>
        </div>
      </section>

      <section className="home-cards">
        <div className="mini-card">
          <h3>👹 Monstruos</h3>
          <p>Consultá empleados, tipos y niveles de energía.</p>
        </div>

        <div className="mini-card">
          <h3>🚪 Misiones</h3>
          <p>Visualizá misiones, estados y energía esperada.</p>
        </div>

        <div className="mini-card">
          <h3>📊 Dashboard</h3>
          <p>Revisá métricas, ranking y rendimiento general.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;