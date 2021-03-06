import * as React from "react";
import { apiService } from "../utils/apiService";

const AddEmployee: React.FC<IAddEmployeeProps> = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("employee");
  const [firstname, setFirstname] = React.useState<string>("");
  const [lastname, setLastname] = React.useState<string>("");

  const register = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let alertDiv = document.getElementById("employeeAlert");
    if (
      email === "" ||
      password === "" ||
      role === "" ||
      firstname === "" ||
      lastname === ""
    ) {
      alertDiv.classList.remove("alert-success");
      alertDiv.classList.add("alert-danger");
      alertDiv.innerHTML = "All input fields must have values.";
      alertDiv.style.display = "block";
      return;
    }
    let body = {
      firstname,
      lastname,
      email,
      password,
      role,
    };
    try {
      let res = await apiService("/auth/register", "POST", body);
      if (res) {
        alertDiv.classList.remove("alert-danger");
        alertDiv.classList.add("alert-success");
        alertDiv.innerHTML = "Employee Added!";
        alertDiv.style.display = "block";
      }
    } catch (err) {
      alert("An error occured while trying to register your employee.");
      throw err;
    }
  };

  return (
    <main className="container my-3 d-flex flex-column justify-content-center align-items-center">
      <div id="employeeAlert" className="alert alert-success col-md-12"></div>
      <form className="form-group col-md-10 p-3">
        <div className="mb-3">
          <label>Level:</label>
          <select
            id="employeeSelect"
            className="form-control"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setRole(e.target.value)
            }
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Name:</label>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Employee Firstname"
            value={firstname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFirstname(e.target.value)
            }
          />
          <input
            type="text"
            className="form-control"
            placeholder="Employee Lastname"
            value={lastname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLastname(e.target.value)
            }
          />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Employee Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Employee Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        <button
          className="btn btn-info w-50 mx-auto d-block my-3"
          onClick={register}
        >
          Add
        </button>
      </form>
    </main>
  );
};

export interface IAddEmployeeProps {}

export default AddEmployee;
