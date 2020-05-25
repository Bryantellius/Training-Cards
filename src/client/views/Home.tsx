import * as React from "react";
import { Shoes } from "../utils/Types";
import { apiService } from "../utils/apiService";

const Home: React.FC<IHomeProps> = () => {
  const [shoes, setShoes] = React.useState<Shoes[]>([]);
  const [currentShoe, setCurrentShoe] = React.useState<Shoes>(null);
  const [num, setNum] = React.useState<any>(0);

  React.useEffect(() => {
    (async () => {
      let shoes = await apiService("/api/shoes");
      setShoes(shoes);
      setCurrentShoe(shoes[num]);
    })();
  }, []);

  const slide = (index?: any) => {
    if (index) {
      setNum(index);
      setCurrentShoe(shoes[index.toString()]);
    } else if (num === shoes.length - 1) {
      setNum(0);
      setCurrentShoe(shoes[0]);
    } else {
      setNum(num + 1);
      setCurrentShoe(shoes[num + 1]);
    }
  };

  return (
    <main className="container my-5">
      <div className="row">
        <div className="col-sm-4">
          <ul className="list-group">
            {shoes.map((shoe, index) => (
              <li
                className="list-group-item"
                key={`${shoe.id}-${shoe.model_name}`}
                onClick={() => slide(index)}
              >
                {shoe.brand_name} {shoe.model_name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-sm-8">
          <div className="card">
            <div className="card-img">
              <img src="" alt="Image of Shoe" />
            </div>
            <div className="card-body">
              <div className="card-text">
                <h3>
                  {currentShoe?.brand_name} {currentShoe?.model_name}
                </h3>
                <span className="d-block">{currentShoe?.type}</span>
                <span className="d-block">{currentShoe?.purpose} Running</span>
                <span className="d-block">${currentShoe?.price}</span>
              </div>
            </div>
            <div className="card-footer">
              <button onClick={() => slide()}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export interface IHomeProps {}

export default Home;
