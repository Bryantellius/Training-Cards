import * as React from "react";
import { Shoes } from "../utils/Types";
import { apiService, User } from "../utils/apiService";
import { useHistory } from "react-router-dom";

const Learn: React.FC<ILearnProps> = () => {
  const history = useHistory();

  const [shoes, setShoes] = React.useState<Shoes[]>([]);
  const [currentShoe, setCurrentShoe] = React.useState<Shoes>(undefined);
  const [shoeIndex, setShoeIndex] = React.useState<number>(0);
  const [query, setQuery] = React.useState<string>("");

  const loadShoes = async (filter?: string) => {
    let shoes = await apiService("/api/shoes");
    if (filter && filter !== "true") {
      let filteredShoes = shoes.filter(
        (shoe: Shoes) => shoe.type == filter || shoe.purpose == filter
      );
      setShoes(filteredShoes);
      setCurrentShoe(filteredShoes[0]);
    } else if (query !== "") {
      let searchedShoes = shoes.filter(
        (shoe: Shoes) =>
          shoe.brand_name.indexOf(query) !== -1 ||
          shoe.model_name.indexOf(query) !== -1
      );
      setShoes(searchedShoes);
      setCurrentShoe(searchedShoes[0]);
    } else if (filter === "true") {
      let saleShoes = shoes.filter((shoe: Shoes) => shoe.markdown);
      setShoes(saleShoes);
      setCurrentShoe(saleShoes[0]);
    } else {
      setShoes(shoes);
      setCurrentShoe(shoes[0]);
    }
  };

  const toggleActive = (divId: string, show?: boolean) => {
    let target = document.getElementById(divId);
    let cardFront = document.getElementById("cardFrontIMG");
    let cardBack = document.getElementById("cardBackInfo");

    if (show) {
      if (cardFront === target) {
        cardFront.classList.remove("hide");
        cardBack.classList.add("hide");
      } else {
        cardFront.classList.add("hide");
        cardBack.classList.remove("hide");
      }
      target.classList.remove("hide");
    } else {
      if (target.classList.contains("active")) {
        target.classList.toggle("active");
        loadShoes(undefined);
      } else {
        let filter = target.innerHTML;
        loadShoes(filter);
        target.classList.toggle("active");
      }
    }
  };

  const nextCard = (direction: number) => {
    if (shoeIndex >= shoes.length - 1) {
      setCurrentShoe(shoes[0]);
      setShoeIndex(0);
    } else if (shoeIndex <= 0 && direction === -1) {
      setCurrentShoe(shoes[shoes.length - 1]);
      setShoeIndex(shoes.length - 1);
    } else {
      setCurrentShoe(shoes[shoeIndex + direction]);
      setShoeIndex(shoeIndex + direction);
    }
  };

  const hasMarkdown = () => {
    if (currentShoe?.markdown) {
      return (
        <span id="shoePrice">
          <s>${currentShoe?.price}</s>{" "}
          <span className="text-danger">
            <em>${currentShoe?.markdown}</em>
          </span>
        </span>
      );
    } else {
      return <span id="shoePrice">${currentShoe?.price}</span>;
    }
  };

  React.useEffect(() => {
    if (User.userid === null) {
      history.push("/login");
    } else {
      loadShoes();
    }
  }, [query]);

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
            <button
              className="btn btn-success"
              onClick={() => loadShoes("true")}
            >
              Sale Items
            </button>
          </div>
        </div>
        <div id="shoeDiv" className="col-sm-8">
          <div className="card">
            <div
              id="cardFrontIMG"
              className="card-img"
              onClick={() => toggleActive("cardBackInfo", true)}
            >
              <img
                className="shoeIMG"
                src={currentShoe?.imageURL}
                alt="Shoe Card"
              />
            </div>
            <div
              id="cardBackInfo"
              className="card-img hide"
              onClick={() => toggleActive("cardFrontIMG", true)}
            >
              <div className="d-flex flex-column p-3 justify-content-around">
                <span id="shoeName">
                  {currentShoe?.brand_name} {currentShoe?.model_name}
                </span>
                {hasMarkdown()}
                <span id="shoeType">{currentShoe?.type}</span>
                <span id="shoePurpose">{currentShoe?.purpose} Running</span>
              </div>
            </div>
            <div className="btn-group">
              <button
                className="btn d-block btn-outline-info"
                onClick={() => nextCard(-1)}
              >
                Back
              </button>
              <button
                className="btn d-block btn-outline-info"
                onClick={() => nextCard(1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export interface ILearnProps {}

export default Learn;
