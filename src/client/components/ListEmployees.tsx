import * as React from "react";
import { apiService } from "../utils/apiService";
import { IEmployee } from "../utils/Types";
import e from "express";

const ListEmployees: React.FC<IListEmployeesProps> = () => {
  const [employees, setEmployees] = React.useState<IEmployee[]>([]);
  const [showing, setShowing] = React.useState<boolean>(false);
  const [editID, setEditID] = React.useState<number>(0);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("employee");
  const [firstname, setFirstname] = React.useState<string>("");
  const [lastname, setLastname] = React.useState<string>("");

  const displayEmployees = async () => {
    let users = await apiService("/api/users");
    setEmployees(users);
  };

  const remove = async (id: Number) => {
    let res = await apiService(`/api/users/${id}`, "DELETE");
    displayEmployees();
  };

  const focusModal = (employee?: IEmployee) => {
    setFirstname(employee?.firstname);
    setLastname(employee?.lastname);
    setRole(employee?.role);
    setEditID(Number(employee?.id));
    let modal = document.getElementById("employeeModal");
    if (showing) {
      modal.style.display = "none";
      setShowing(false);
    } else {
      modal.style.display = "block";
      setShowing(true);
    }
  };

  const update = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    let res = await apiService(`/api/users/${id}`, "PUT", {
      firstname,
      lastname,
      role,
    });
    focusModal();
    displayEmployees();
  };

  React.useEffect(() => {
    displayEmployees();
  }, []);

  return (
    <main className="container my-3">
      <div id="employeeModal">
        <div className="card align-items-center justify-content-center mx-auto col-md-6 p-3">
          <form className="form-group w-100">
            <div className="mb-3 d-flex justify-content-between">
              <label>Edit Employee:</label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x"
                onClick={() => focusModal()}
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <div className="mb-3">
              <label>Level:</label>
              <select
                id="editEmployeeSelect"
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
            <button
              className="btn btn-info w-50 mx-auto d-block my-3"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => update(e, editID)}
            >
              Edit
            </button>
          </form>
        </div>
      </div>
      <button
        className="d-block w-100 btn btn-light mb-3"
        onClick={displayEmployees}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-refresh-ccw"
        >
          <polyline points="1 4 1 10 7 10"></polyline>
          <polyline points="23 20 23 14 17 14"></polyline>
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
        </svg>
      </button>
      <h5 className="text-center">Employees</h5>
      <ul className="list-group-flush border-top">
        {employees?.map((employee: IEmployee) => {
          return (
            <li
              className="list-group-item d-flex justify-content-between"
              key={`${employee?.id}-${employee?.lastname}-${employee?.role}`}
              
            >
              <span onClick={() => focusModal(employee)} className="feather-x">
                {employee?.firstname} {employee?.lastname}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x text-danger"
                onClick={() => remove(employee?.id)}
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export interface IListEmployeesProps {}

export default ListEmployees;
