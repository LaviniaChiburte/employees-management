import React from "react";
import image from "./work-1.png";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paperContainer: {
    background: `url(${image})`,
    backgroundSize: "cover",
    overflow: "hidden",
    width: "100vw",
    height: "90vh",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundColor: "#000000",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1
  },
  pageButton: {
    backgroundColor: "#413E4A",
    margin: theme.spacing(1),
    position: "relative",
    zIndex: 2
  }
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Paper className={classes.paperContainer}>
      <Button
        variant="contained"
        size="large"
        color="secondary"
        className={classes.pageButton}
        component={Link}
        to="/employees"
      >
        Employees List
      </Button>
      <Button
        variant="contained"
        size="large"
        color="secondary"
        className={classes.pageButton}
        component={Link}
        to="/managing-redux"
      >
        Manage Team
      </Button>
    </Paper>
  );
}
