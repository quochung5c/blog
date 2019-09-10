import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 380,
    margin: 10,
    "&:hover": {
      backgroundColor: "#edfffb",
      cursor: "pointer"
    }
  }
});

export default function CardBox({ data }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6">{data.ingame}</Typography>
        <Typography variant="subtitle1">Vị trí: {data.role}</Typography>
        <Typography variant="subtitle1">Rank: {data.rank}</Typography>
        <Typography variant="subtitle1">
          Số điện thoại: {data.phoneNumber}
        </Typography>
        <Typography variant="subtitle1">Facebook: {data.facebook}</Typography>
        <Typography variant="subtitle1">
          Tình trạng: {data.status === true ? "Đã có team" : "Đang cần team"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined">Mời</Button>
        <Button variant="outlined" color="secondary">Lịch sử đấu</Button>

      </CardActions>
    </Card>
  );
}
