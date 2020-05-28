import * as React from "react";
import { NavLink } from "react-router-dom";
import { User } from "../utils/apiService";

const Navbar: React.FC<INavbarProps> = () => {
  if (User.role == "admin") {
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
        </div>
      </main>
    );
  } else if (User.role == "employee") {
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
