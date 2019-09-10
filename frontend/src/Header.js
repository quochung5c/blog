import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div className="router">
        <div className="main">
          <NavLink to="/">
            <Typography variant="h5">Hỗ trợ ghép team đánh giải</Typography>
          </NavLink>
          <div class="button-group">
            <NavLink to="/register">
              <Button color="primary">Đăng ký ghép đội</Button>
            </NavLink>
            <Button color="secondary">Đăng nhập</Button>
          </div>
        </div>
        <div class="caption">
          <Typography variant="h6">
            Made by RD Team - PTIT eSports Club
          </Typography>
        </div>
      </div>
    );
  }
}
