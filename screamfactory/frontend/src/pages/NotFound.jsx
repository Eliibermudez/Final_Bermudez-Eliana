import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <span className="notfound-code">404</span>

        <h1>¡Puerta equivocada!</h1>

        <p>
          La página que buscás no existe
        </p>

        <div className="notfound-actions">
          <Link to="/" className="btn">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;