import {
  EMPLOYEE_LOGIN_REQUEST,
  EMPLOYEE_LOGIN_SUCCESS,
  EMPLOYEE_LOGIN_FAIL,
  EMPLOYEE_LOGOUT,
  EMPLOYEE_REGISTER_REQUEST,
  EMPLOYEE_REGISTER_SUCCESS,
  EMPLOYEE_REGISTER_FAIL,
  EMPLOYEE_DETAILS_REQUEST,
  EMPLOYEE_DETAILS_SUCCESS,
  EMPLOYEE_DETAILS_FAIL,
  EMPLOYEE_UPDATE_PROFILE_SUCCESS,
  EMPLOYEE_UPDATE_PROFILE_REQUEST,
  EMPLOYEE_UPDATE_PROFILE_FAIL,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_FAIL,
  EMPLOYEE_LIST_RESET,
  EMPLOYEE_DELETE_SUCCESS,
  EMPLOYEE_DELETE_REQUEST,
  EMPLOYEE_DELETE_FAIL,
  EMPLOYEE_UPDATE_REQUEST,
  EMPLOYEE_UPDATE_SUCCESS,
  EMPLOYEE_UPDATE_FAIL,
  EMPLOYEE_UPDATE_RESET,
  EMPLOYEE_REGISTER_RESET,
} from '../constants/employeeConstants';

export const employeeLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_LOGIN_REQUEST:
      return { loading: true };
    case EMPLOYEE_LOGIN_SUCCESS:
      return { loading: false, employeeInfo: action.payload };
    case EMPLOYEE_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEE_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const employeeRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_REGISTER_REQUEST:
      return { loading: true };
    case EMPLOYEE_REGISTER_SUCCESS:
      return { loading: false, employeeInfo: action.payload };
    case EMPLOYEE_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEE_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const employeeDetailsReducer = (state = { employee: {} }, action) => {
  switch (action.type) {
    case EMPLOYEE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case EMPLOYEE_DETAILS_SUCCESS:
      return { loading: false, employee: action.payload };
    case EMPLOYEE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const employeeUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case EMPLOYEE_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, employeeInfo: action.payload };
    case EMPLOYEE_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const employeeListReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case EMPLOYEE_LIST_REQUEST:
      return { loading: true };
    case EMPLOYEE_LIST_SUCCESS:
      return { loading: false, employees: action.payload };
    case EMPLOYEE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEE_LIST_RESET:
      return { employees: [] };
    default:
      return state;
  }
};

export const employeeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_DELETE_REQUEST:
      return { loading: true };
    case EMPLOYEE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case EMPLOYEE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const employeeUpdateReducer = (state = { employee: {} }, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE_REQUEST:
      return { loading: true };
    case EMPLOYEE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case EMPLOYEE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEE_UPDATE_RESET:
      return { employee: {} };
    default:
      return state;
  }
};
