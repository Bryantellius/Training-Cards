import * as React from "react";
import { NavLink } from "react-router-dom";

const Home: React.FC<IHomeProps> = () => {
  return (
    <main className="container-fluid p-0">
      <div id="homePhotos" className="jumbotron-fluid bg-dark"></div>
      <hr />
      <div className="d-flex my-4">
        <div className="col-md-6">
          <div className="p-2">
            <h3>About Us</h3>
            <p>
              The Trak Shak, established in 1995 by Valerie McLean, is the
              premier running destination in Birmingham. With our experienced
              and knowledgeable staff, weekly group runs, race packet pick ups,
              and a great selection of apparel, accessories and footwear, we
              provide incomparable service to the runner! Over the years, we’ve
              learned our fit process isn’t just for runners! Whether you are
              walking, jogging, standing, cross-fitting, or just have issues
              finding the perfect fitting shoe, we can help you! Visit one of
              our three conveniently located shops in Downtown Homewood, on 280
              in Inverness or in Hoover at the corner of Brock’s Gap Parkway and
              Stadium Trace.
            </p>
            <div className="d-flex justify-content-around mt-5">
              <button className="btn btn-lg btn-info">
                <NavLink className="nav-link text-light" to="/contact">
                  Contact Us
                </NavLink>
              </button>
              <button className="btn btn-lg btn-info">
                <NavLink className="nav-link text-light" to="/shop">
                  Shop Online
                </NavLink>
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <img
            className="shoeIMG"
            src="/assets/shoewall.jpg"
            alt="Homewood Shoe Wall"
          />
        </div>
      </div>
    </main>
  );
};

export interface IHomeProps {}

export default Home;
