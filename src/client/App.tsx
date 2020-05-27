import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Shop from "./views/Shop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App: React.FC<IAppProps> = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={Shop} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export interface IAppProps {}

export default App;
