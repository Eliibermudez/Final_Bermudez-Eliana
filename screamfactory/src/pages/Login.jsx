import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const loggedUser = login(username, password);

    if (loggedUser) {
      if (loggedUser.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/missions");
      }
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Iniciar sesión</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />

          {error && <p>{error}</p>}

          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;