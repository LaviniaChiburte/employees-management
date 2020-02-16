import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

import { EMPLOYEES_LOADED } from "../store";
import { EMPLOYEE_ADDED } from "../store";
import { EMPLOYEE_DELETED } from "../store";

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
    right: theme.spacing(3),
    color: "#050505",
    backgroundColor: "#F0B49E"
  }
}));

export default function EmployeesTable() {
  const dispatch = useDispatch();

  const employees = useSelector(state => state.employees);

  const [employee_name, setName] = useState("");
  const [employee_age, setAge] = useState("");
  const [employee_salary, setSalary] = useState("");

  const [currentlyEditingRow, setCurrentlyEditingRow] = useState(0);
  const [editing, setEditing] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const classes = useStyles();

  useEffect(() => {
    axios
      .get("http://dummy.restapiexample.com/api/v1/employees")
      .then(res => {
        dispatch({
          type: EMPLOYEES_LOADED,
          payload: { employees: res.data.data }
        });
      })
      .catch(err => console.log(err));
  }, [dispatch]);

  const rows = employees.map(function(employee) {
    return {
      id: employee.id,
      name: employee.employee_name,
      age: employee.employee_age,
      salary: employee.employee_salary
    };
  });

  const handleSubmit = e => {
    e.preventDefault();
    console.log({ employee_name, employee_age, employee_salary });
    const newData = {
      name: employee_name,
      salary: employee_salary,
      age: employee_age
    };
    axios
      .post("http://dummy.restapiexample.com/api/v1/create", newData)
      .then(() => {
        dispatch({
          type: EMPLOYEE_ADDED,
          payload: {
            employee: { employee_name, employee_age, employee_salary }
          }
        });
      })
      .catch(console.log);
  };

  const handleRowDelete = id => {
    console.log(id);
    axios
      .delete(`http://dummy.restapiexample.com/api/v1/delete/${id}`)
      .then(() =>
        dispatch({
          type: EMPLOYEE_DELETED,
          payload: {
            idEmployee: id
          }
        })
      )
      .catch(console.log);
  };

  const handleRowEdit = id => {
    setCurrentlyEditingRow(id);
  };

  const handleCancelRowEdit = () => {
    setEditing(!editing);
  };

  const handleSaveRowEdit = e => {
    e.preventDefault();
    axios
      .put(`http://dummy.restapiexample.com/api/v1/update/id`)
      .then(setEditing(!editing))
      .catch(console.log);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const renderRow = (row, id) => {
    return (
      <TableRow key={id} index={id} hover role="checkbox" tabIndex={-1}>
        {row.id === currentlyEditingRow && editing ? (
          <>
            <TableCell align="left">
              <Tooltip title="Cancel">
                <IconButton aria-label="cancel" onClick={handleCancelRowEdit}>
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
            <TableCell align="left">
              <Tooltip title="Save">
                <IconButton
                  aria-label="save"
                  onClick={e => handleSaveRowEdit(e)}
                  type="submit"
                >
                  <CheckIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          </>
        ) : (
          <>
            <TableCell align="left">
              <Tooltip title="Delete">
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRowDelete(row.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
            <TableCell align="left">
              <Tooltip title="Edit">
                <IconButton
                  aria-label="edit"
                  onClick={() => handleRowEdit(row.id)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          </>
        )}
        {row.id === currentlyEditingRow && editing ? (
          <>
            <TableCell align="left">
              <TextField
                align="left"
                value={row.name}
                onChange={() => console.log(row.name)}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                align="right"
                value={row.age}
                onChange={() => console.log(row.age)}
              />
            </TableCell>
            <TableCell align="right">
              {" "}
              <TextField
                align="right"
                value={row.salary}
                onChange={() => console.log(row.salary)}
              />
            </TableCell>
          </>
        ) : (
          <>
            <TableCell align="left">{row.name}</TableCell>

            <TableCell align="right">{row.age}</TableCell>
            <TableCell align="right">{row.salary}</TableCell>
          </>
        )}
      </TableRow>
    );
  };

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          id="employee_name"
          name="employee_name"
          placeholder="name"
          value={employees.employee_name}
          onChange={e => setName(e.target.value)}
        />

        <TextField
          id="employee_age"
          name="employee_age"
          placeholder="age"
          value={employees.employee_age}
          onChange={e => setAge(e.target.value)}
        />

        <TextField
          id="employee_salary"
          name="employee_salary"
          placeholder="salary"
          value={employees.employee_salary}
          onChange={e => setSalary(e.target.value)}
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
              .map(renderRow)}
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
