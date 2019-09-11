import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardBox from "./Card";
import axios from "axios";

class RegisterForm extends Component {
  state = {
    ingame: null,
    rank: null,
    role: null,
    phoneNumber: null,
    facebook: null,
    code: null,
    school: null,
    suggests: null
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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
      code: this.state.code
    };
    axios.post("https://esc-finder.herokuapp.com/finder/add", data).then(res => {
      this.setState({ suggests: res.data.suggestions.result });
    });
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
    return (
      <div className="form-content">
        <form className="form" onSubmit={this.handleSubmit}>
          <Typography variant="h6" align="center">
            Mẫu đăng ký ghép đội
          </Typography>
          <TextField
            onChange={this.handleChange}
            name="ingame"
            id="standard-dense"
            label="Ingame"
            margin="dense"
            helperText="Đăng ký với ingame này, bạn cho phép chúng mình sử dụng thông tin trong lịch sử đấu của tài khoản"
          />
          <label htmlFor="role" style={{ marginTop: 10, color: "gray" }}>
            Vị trí
          </label>
          <select
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
            onChange={this.handleChange}
            name="school"
            id="standard-dense"
            label="Trường đang học"
            margin="dense"
          />
          <TextField
            onChange={this.handleChange}
            name="phoneNumber"
            id="standard-dense"
            label="Số điện thoại"
            margin="dense"
          />
          <TextField
            name="facebook"
            onChange={this.handleChange}
            id="standard-dense"
            label="Link facebook"
            margin="dense"
            helperText="Hãy copy link facebook từ trình duyệt để tránh bị lỗi khi đăng ký nhé"
          />
          <TextField
            name="code"
            onChange={this.handleChange}
            id="standard-dense"
            label="Mã bảo mật"
            margin="dense"
            helperText="Sử dụng để xác thực khi sử dụng tính năng, đảm bảo trên 6 ký tự và dưới 20 ký tự, càng phức tạp càng tốt hehe"
          />
          <Button
            color="primary"
            variant="contained"
            style={{ marginTop: 10 }}
            type="submit"
          >
            Gửi
          </Button>
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
