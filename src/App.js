import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import NavBar from "./components/NavBar";
// import Employee from "./components/Employee";
import EmployeesList from "./components/EmployeesList";
import EmployeeTable from "./components/EmployeeTable";
import EmployeesTable from "./components/EmployeesTable";
import Home from "./components/Home";

// import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Route path="/home">
        <Home />
      </Route>
      <Switch>
        <Route path="/employees">
          <EmployeesList />
        </Route>
        <Route path="/table">
          <EmployeeTable />
        </Route>
        <Route path="/managing">
          <EmployeesTable />
        </Route>
        <Redirect to="/home" />
      </Switch>
    </Router>
  );
}

export default App;
