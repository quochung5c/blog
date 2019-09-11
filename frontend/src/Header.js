import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div className="router">
        <div className="main">
          <NavLink className="route-link" to="/">
            <Typography variant="h5">Hỗ trợ ghép team đánh giải</Typography>
          </NavLink>
          <div class="button-group">
            <NavLink className="route-link" to="/register">
              <Button color="primary">Đăng ký ghép đội</Button>
            </NavLink>
            <NavLink className="route-link" to="/edit">
              <Button color="secondary">Chỉnh sửa thông tin</Button>
            </NavLink>
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
