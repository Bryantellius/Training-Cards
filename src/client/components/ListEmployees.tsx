import * as React from "react";
import { apiService } from "../utils/apiService";
import { IEmployee } from "../utils/Types";

const ListEmployees: React.FC<IListEmployeesProps> = () => {
  const [employees, setEmployees] = React.useState<IEmployee[]>([]);

  const displayEmployees = async () => {
    let users = await apiService("/api/users");
    setEmployees(users);
  };

  const remove = async (id: Number) => {
    let res = await apiService(`/api/users/${id}`, "DELETE");
    displayEmployees();
  };

  React.useEffect(() => {
    displayEmployees();
  }, []);

  return (
    <main className="container my-3">
      <h5 className="text-center">Employees</h5>
      <ul className="list-group-flush border-top">
        {employees.map((employee: IEmployee) => {
          return (
            <li
              className="list-group-item d-flex justify-content-between"
              key={`${employee.id}-${employee.lastname}-${employee.role}`}
            >
              <span>
                {employee.firstname} {employee.lastname}
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
                onClick={() => remove(employee.id)}
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
