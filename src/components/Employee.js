import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "space-between"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));

const Employee = employee => {
  const classes = useStyles();

  const { employee_name, profile_image } = employee;

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <Typography className={classes.content}>
          <Typography component="h5" variant="h5"></Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.details}
          >
            <div className={classes.root}>
              {employee_name}

              <Avatar src={profile_image} alt="Remy Sharp" />
            </div>
          </Typography>
        </Typography>
      </div>
    </Card>
  );
};

export default Employee;
