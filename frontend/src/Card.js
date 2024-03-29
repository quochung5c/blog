import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    margin: 10,
    "&:hover": {
      backgroundColor: "#edfffb",
      cursor: "pointer"
    }
  }
});

export default function CardBox({ data }) {
  const classes = useStyles();
  const handleClick = (uid) => {
    console.log(uid)
  }
  return (
    <Card className={classes.card} key={data._id}>
      <CardContent>
        <Typography variant="h6">{data.ingame}</Typography>
        <Typography variant="subtitle1">Vị trí: {data.role}</Typography>
        <Typography variant="subtitle1">Rank: {data.rank}</Typography>
        <Typography variant="subtitle1">Trường: {data.school}</Typography>
        <Typography variant="subtitle1">
          Số điện thoại: {data.phoneNumber}
        </Typography>
        <Typography variant="subtitle1">
          Tình trạng:{" "}
          <b style={{ color: data.status === "true" ? "blue" : "red" }}>
            {data.status === "true" ? "Đã có team" : "Đang cần team"}
          </b>
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" href={data.facebook}>
          Liên hệ
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClick(data.uid)}>
          Lịch sử đấu
        </Button>
      </CardActions>
    </Card>
  );
}
