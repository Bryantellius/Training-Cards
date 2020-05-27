import * as React from "react";
import { Shoes } from "../utils/Types";
import { apiService } from "../utils/apiService";

const Shop: React.FC<IShopProps> = () => {
  const [shoes, setShoes] = React.useState<Shoes[]>([]);
  const [query, setQuery] = React.useState<string>("");

  const displayShoes = async (filter?: string) => {
    let shoes = await apiService("/api/shoes");
    if (filter) {
      let filteredShoes = shoes.filter(
        (shoe: Shoes) => shoe.type == filter || shoe.purpose == filter || shoe.markdown
      );
      setShoes(filteredShoes);
    } else if (query !== "") {
      let searchedShoes = shoes.filter(
        (shoe: Shoes) =>
          shoe.brand_name.indexOf(query) !== -1 ||
          shoe.model_name.indexOf(query) !== -1
      );
      setShoes(searchedShoes);
    } else {
      setShoes(shoes);
    }
  };

  const toggleActive = (divId: string) => {
    let target = document.getElementById(divId);
    if (target.classList.contains("active")) {
      target.classList.toggle("active");
      displayShoes(undefined);
    } else {
      let filter = target.innerHTML;
      displayShoes(filter);
      target.classList.toggle("active");
    }
  };

  const hasMarkdown = (shoe: any) => {
    if (shoe.markdown) {
      return (
        <span className="d-block">
          <s>${shoe.price}</s>{" "}
          <span className="text-danger">${shoe.markdown}</span>
        </span>
      );
    } else {
      return <span className="d-block">${shoe.price}</span>;
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
            <button
              id="neutralBtn"
              className="btn btn-outline-dark"
              onClick={() => toggleActive("neutralBtn")}
            >
              Neutral
            </button>
            <button
              id="supportBtn"
              className="btn btn-outline-dark"
              onClick={() => toggleActive("supportBtn")}
            >
              Support
            </button>
          </div>
          <div className="btn-group mb-3 d-flex" role="group">
            <button
              id="roadBtn"
              className="btn btn-outline-dark"
              onClick={() => toggleActive("roadBtn")}
            >
              Road
            </button>
            <button
              id="trailBtn"
              className="btn btn-outline-dark"
              onClick={() => toggleActive("trailBtn")}
            >
              Trail
            </button>
          </div>
          <hr />
          <div className="btn-group mb-3 d-flex" role="group">
            <button className="btn btn-success"
            onClick={() => displayShoes("true")}
            >Sale Items</button>
          </div>
        </div>
        <div id="shoeDiv" className="col-sm-8">
          <div className="row row-cols-1 row-cols-md-2">
            {shoes.map((shoe) => (
              <div className="col mb-3" key={`${shoe.id}-${shoe.model_name}`}>
                <div className="card">
                  <div className="card-img">
                    <img
                      className="shoeIMG"
                      src={shoe.imageURL}
                      alt="Image of Shoe"
                    />
                  </div>
                  <hr/>
                  <div className="card-body">
                    <div className="card-text">
                      <h5>
                        {shoe.brand_name} {shoe.model_name}
                      </h5>
                      <span className="d-block">{shoe.type}</span>
                      <span className="d-block">{shoe.purpose} Running</span>
                      {hasMarkdown(shoe)}
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

export interface IShopProps {}

export default Shop;
