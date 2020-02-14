import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://dummy.restapiexample.com/api/v1/employees")
      .then(res => {
        console.log(res);
        setEmployees(res.data.data);
      })
      .catch(err => console.log(err));
  }, []);

  const showEmployee = id => {
    axios
      .get("http://dummy.restapiexample.com/api/v1/delete/{id}")
      .then(setEmployees(employees.filter(employee => employee.id === id)));
  };

  function renderEmployee(employee) {
    return (
      <Grid item xs={6} md={4} key={employee.id}>
        <Card>
          <Link
            to={`/employees/${employee.id}`}
            style={{ textDecoration: "none", color: "#050505" }}
            onClick={() => showEmployee(employee.id)}
          >
            <Avatar src={employee.profile_image} />
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {employee.employee_name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Age: {employee.employee_age}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
        </Card>
      </Grid>
    );
  }

  return (
    <div>
      <Container maxWidth="md" style={{ marginTop: 16 }}>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Grid container spacing={2}>
              {employees.map(renderEmployee)}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
