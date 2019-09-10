import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

class RegisterForm extends Component {
  state = {
    ingame: null,
    rank: null,
    role: null,
    phoneNumber: null,
    facebook: null,
    secret: null
  };
  handleChange = event => {
    console.log(event.target.value);
  };
  render() {
    const rank = [
      "Sắt",
      "Đồng",
      "Bạc",
      "Vàng",
      "Bạch kim",
      "Kim cương",
      "Cao thủ",
      "Thách đấu"
    ];
    return (
      <form className="form">
        <Typography variant="h6" align="center">
          Mẫu đăng ký ghép đội
        </Typography>
        <TextField id="standard-dense" label="Ingame" margin="dense" />
        <TextField id="standard-dense" label="Vị trí" margin="dense" />
        <select>
          <option value="a" selected>a</option>
          <option value="b">b</option>

        </select>
        <TextField id="standard-dense" label="Trường đang học" margin="dense" />
        <TextField id="standard-dense" label="Số điện thoại" margin="dense" />
        <TextField id="standard-dense" label="Link facebook" margin="dense" />
        <TextField
          id="standard-dense"
          label="Mã bảo mật"
          margin="dense"
          helperText="Sử dụng để đăng nhập"
        />
      </form>
    );
  }
}

export default RegisterForm;
