import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo_screamfactory_header.png";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <img src={logo} alt="ScreamFactory" className="nav-logo" />
      </Link>

      <div className="nav-menu">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/monsters">Monstruos</NavLink>
        <NavLink to="/missions">Misiones</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </div>

      <div className="nav-user">
        {!user ? (
          <NavLink to="/login">Login</NavLink>
        ) : (
          <>
            <span>Hola, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;