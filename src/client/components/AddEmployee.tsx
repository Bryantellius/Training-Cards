import * as React from "react";
import { apiService } from "../utils/apiService";

const AddEmployee: React.FC<IAddEmployeeProps> = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("employee");

  const register = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let body = {
      email,
      password,
      role,
    };
    try {
      let res = await apiService("/auth/register", "POST", body);
      if (res) {
        document.getElementById("successAlert").style.display = "block";
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      alert("An error occured while trying to register your employee.");
      throw err;
    }
  };

  return (
    <main className="container my-3 d-flex flex-column justify-content-center align-items-center">
      <div id="successAlert" className="alert alert-success col-md-6">
        Employee Added!
      </div>
      <form className="form-group col-md-6 p-3">
        <div className="mb-3">
          <label>Clearance:</label>
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
