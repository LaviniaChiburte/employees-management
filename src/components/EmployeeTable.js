import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";

export default function MaterialTableDemo() {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios
      .get("http://dummy.restapiexample.com/api/v1/employees")
      .then(res => {
        console.log(res);
        setEmployee(res.data.data);
      })
      .catch(err => console.log(err));
  }, []);

  const dataEmployee = employee.map(function(employee) {
    return {
      name: employee.employee_name,
      age: employee.employee_age,
      salary: employee.employee_salary
    };
  });

  console.log(dataEmployee);

  function addEmployee(name, age, salary) {
    return axios
      .post("http://dummy.restapiexample.com/api/v1/create", {
        name,
        age,
        salary
      })

      .then(res => {
        setEmployee({ employee: [res.data.data, ...employee] });
        console.log(res);
      });
  }

  return (
    <MaterialTable
      title="Managing Employees"
      options={{
        searchFieldStyle: { backgroundColor: "#73626E" }
      }}
      columns={[
        { title: "Name", field: "name" },
        { title: "Age", field: "age" },
        { title: "Salary", field: "salary" }
      ]}
      data={dataEmployee}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setEmployee(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setEmployee(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setEmployee(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          })
      }}
    />
  );
}
