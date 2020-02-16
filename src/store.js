import { createStore } from "redux";

//Action types
export const EMPLOYEES_LOADED = "EMPLOYEES_LOADED";
export const EMPLOYEE_ADDED = "EMPLOYEE_ADDED";
export const EMPLOYEE_DELETED = "EMPLOYEE_DELETED";
export const EMPLOYEE_UPDATED = "EMPLOYEE_UPDATED";
export const EMPLOYEE_SELECTED = "EMPLOYEE_SELECTED";

//Reducer
const initialState = {
  employees: [],
  employee: {},
  idEmployee: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case EMPLOYEES_LOADED: {
      return { employees: action.payload.employees };
    }

    case EMPLOYEE_ADDED: {
      return {
        ...state,
        employees: [action.payload.employee, ...state.employees]
      };
    }

    case EMPLOYEE_DELETED: {
      return {
        ...state,
        employees: [
          ...state.employees.filter(
            employee => employee.id !== action.payload.idEmployee
          )
        ]
      };
    }

    case EMPLOYEE_SELECTED: {
      return {
        ...state,
        employees: [
          ...state.employees.filter(
            employee => employee.id === action.payload.idEmployee
          )
        ]
      };
    }

    default: {
      return state;
    }
  }
};

const devtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

//Store

const store = createStore(reducer, initialState, devtools);

export default store;
