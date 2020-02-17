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
      <Route exact path="/home-employees" component={Home} />

      <Switch>
        <Route exact path="/employees" component={EmployeesList} />

        {/* <Route path="/managing" component={EmployeesTableClassic}/> */}

        <Route path="/managing-redux" component={EmployeesTableRedux} />

        <Redirect to="/home-employees" />
      </Switch>
    </Router>
  );
}

export default App;
