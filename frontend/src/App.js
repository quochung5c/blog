import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import data from "./champion.json";
import Typography from "@material-ui/core/Typography";
// Application:
// Tạo 1 app to-do list, cho phép nhập, xóa nhiệm vụ, đăng nhập tài khoản.

export default function App() {
  const [champion, setChampion] = useState(0);
  useEffect(() => {
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
        setChampion(totalAssists);
      });
    console.log("Loading...");
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

  return (
    <div>
      {champion === 0 ? (
        <h4>Loading...</h4>
      ) : (
        <div>
          <Typography variant="h6">Hoàn thành 100 assist với Lulu</Typography>
          Hiện tại: <progress max="100" value={champion} /> - {champion} hỗ trợ
        </div>
      )}
    </div>
  );
}
