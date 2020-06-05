import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { User, removeAccesstoken } from "../utils/apiService";

const Navbar: React.FC<INavbarProps> = () => {
  const location = useLocation();

  const logout = () => {
    removeAccesstoken();
    window.location.reload();
  };

  React.useEffect(() => {
    if (User.userid === null) {
      console.log("Welcome!");
    }
  }, [location.pathname]);

  if (User.role === "admin") {
    return (
      <main className="container-fluid p-0">
        <div className="d-flex justify-content-center">
          <img
            src="/assets/trakshakmain.png"
            alt="Trak Shak Running Shops Logo"
          />
        </div>
        <div
          id="siteNav"
          className="d-flex justify-content-center align-items-center bg-info"
        >
          <ul className="nav">
            <li className="nav-item">
              <NavLink
                className="nav-link text-light"
                activeClassName="bg-light text-dark"
                exact
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="bg-light text-dark"
                className="nav-link text-light"
                exact
                to="/learn"
              >
                Learn
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="bg-light text-dark"
                className="nav-link text-light"
                exact
                to="/admin"
              >
                Admin
              </NavLink>
            </li>
          </ul>
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
            className="feather feather-log-out text-light"
            id="logout"
            onClick={logout}
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </div>
      </main>
    );
  } else if (User.role === "employee") {
    return (
      <main className="container-fluid p-0">
        <div className="d-flex justify-content-center">
          <img
            src="/assets/trakshakmain.png"
            alt="Trak Shak Running Shops Logo"
          />
        </div>
        <div
          id="siteNav"
          className="d-flex justify-content-center align-items-center bg-info"
        >
          <ul className="nav">
            <li className="nav-item">
              <NavLink
                className="nav-link text-light"
                activeClassName="bg-light text-dark"
                exact
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="bg-light text-dark"
                className="nav-link text-light"
                exact
                to="/learn"
              >
                Learn
              </NavLink>
            </li>
          </ul>
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
            className="feather feather-log-out text-light"
            id="logout"
            onClick={logout}
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </div>
      </main>
    );
  } else {
    return (
      <main className="container-fluid p-0">
        <div className="d-flex justify-content-center">
          <img
            src="/assets/trakshakmain.png"
            alt="Trak Shak Running Shops Logo"
          />
        </div>
        <div id="loginNav" className="bg-info"></div>
      </main>
    );
  }
};

export interface INavbarProps {}

export default Navbar;
