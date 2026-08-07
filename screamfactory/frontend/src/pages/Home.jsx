import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { user, isAuthenticated } = useContext(AuthContext);

  const isAdmin = user?.role === "admin";
  const isEmployee = user?.role === "employee";

  return (
    <div className="home-page">
      <section className="hero">
        <span className="hero-badge">
          {!isAuthenticated
            ? "Sistema de gestión energética"
            : isAdmin
            ? "Panel administrativo"
            : "Panel de empleado"}
        </span>

        <h1>
          {!isAuthenticated
            ? "👹 Bienvenido a ScreamFactory"
            : isAdmin
            ? "👹 Centro de Control de la Fábrica"
            : `👋 Bienvenido, ${user?.name}`}
        </h1>

        <p>
          {!isAuthenticated
            ? "Iniciá sesión para acceder a la gestión de monstruos, misiones y producción energética."
            : isAdmin
            ? "Gestioná monstruos, asigná misiones y supervisá la producción de energía de la fábrica."
            : "Consultá tus misiones, seguí tu rendimiento y ayudá a mantener la energía de la fábrica."}
        </p>

        <div className="hero-actions">
          {!isAuthenticated && (
            <Link to="/login" className="btn">
              Iniciar sesión
            </Link>
          )}

          {isAdmin && (
            <>
              <Link to="/dashboard" className="btn">
                Ir al Dashboard
              </Link>

              <Link to="/missions" className="btn btn-secondary">
                Gestionar misiones
              </Link>
            </>
          )}

          {isEmployee && (
            <>
              <Link to="/missions" className="btn">
                Ver mis misiones
              </Link>

              <Link to="/dashboard" className="btn btn-secondary">
                Ver mi rendimiento
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="home-cards">
        {!isAuthenticated && (
          <>
            <article className="mini-card">
              <h3>👹 Monstruos</h3>
              <p>
                Consultá los empleados registrados y sus niveles de energía.
              </p>
            </article>

            <article className="mini-card">
              <h3>🚪 Misiones</h3>
              <p>
                Organizá las tareas energéticas asignadas dentro de la fábrica.
              </p>
            </article>

            <article className="mini-card">
              <h3>📊 Dashboard</h3>
              <p>
                Visualizá métricas, estados y rendimiento energético.
              </p>
            </article>
          </>
        )}

        {isAdmin && (
          <>
            <article className="mini-card">
              <h3>👹 Gestión de monstruos</h3>
              <p>
                Agregá, editá, eliminá y consultá los empleados de la fábrica.
              </p>

              <Link to="/monsters" className="btn btn-detail">
                Administrar
              </Link>
            </article>

            <article className="mini-card">
              <h3>🚪 Gestión de misiones</h3>
              <p>
                Creá tareas, asigná responsables y actualizá sus estados.
              </p>

              <Link to="/missions" className="btn btn-detail">
                Administrar
              </Link>
            </article>

            <article className="mini-card">
              <h3>📊 Supervisión</h3>
              <p>
                Consultá estadísticas y el ranking energético general.
              </p>

              <Link to="/dashboard" className="btn btn-detail">
                Ver métricas
              </Link>
            </article>
          </>
        )}

        {isEmployee && (
          <>
            <article className="mini-card">
              <h3>🚪 Mis misiones</h3>
              <p>
                Consultá las tareas asignadas y actualizá su estado.
              </p>

              <Link to="/missions" className="btn btn-detail">
                Consultar
              </Link>
            </article>

            <article className="mini-card">
              <h3>⚡ Mi energía</h3>
              <p>
                Revisá tus métricas y tu rendimiento dentro de la fábrica.
              </p>

              <Link to="/dashboard" className="btn btn-detail">
                Ver rendimiento
              </Link>
            </article>

            <article className="mini-card">
              <h3>👹 Equipo</h3>
              <p>
                Consultá los monstruos empleados y sus especialidades.
              </p>

              <Link to="/monsters" className="btn btn-detail">
                Ver monstruos
              </Link>
            </article>
          </>
        )}
      </section>
    </div>
  );
}

export default Home;