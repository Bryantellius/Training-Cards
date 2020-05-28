import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Learn from "./views/Learn";
import Login from "./views/Login";
import Admin from "./views/Admin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App: React.FC<IAppProps> = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/learn" component={Learn} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/admin" component={Admin} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export interface IAppProps {}

export default App;
