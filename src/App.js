import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import NavBar from "./components/NavBar";
import EmployeesList from "./components/EmployeesList";
// import EmployeesTableClassic from "./components/EmployeesTable";
import Home from "./components/Home";

import EmployeesTableRedux from "./components/EmployeesTableRedux";

// import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Route path="/home-employees">
        <Home />
      </Route>
      <Switch>
        <Route path="/employees">
          <EmployeesList />
        </Route>

        {/* <Route path="/managing">
          <EmployeesTableClassic />
        </Route> */}

        <Route to="/managing-redux">
          <EmployeesTableRedux />
        </Route>

        <Redirect to="/home-employees" />
      </Switch>
    </Router>
  );
}

export default App;
