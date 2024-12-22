import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="nav-wrapper">
      <div className="links-wrapper">
        <Link className="nav-link" to="/register">
          Rejestracja
        </Link>
        <Link className="nav-link" to="/login">
          Logowanie
        </Link>
        <Link className="nav-link" to="/users">
          Lista użytkowników
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
