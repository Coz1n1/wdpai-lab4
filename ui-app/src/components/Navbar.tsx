import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaUserPlus } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { FaUsers } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="nav-wrapper">
      <div className="links-wrapper">
        <Link className="nav-link" to="/register">
          Rejestracja
          <FaUserPlus className="nav-icon" size={18} />
        </Link>
        <Link className="nav-link" to="/login">
          Logowanie
          <IoMdLogIn className="nav-icon" size={18} />
        </Link>
        <Link className="nav-link" to="/users">
          Lista użytkowników
          <FaUsers className="nav-icon" size={18} />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
