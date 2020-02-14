import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import NavBar from "./components/NavBar";
// import Employee from "./components/Employee";
import EmployeeList from "./components/EmployeeList";
import EmployeeTable from "./components/EmployeeTable";

import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        {/* <EmployeesList /> */}
        <Route path="/employees">
          <EmployeeList />
        </Route>
        <Route path="/managing">
          <EmployeeTable />
        </Route>
        <Redirect to="/employees" />
      </Switch>
    </Router>
  );
}

export default App;
