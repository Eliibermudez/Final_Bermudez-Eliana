import logo from "../assets/logo_screamfactory_header.png";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="ScreamFactory" className="header-logo" />
    </header>
  );
}

export default Header;