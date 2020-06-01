import * as React from "react";
import AddEmployee from "../components/AddEmployee";
import ListEmployees from "../components/ListEmployees";
import AddMessage from "../components/AddMessage";
import ListMessages from "../components/ListMessages";
import AddInventory from "../components/AddInventory";
import ListInventory from "../components/ListInventory";
import { useHistory } from "react-router-dom";
import { User } from "../utils/apiService";

const Template: React.FC<ITemplateProps> = () => {
  const history = useHistory();
  const toggle = (divId: string, headerId: string) => {
    let m = "messageTab",
      i = "inventoryTab",
      e = "employeeTab",
      mD = "messages",
      iD = "inventory",
      eD = "employees";

    document.getElementById(m).classList.remove("active");
    document.getElementById(i).classList.remove("active");
    document.getElementById(e).classList.remove("active");

    document.getElementById(mD).classList.add("hide");
    document.getElementById(eD).classList.add("hide");
    document.getElementById(iD).classList.add("hide");

    document.getElementById(divId).classList.remove("hide");
    document.getElementById(headerId).classList.add("active");
  };

  React.useEffect(() => {
    if (User.userid === null) {
      history.push("/login");
    }
  }, [User]);

  return (
    <main className="container">
      <div className="row my-2">
        <h5
          id="messageTab"
          className="text-center col-md-4 p-2 active"
          onClick={() => toggle("messages", "messageTab")}
        >
          Manage Messages
        </h5>
        <h5
          id="inventoryTab"
          className="text-center col-md-4 p-2"
          onClick={() => toggle("inventory", "inventoryTab")}
        >
          Manage Inventory
        </h5>
        <h5
          id="employeeTab"
          className="text-center col-md-4 p-2"
          onClick={() => toggle("employees", "employeeTab")}
        >
          Manage Employees
        </h5>
      </div>
      <div id="employees" className="row hide">
        <div className="col-md-6">
          <AddEmployee />
        </div>
        <div className="col-md-6">
          <ListEmployees />
        </div>
      </div>
      <div id="messages" className="row">
        <div className="col-md-6">
          <AddMessage />
        </div>
        <div className="col-md-6">
          <ListMessages />
        </div>
      </div>
      <div id="inventory" className="row hide">
        <div className="col-md-6">
          <AddInventory />
        </div>
        <div className="col-md-6">
          <ListInventory />
        </div>
      </div>
    </main>
  );
};

export interface ITemplateProps {}

export default Template;
