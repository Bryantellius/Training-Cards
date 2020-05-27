import * as React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC<INavbarProps> = () => {
  return (
    <main className="container-fluid p-0">
      <div className="d-flex justify-content-center">
        <img
          src="/assets/trakshakmain.png"
          alt="Trak Shak Running Shops Logo"
        />
      </div>
      <div id="siteNav" className="d-flex justify-content-center align-items-center bg-info">
        <ul className="nav">
          <li className="nav-item">
            <NavLink
              className="nav-link text-light"
              activeClassName="bg-light text-dark"
              exact to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="bg-light text-dark"
              className="nav-link text-light"
              exact to="/runs"
            >
              Weekly Runs
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="bg-light text-dark"
              className="nav-link text-light"
              exact to="/results"
            >
              Race Results
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="bg-light text-dark"
              className="nav-link text-light"
              exact to="/races"
            >
              Upcoming Races
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="bg-light text-dark"
              className="nav-link text-light"
              exact to="/services"
            >
              Services
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="bg-light text-dark"
              className="nav-link text-light"
              exact to="/resources"
            >
              Running Resources
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="bg-light text-dark"
              className="nav-link text-light"
              exact to="/contact"
            >
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="bg-light text-dark"
              className="nav-link text-light"
              exact to="/giftcards"
            >
              Gift Cards
            </NavLink>
          </li>
          <li className="nav-item bg-success">
            <NavLink
              activeClassName="text-success"
              className="nav-link text-light"
              exact to="/shop"
            >
              Shop Online
            </NavLink>
          </li>
        </ul>
      </div>
    </main>
  );
};

export interface INavbarProps {}

export default Navbar;
