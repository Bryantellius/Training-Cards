import * as React from "react";

const Footer: React.FC<IFooterProps> = () => {
  return (
    <main className="container-fluid d-flex flex-column justify-content-center p-3 mb-2">
      <h3 className="text-center">Upcoming Races</h3>
      <div className="card-deck">
        <div className="card">
          <div className="card-body">
            <div>
              <span className="d-block">30 May</span>
              <span className="d-block text-muted">Saturday</span>
            </div>
            <div>
              <p>
                <b>
                  St. Elias Cedar Run 5k & Cedar Shake Fun Run - Virtual Run
                </b>
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div>
              <span className="d-block">20 June</span>
              <span className="d-block text-muted">Saturday</span>
            </div>
            <div>
              <p>
                <b>I'm with Mike 5k</b>
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div>
              <span className="d-block">21 June</span>
              <span className="d-block text-muted">Sunday</span>
            </div>
            <div>
              <p>
                <b>Alabama State Games 5k</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export interface IFooterProps {}

export default Footer;
