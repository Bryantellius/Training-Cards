import * as React from "react";
import { apiService } from "../utils/apiService";

const AddInventory: React.FC<IAddInventoryProps> = () => {
  const [model_name, setModel_name] = React.useState<string>("");
  const [brand_name, setBrand_name] = React.useState<string>("");
  const [type, setType] = React.useState<string>("Neutral");
  const [purpose, setPurpose] = React.useState<string>("Road");
  const [price, setPrice] = React.useState<Number>(0);

  const add = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let body = {
      model_name,
      brand_name,
      type,
      purpose,
      price,
    };
    try {
      let res = await apiService("/api/shoes", "POST", body);
      if (res) {
        document.getElementById("successAlert").style.display = "block";
        setModel_name("");
        setBrand_name("");
        setType("");
        setPurpose("");
        setPrice(0);
        window.location.reload();
      }
    } catch (err) {
      alert("An error occured while trying to add to inventory.");
      throw err;
    }
  };

  return (
    <main className="container my-3 d-flex flex-column justify-content-center align-items-center">
      <div id="successAlert" className="alert alert-success col-md-12">
        Shoe Added!
      </div>
      <form className="form-group col-md-10 p-3">
        <div className="mb-3">
          <label>Model Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Model Name"
            value={model_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setModel_name(e.target.value)
            }
          />
        </div>
        <div className="mb-3">
          <label>Brand Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Brand Name"
            value={brand_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBrand_name(e.target.value)
            }
          />
        </div>
        <div className="mb-3">
          <label>Price:</label>
          <div className="input-group">
            <div className="input-group-append">
              <span className="input-group-text">$</span>
            </div>
            <input
              type="number"
              className="form-control"
              placeholder="130.00"
              value={brand_name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrice(Number(e.target.value))
              }
            />
          </div>
        </div>
        <div className="mb-3">
          <label>Type:</label>
          <select
            id="typeSelect"
            className="form-control"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setType(e.target.value)
            }
          >
            <option value="Neutral">Neutral</option>
            <option value="Support">Support</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Purpose:</label>
          <select
            id="purposeSelect"
            className="form-control"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setPurpose(e.target.value)
            }
          >
            <option value="Road">Road</option>
            <option value="Trail">Trail</option>
          </select>
        </div>
        <button
          className="btn btn-info w-50 mx-auto d-block my-3"
          onClick={add}
        >
          Add
        </button>
      </form>
    </main>
  );
};

export interface IAddInventoryProps {}

export default AddInventory;
