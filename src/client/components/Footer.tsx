import * as React from "react";

const Footer: React.FC<IFooterProps> = () => {
  return (
    <main className="container-fluid d-flex flex-column justify-content-center p-3 mb-2 bg-info">
      <h3 className="text-center text-light border-light border-left border-right p-2">Upcoming Races</h3>
      <div className="card-deck">
        <div className="card">
          <div className="card-body">
            <div>
              <span className="d-block mb-2">30 MAY</span>
              <span className="d-block mb-2 text-muted">SATURDAY</span>
            </div>
            <hr/>
            <h4>St. Elias Cedar Run 5k & Cedar Shake Fun Run - Virtual Run</h4>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div>
              <span className="d-block mb-2">20 JUNE</span>
              <span className="d-block mb-2 text-muted">SATURDAY</span>
            </div>
            <hr/>
            <h4>I'm with Mike 5k</h4>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div>
              <span className="d-block mb-2">21 JUNE</span>
              <span className="d-block mb-2 text-muted">SUNDAY</span>
            </div>
            <hr/>
            <h4>Alabama State Games 5k</h4>
          </div>
        </div>
      </div>
    </main>
  );
};

export interface IFooterProps {}

export default Footer;
