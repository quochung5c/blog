import React, { Component } from "react";
import { TextField, Button, Typography, ButtonGroup } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Axios from "axios";
class Edit extends Component {
  state = {
    ingame: null,
    rank: null,
    role: null,
    phoneNumber: null,
    facebook: null,
    code: null,
    school: null,
    suggests: null,
    status: null,
    data: null,
    redirect: false,
    error: null
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleRequest = event => {
    event.preventDefault();
    Axios.get(
      // `https://esc-finder.herokuapp.com/finder/${this.state.code}`
      `http://localhost:8080/finder/${this.state.code}`
    )
      .then(res => {
        this.setState({ data: res.data.data });
        console.log(typeof res.data.data);
      })
      .catch(error => {
        console.log(error.response.data.message);
        this.setState({ data: error.response.data.message });
      });
  };
  handleDelete = () => {
    Axios.delete(`http://localhost:8080/finder/${this.state.code}`).then(
      res => {
        alert('Xóa thành công!')
        this.setState({ redirect: true });
      }
    );
  };
  handleUpdate = ev => {
    ev.preventDefault();
    let update = {
      ingame:
        this.state.ingame === null ? this.state.data.ingame : this.state.ingame,
      rank: this.state.rank === null ? this.state.data.rank : this.state.rank,
      role: this.state.role === null ? this.state.data.role : this.state.role,
      phoneNumber:
        this.state.phoneNumber === null
          ? this.state.data.phoneNumber
          : this.state.phoneNumber,
      facebook:
        this.state.facebook === null
          ? this.state.data.facebook
          : this.state.facebook,
      school:
        this.state.school === null ? this.state.data.school : this.state.school,
      code: this.state.code === null ? this.state.data.code : this.state.code,
      status:
        this.state.status === null ? this.state.data.status : this.state.status
    };
    Axios.patch(
      `https://esc-finder.herokuapp.com/finder/${this.state.data._id}`,
      update
    )
      .then(res => {
        alert("Chỉnh sửa thành công");
        this.setState({ redirect: true });
      })
      .catch(error => {
        alert("Chỉnh sửa thất bại");
        console.log(error);
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
    const { data, redirect } = this.state;
    if (redirect) return <Redirect to="/" />;
    return (
      <div class="form-content">
        <form className="form" onSubmit={this.handleRequest}>
          <Typography variant="h5">Nhập mã bảo mật của bạn</Typography>
          <TextField
            name="code"
            onChange={this.handleChange}
            id="standard-dense"
            label="Mã bảo mật"
            margin="normal"
          />
          <Button type="submit">Gửi yêu cầu</Button>
        </form>
        {data === null ? (
          ""
        ) : typeof data !== "object" ? (
          <Typography variant="h6" color="textPrimary">
            {data}
          </Typography>
        ) : (
          <form class="form" onSubmit={this.handleUpdate}>
            <TextField
              onChange={this.handleChange}
              name="ingame"
              id="standard-dense"
              label="Ingame"
              value={data.ingame}
              margin="normal"
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
                {data.role}
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
                {data.rank}
              </option>
              {rank.map(item => {
                return <option value={item}>{item}</option>;
              })}
            </select>
            <TextField
              onChange={this.handleChange}
              value={data.school}
              name="school"
              id="standard-dense"
              label="Trường đang học"
              margin="normal"
            />
            <TextField
              onChange={this.handleChange}
              value={data.phoneNumber}
              name="phoneNumber"
              id="standard-dense"
              label="Số điện thoại"
              margin="normal"
            />
            <TextField
              name="facebook"
              onChange={this.handleChange}
              value={data.facebook}
              id="standard-dense"
              label="Link facebook"
              margin="normal"
              helperText="Hãy copy link facebook từ trình duyệt để tránh bị lỗi khi đăng ký nhé"
            />
            <TextField
              value={data.secretCode}
              name="code"
              onChange={this.handleChange}
              id="standard-dense"
              label="Mã bảo mật"
              margin="normal"
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div class="radio-check">
                <input
                  type="radio"
                  name="status"
                  value={false}
                  onChange={this.handleChange}
                />{" "}
                Đang cần team
                <input
                  type="radio"
                  name="status"
                  value={true}
                  onChange={this.handleChange}
                />{" "}
                Đã có team
              </div>
            </div>
            <ButtonGroup>
              <Button
                color="primary"
                variant="contained"
                style={{ marginTop: 10 }}
                type="submit"
              >
                Gửi
              </Button>
              <Button
                color="primary"
                variant="outlined"
                style={{ marginTop: 10 }}
                onClick={this.handleDelete}
              >
                Xóa tài khoản
              </Button>
            </ButtonGroup>
          </form>
        )}
      </div>
    );
  }
}

export default Edit;
