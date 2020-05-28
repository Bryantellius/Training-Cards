import * as React from "react";
import AddEmployee from "../components/AddEmployee";

const Template: React.FC<ITemplateProps> = () => {
  return (
    <main className="container">
      <div className="d-flex justify-content-around my-2">
        <h5 className="text-center">Add Message</h5>
        <h5 className="text-center">Add Inventory</h5>
        <h5 className="text-center">Add Employee</h5>
      </div>
      <AddEmployee />
    </main>
  );
};

export interface ITemplateProps {}

export default Template;
