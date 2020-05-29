import * as React from "react";
import { apiService } from "../utils/apiService";
import { Shoes } from "../utils/Types";

const ListInventory: React.FC<IListInventoryProps> = () => {
  const [shoes, setShoes] = React.useState<Shoes[]>([]);
  const [query, setQuery] = React.useState<string>("");

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

  React.useEffect(() => {
    displayshoes();
  }, [query]);

  return (
    <main className="container my-3">
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
        {shoes.map((shoe: Shoes) => {
          return (
            <li
              className="list-group-item d-flex justify-content-between"
              key={`${shoe.id}-${shoe.model_name}-${shoe.brand_name}`}
            >
              <span>
                {shoe.brand_name} {shoe.model_name}
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
                onClick={() => remove(shoe.id)}
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