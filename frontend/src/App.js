import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import data from "./champion.json";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Application:
// Tạo 1 app to-do list, cho phép nhập, xóa nhiệm vụ, đăng nhập tài khoản.

export default function App() {
  const [champion, setChampion] = useState("Hello");
  useEffect(() => {
    console.log("Hello");
  }, []);
  const handleChange = event => {
    // setChampion(data.data[`${event.target.value}`]);
    let result = data.data[`${event.target.value}`];
    if (result === undefined) {
      console.log("Waiting...");
    } else {
      setChampion(result.title);
    }
  };

  // Tìm tên tướng => id => request champion=id

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://acs-garena.leagueoflegends.com/v1/players?name=Lulu%20C%C3%B4%20%C4%90%C6%A1n&region=VN`
      )
      .then(response => {
        // => accountId
        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://acs-garena.leagueoflegends.com/v1/stats/player_history/VN/${
            response.data.accountId
          }?begIndex=0&endIndex=5&champion=117`
        );
      })
      .then(res => {
        // let assists = res.data.games.games.map(item =>{
        //   return item.participants[0].stats.assists
        // });
        // data chung
        let data = res.data.games.games;
        // Lấy tổng assist
        let assistPerGame = data.map(item => {
          return item.participants[0].stats.assists;
        });
        let totalAssists = assistPerGame.reduce((total, num) => {
          return total + num;
        });
        console.log(`Số hỗ trợ mỗi game: ${assistPerGame}`);
        console.log(`Tổng lượng assist: ${totalAssists}`);
      });
    console.log("Loading...");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your champion"
          onChange={handleChange}
        />
      </form>

      {champion}
    </div>
  );
}
