import React from "react";
import "./App.css";
import axios from "axios";
import RegisterForm from "./RegisterForm";
import Edit from "./Edit";
import Header from "./Header";
import List from "./List";

import { BrowserRouter, Switch, Route } from "react-router-dom";

export default class App extends React.Component {
  state = {
    counts: null,
    data: []
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/finder")
      .then(res => {
        console.log(res.data.data);
        this.setState({ counts: res.data.counts, data: res.data.data });
      })
      .catch(error => {
        console.log(error);
      });
    console.log(this.state.data);
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={List} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/edit" component={Edit}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
