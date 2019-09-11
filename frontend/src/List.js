import React, { Component } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import CardBox from "./Card";

class List extends Component {
  state = {
    counts: null,
    data: []
  };
  componentDidMount() {
    axios
      .get("https://esc-finder.herokuapp.com/finder")
      .then(res => {
        this.setState({ counts: res.data.counts, data: res.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="list-content">
        <Typography variant="h6">
          Danh sách người chơi đang tìm đội đánh giải ({this.state.counts} kết
          quả)
        </Typography>
        <div style={{ display: "flex" }}>
          {this.state.data.map(item => {
            return <CardBox data={item} />;
          })}
        </div>
      </div>
    );
  }
}

export default List;
