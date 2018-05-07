import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Register, Login } from "../containers";
import { Navbar, Footer, Landing } from "../view";

class Home extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default Home;
