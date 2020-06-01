import * as React from "react";
import { apiService } from "../utils/apiService";
import { Shoes } from "../utils/Types";

const ListInventory: React.FC<IListInventoryProps> = () => {
  const [shoes, setShoes] = React.useState<Shoes[]>([]);
  const [query, setQuery] = React.useState<string>("");
  const [showing, setShowing] = React.useState<boolean>(false);
  const [editID, setEditID] = React.useState<number>(0);
  const [model_name, setModel_name] = React.useState<string>("");
  const [brand_name, setBrand_name] = React.useState<string>("");
  const [type, setType] = React.useState<string>("Neutral");
  const [purpose, setPurpose] = React.useState<string>("Road");
  const [price, setPrice] = React.useState<number>(0);
  const [markdown, setMarkdown] = React.useState<number>(0);

  const displayshoes = async () => {
    let shoes = await apiService("/api/shoes");
    if (query !== "") {
      let searchedShoes = shoes.filter(
        (shoe: Shoes) =>
          shoe.model_name.indexOf(query) !== -1 ||
          shoe.brand_name.indexOf(query) !== -1
      );
      setShoes(searchedShoes);
    } else {
      setShoes(shoes);
    }
  };

  const remove = async (id: Number) => {
    let res = await apiService(`/api/shoes/${id}`, "DELETE");
    displayshoes();
  };

  const focusModal = (shoe?: Shoes) => {
    setModel_name(shoe?.model_name);
    setBrand_name(shoe?.brand_name);
    setPrice(Number(shoe?.price));
    setMarkdown(Number(shoe?.markdown));
    setType(shoe?.type);
    setPurpose(shoe?.purpose);
    setEditID(Number(shoe?.id));
    let modal = document.getElementById("inventoryModal");
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
    let discount: any;
    if (markdown !== 0) {
      discount = price - (price * (markdown / 100));
    } else {
      discount = null;
    }

    let body = {
      model_name,
      brand_name,
      price,
      markdown: discount,
      type,
      purpose,
    };
    let res = await apiService(`/api/shoes/${id}`, "PUT", body);
    focusModal();
    displayshoes();
  };

  React.useEffect(() => {
    displayshoes();
  }, [query]);

  return (
    <main className="container my-3">
      <div id="inventoryModal">
        <div className="card align-items-center justify-content-center mx-auto col-md-6 p-3">
          <form className="form-group w-100">
            <div className="mb-3 d-flex justify-content-between">
              <label>Edit Shoe:</label>
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
                  id="editTypeSelect"
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
                  id="editPurposeSelect"
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
        onClick={displayshoes}
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
      <h5 className="text-center">Shoes</h5>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={query}
          placeholder="Search.."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
        />
      </div>
      <ul className="list-group-flush border-top">
        {shoes?.map((shoe: Shoes) => {
          return (
            <li
              className="list-group-item d-flex justify-content-between"
              key={`${shoe?.id}-${shoe?.model_name}-${shoe?.brand_name}`}
            >
              <span onClick={() => focusModal(shoe?)} className="feather-x">
                {shoe?.brand_name} {shoe?.model_name}
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
                onClick={() => remove(shoe?.id)}
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

export interface IListInventoryProps {}

export default ListInventory;
