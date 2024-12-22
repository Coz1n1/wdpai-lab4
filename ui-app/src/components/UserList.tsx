import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

interface user {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
}

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    role: "",
  });
  const [errResponse, setErrResponse] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      setErrResponse(false);
    } catch (error) {
      console.error("Error getting users:", error);
      setErrResponse(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/",
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      getUsers();
      setNewUser({
        first_name: "",
        last_name: "",
        role: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/users/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`User ${id} deleted`);
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="wrapper">
      {errResponse ? (
        <div>
          <h1>Nie masz odpowiednich uprawnień</h1>
          <button className="err-btn">
            {" "}
            <Link className="nav-link-err" to="/login">
              Logowanie
              <FaArrowRight className="nav-icon-err" size={18} />
            </Link>
          </button>
        </div>
      ) : (
        <>
          {" "}
          <form className="main-form" id="userForm" onSubmit={handleAddUser}>
            <h1 className="main-form-header">
              Let's level up your brand, together
            </h1>
            <div className="inputs-wrapper">
              <div className="input-wrapper">
                <label htmlFor="firstName" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="firstName"
                  placeholder="First name"
                  className="form-input"
                  value={newUser.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="lastName" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="lastName"
                  placeholder="Last name"
                  className="form-input"
                  value={newUser.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  placeholder="Role"
                  className="form-input"
                  value={newUser.role}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="agreement-wrapper">
              <input type="checkbox" required />
              <p className="agreement-text">
                You agree to our friendly{" "}
                <span className="agreement-text-underlined">
                  privacy policy
                </span>
              </p>
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
          <h1 className="main-header">Users List</h1>
          <div className="users-wrapper">
            {users.map((item: user, i) => {
              return (
                <div className="user-wrapper" key={i}>
                  <div className="user-wrapper-infos">
                    <div className="user-wrapper-infos-name">
                      {item.first_name} {item.last_name}
                    </div>
                    <div className="user-wrapper-infos-role">{item.role}</div>
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => deleteUser(item.id)}
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
