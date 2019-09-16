import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardBox from "./Card";
import axios from "axios";
import Axios from "axios";

class RegisterForm extends Component {
  state = {
    ingame: null,
    rank: null,
    role: null,
    phoneNumber: null,
    facebook: null,
    code: null,
    school: null,
    suggests: null,
    uid: null,
    accountError: null, // null: loading, true: có lỗi, false: thành công
    errorMessage: null
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  findUID = () => {
    this.setState({ accountError: null });
    Axios.get(
      `https://cors-anywhere.herokuapp.com/https://acs-garena.leagueoflegends.com/v1/players?name=${this.state.ingame}&region=VN`
    )
      .then(response => {
        console.log(response.data);
        // console.log(response.data.accountId);
        // this.setState({ uid: response.data.accountId });
        // return Axios.get(
        //   `https://cors-anywhere.herokuapp.com/https://acs-garena.leagueoflegends.com/v1/stats/player_history/VN/${response.data.accountId}?begIndex=0&endIndex=15&`
        // );
      })
      // .then(doc => {
      //   console.log(doc);
      //   this.setState({ accountError: false });
      // })
      .catch(error => {
        this.setState({ accountError: true });
        console.log(error.response.status);
      });
  };
  handleSubmit = event => {
    event.preventDefault();
    let data = {
      ingame: this.state.ingame,
      rank: this.state.rank,
      role: this.state.role,
      phoneNumber: this.state.phoneNumber,
      facebook: this.state.facebook,
      school: this.state.school,
      code: this.state.code,
      uid: this.state.uid
    };
    axios
      .post(
        // "https://esc-finder.herokuapp.com/finder/add"
        "http://localhost:8080/finder/add",
        data
      )
      .then(res => {
        console.log("All test passed");
        this.setState({ suggests: res.data.suggestions.result });
      })
      .catch(error => {
        console.log(error.response);
        console.log("Lỗi ròi");
        console.log(error.response.data.message);
        this.setState({ errorMessage: error.response.data.message });
      });
    console.log(data);
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
    const role = ["Top", "Jungle", "Mid", "Ad Carry", "Support"];
    const { accountError } = this.state;
    return (
      <div className="form-content">
        <form className="form" onSubmit={this.handleSubmit}>
          <Typography variant="h6" align="center">
            Mẫu đăng ký ghép đội
          </Typography>
          <div style={{ display: "flex" }}>
            <TextField
              required
              error={accountError}
              onChange={this.handleChange}
              name="ingame"
              id="standard-dense"
              label="Ingame"
              margin="dense"
              fullWidth
              helperText={
                accountError === false
                  ? "Xác thực thành công" // true
                  : accountError === true
                  ? "Tài khoản trên không tồn tại, hãy đảm bảo bạn nhập đúng tài khoản!!" // false
                  : "" // null
              }
              color="primary"
            />
            <Button
              style={{
                fontSize: 12,
                padding: 0,
                fontWeight: 600
              }}
              onClick={this.findUID}
            >
              {accountError === false
                ? "Xong" // Đúng, màu xanh
                : "Kiểm tra" // Màu bth
              }
            </Button>
          </div>
          <label htmlFor="role" style={{ marginTop: 10, color: "gray" }}>
            Vị trí
          </label>
          <select
            required
            onChange={this.handleChange}
            name="role"
            className="select-style"
          >
            <option value="" defaultValue>
              -- Vị trí mong muốn --
            </option>
            {role.map(item => {
              return <option value={item}>{item}</option>;
            })}
          </select>
          <label htmlFor="rank" style={{ marginTop: 10, color: "gray" }}>
            Rank
          </label>
          <select
            required
            onChange={this.handleChange}
            name="rank"
            className="select-style"
          >
            <option value="" defaultValue>
              -- Xếp hạng --
            </option>
            {rank.map(item => {
              return <option value={item}>{item}</option>;
            })}
          </select>
          <TextField
            required
            onChange={this.handleChange}
            name="school"
            fullWidth
            id="standard-dense"
            label="Trường đang học"
            margin="dense"
          />
          <TextField
            required
            onChange={this.handleChange}
            name="phoneNumber"
            id="standard-dense"
            label="Số điện thoại"
            margin="dense"
          />
          <TextField
            required
            name="facebook"
            onChange={this.handleChange}
            id="standard-dense"
            label="Link facebook"
            margin="dense"
            helperText="Hãy copy link facebook từ trình duyệt để tránh bị lỗi khi đăng ký nhé"
          />
          <TextField
            required
            name="code"
            onChange={this.handleChange}
            id="standard-dense"
            label="Mã bảo mật"
            margin="dense"
            helperText="Tối thiểu 6 ký tự, tối đa 20 ký tự, càng khác biệt càng bảo mật "
          />
          <Button
            disabled={accountError === false ? false : true}
            color="primary"
            variant="contained"
            style={{ marginTop: 10 }}
            type="submit"
          >
            Gửi
          </Button>
          <Typography variant="subtitle1" color="secondary">
            {this.state.errorMessage}
          </Typography>
        </form>
        {this.state.suggests !== null ? (
          <div className="suggestions">
            <Typography variant="h5">Gợi ý đồng đội có thể ghép</Typography>
            {this.state.suggests.length > 0 ? (
              this.state.suggests.map(item => {
                return <CardBox data={item} />;
              })
            ) : (
              <Typography variant="h6">
                Không có gợi ý nào. Hãy đợi những bạn khác đăng ký nhé!
              </Typography>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default RegisterForm;
