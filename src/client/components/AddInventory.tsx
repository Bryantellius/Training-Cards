import * as React from "react";
import { apiService } from "../utils/apiService";

const AddInventory: React.FC<IAddInventoryProps> = () => {
  const [model_name, setModel_name] = React.useState<string>("");
  const [brand_name, setBrand_name] = React.useState<string>("");
  const [type, setType] = React.useState<string>("Neutral");
  const [purpose, setPurpose] = React.useState<string>("Road");
  const [price, setPrice] = React.useState<number>(0);
  const [markdown, setMarkdown] = React.useState<number>(0);

  const add = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let fileList: any = document.getElementById("fileInput");
    let file = fileList.files;
    let body = {
      model_name,
      brand_name,
      type,
      purpose,
      price,
      markdown: price * (markdown / 100),
      imageURL: `/assets/${file[0].name}`,
    };
    try {
      console.log(file[0]);
      const formData = new FormData();
      formData.append("file", file[0]);
      let res = await apiService("/api/assets", "POST", formData);
    } catch (err) {
      throw err;
    }
    // try {
    //   let res = await apiService("/api/shoes", "POST", body);
    //   if (res) {
    //     document.getElementById("successAlert").style.display = "block";
    //     setModel_name("");
    //     setBrand_name("");
    //     setType("");
    //     setPurpose("");
    //     setPrice(0);
    //     setMarkdown(0);
    //     document.getElementById("fileLabel").innerHTML = "Choose File";
    //   }
    // } catch (err) {
    //   alert("An error occured while trying to add to inventory.");
    //   throw err;
    // }
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
              value={price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrice(Number(e.target.value))
              }
            />
            <div className="input-group-append">
              <span className="input-group-text">Markdown %</span>
            </div>
            <input
              type="number"
              className="form-control"
              placeholder="25"
              value={markdown}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMarkdown(Number(e.target.value))
              }
            />
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col-sm-6">
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
          <div className="col-sm-6">
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
        </div>
        <div className="mb-3">
          <label>Image:</label>
          <div className="custom-file">
            <input
              type="file"
              name="file"
              className="custom-file-input"
              id="fileInput"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                document.getElementById(
                  "fileLabel"
                ).innerHTML = e.target.value.slice(12);
              }}
            />
            <label id="fileLabel" className="custom-file-label">
              Choose file
            </label>
          </div>
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
