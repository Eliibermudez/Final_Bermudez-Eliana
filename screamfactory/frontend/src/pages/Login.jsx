import {useContext,useEffect,useState,} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    login,
    isAuthenticated,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);

      await login(
        username.trim(),
        password
      );

      navigate("/", { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
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
            disabled={loading}
            autoComplete="username"
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            disabled={loading}
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Ingresando..."
              : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;