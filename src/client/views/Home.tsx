import * as React from "react";
import { Shoes } from "../utils/Types";
import { apiService } from "../utils/apiService";

const Home: React.FC<IHomeProps> = () => {
  const [shoes, setShoes] = React.useState<Shoes[]>([]);
  const [query, setQuery] = React.useState<string>("");

  const displayShoes = async () => {
    let shoes = await apiService("/api/shoes");
    if (query !== "") {
      let filteredShoes = shoes.filter(
        (shoe: Shoes) =>
          shoe.model_name.indexOf(query) !== -1 ||
          shoe.brand_name.indexOf(query) !== -1
      );
      setShoes(filteredShoes);
    } else {
      setShoes(shoes);
    }
  };

  React.useEffect(() => {
    displayShoes();
  }, [query]);

  const modalView = (shoeIndex?: any) => {
    // let modal = document.getElementById("modalDiv");
    // modal.style.display = "block";
    alert("Display shoe info. TBC.");
  };

  return (
    <main className="container my-5">
      <div className="row">
        {/* Left hand column for search and filter options */}
        <div className="col-sm-4">
          <div className="input-group mb-3">
            <input
              type="text"
              placeholder="Search.."
              value={query}
              className="form-control"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
            />
          </div>
          <hr />
          <div className="btn-group mb-3 d-flex" role="group">
            <button className="btn btn-outline-dark">Neutral</button>
            <button className="btn btn-outline-dark">Support</button>
          </div>
          <div className="btn-group mb-3 d-flex" role="group">
            <button className="btn btn-outline-dark">Road</button>
            <button className="btn btn-outline-dark">Trail</button>
          </div>
          <div className="btn-group mb-3 d-flex" role="group">
            <button className="btn btn-outline-dark">Men's</button>
            <button className="btn btn-outline-dark">Women's</button>
          </div>
        </div>
        <div className="col-sm-8">
          <div className="row row-cols-1 row-cols-md-2">
            {shoes.map((shoe) => (
              <div className="col mb-3" key={`${shoe.id}-${shoe.model_name}`}>
                <div className="card">
                  <div className="card-img">
                    <img src="" alt="Image of Shoe" />
                  </div>
                  <div className="card-body">
                    <div className="card-text">
                      <h5>
                        {shoe.brand_name} {shoe.model_name}
                      </h5>
                      <span className="d-block">{shoe.type}</span>
                      <span className="d-block">{shoe.purpose} Running</span>
                      <span className="d-block">${shoe.price}</span>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => modalView()}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export interface IHomeProps {}

export default Home;
