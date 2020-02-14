import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    overflow: "hidden"
  },
  form: {
    margin: "2vh",
    padding: "1vw",
    textDecoration: "none"
  },
  container: {
    maxHeight: 440,
    marginTop: 10
  },
  tableHeadCell: {
    backgroundColor: "#B38184",
    fontWeight: "bold"
  },
  absolute: {
    position: "absolute",
    // bottom: theme.spacing(2),
    right: theme.spacing(3),
    color: "#050505",
    backgroundColor: "#F0B49E"
  }
}));

/*

- state of all employees
- render iteration of all employees (pagination)
- on delete click remove an employee
- on edit click edit an employee (replace an employee)

*/

export default function EmployeesTable() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const classes = useStyles();

  useEffect(() => {
    axios
      .get("http://dummy.restapiexample.com/api/v1/employees")
      .then(res => {
        // console.log(res);
        setEmployees(res.data.data);
        console.log(res.data.data);
      })
      .catch(err => console.log(err));
  }, []);

  const rows = Array.from(
    employees.map(function(employee) {
      return {
        id: employee.id,
        name: employee.employee_name,
        age: employee.employee_age,
        salary: employee.employee_salary
      };
    })
  );

  console.log(rows);

  const addEmployee = employee => {
    employee.preventDefault();
    employee = {
      employee_name: employee.name,
      employee_age: employee.age,
      employee_salary: employee.salary
    };
    console.log(employee);
    axios
      .post("http://dummy.restapiexample.com/api/v1/create", { employee })
      .then(setEmployees([employee, ...employees]))
      .then(res => console.log(res.data));
  };

  const onChange = e => {
    [e.target.name] = e.target.value;
  };

  const onDeleteRow = id => {
    axios
      .delete("http://dummy.restapiexample.com/api/v1/delete/{id}")
      .then(setEmployees(employees.filter(employee => employee.id !== id)))
      .then(res => console.log(res.data));
  };

  const onEditeRow = (id, e) => {
    console.log(id);
    const employee = {
      name: employees.employee_name,
      age: employees.employee_age,
      salary: employees.employee_salary
    };
    axios
      .put(
        "http://dummy.restapiexample.com/api/v1/update/{this.state.id}",
        employee
      )
      .then(res => console.log(res.data));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <form onSubmit={addEmployee} className={classes.form}>
        <TextField
          id="employee_name"
          title="employee_name"
          placeholder="name"
          value={employees.employee_name}
          onChange={onChange}
        />

        <TextField
          id="employee_age"
          title="employee_age"
          placeholder="age"
          value={employees.employee_age}
          onChange={onChange}
        />

        <TextField
          id="employee_salary"
          title="employee_salary"
          placeholder="salary"
          value={employees.employee_salary}
          onChange={onChange}
        />

        <Tooltip title="Add Employee" aria-label="add">
          <Fab
            size="small"
            color="secondary"
            className={classes.absolute}
            type="submit"
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </form>

      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" className={classes.tableHeadCell}>
                Delete
              </TableCell>
              <TableCell align="left" className={classes.tableHeadCell}>
                Edit
              </TableCell>
              <TableCell align="left" className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell align="right" className={classes.tableHeadCell}>
                Age
              </TableCell>
              <TableCell align="right" className={classes.tableHeadCell}>
                Salary
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, id) => {
                {
                  /* 
                if (row.id === currentlyEditingRow) {
                  return; */
                }

                return (
                  <TableRow
                    key={id}
                    index={id}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    <TableCell align="left">
                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="delete"
                          onClick={() => onDeleteRow(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left">
                      <Tooltip title="Edit">
                        <IconButton
                          aria-label="edit"
                          onClick={() => onEditeRow(row.id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="right">{row.age}</TableCell>
                    <TableCell align="right">{row.salary}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
