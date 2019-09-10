import React from "react";
import "./App.css";
import axios from "axios";
import CardBox from "./Card";
import RegisterForm from "./RegisterForm";
import Header from "./Header";
import List from "./List";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
