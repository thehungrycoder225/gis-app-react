import {
  EMPLOYEE_DETAILS_FAIL,
  EMPLOYEE_DETAILS_REQUEST,
  EMPLOYEE_DETAILS_SUCCESS,
  EMPLOYEE_DELETE_FAIL,
  EMPLOYEE_DELETE_REQUEST,
  EMPLOYEE_DELETE_SUCCESS,
  EMPLOYEE_LOGIN_FAIL,
  EMPLOYEE_LOGIN_REQUEST,
  EMPLOYEE_LOGIN_SUCCESS,
  EMPLOYEE_LOGOUT,
  EMPLOYEE_REGISTER_FAIL,
  EMPLOYEE_REGISTER_REQUEST,
  EMPLOYEE_REGISTER_SUCCESS,
  EMPLOYEE_REGISTER_RESET,
  EMPLOYEE_UPDATE_PROFILE_FAIL,
  EMPLOYEE_UPDATE_PROFILE_REQUEST,
  EMPLOYEE_UPDATE_PROFILE_SUCCESS,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_FAIL,
  EMPLOYEE_UPDATE_REQUEST,
  EMPLOYEE_UPDATE_SUCCESS,
  EMPLOYEE_UPDATE_FAIL,
} from '../constants/employeeConstants';

import axios from 'axios';
export const eLogin = (empId) => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/employees/login', {
      empId,
      config,
    });

    dispatch({
      type: EMPLOYEE_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('employeeInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: EMPLOYEE_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const elogout = () => (dispatch) => {
  localStorage.removeItem('employeeInfo');
  dispatch({ type: EMPLOYEE_LOGOUT });
};

export const register =
  (
    empId,
    name,
    age,
    gender,
    department,
    street,
    municipality,
    barangay,
    address,
    phone,
    landline
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EMPLOYEE_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/employees',
        {
          empId,
          name,
          age,
          gender,
          department,
          street,
          municipality,
          barangay,
          address,
          phone,
          landline,
        },
        config
      );

      dispatch({
        type: EMPLOYEE_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: EMPLOYEE_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem('employeeInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: EMPLOYEE_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getEmployeeDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPLOYEE_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/employees/${id}`, config);
    dispatch({
      type: EMPLOYEE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProfileDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPLOYEE_DETAILS_REQUEST,
    });
    const {
      employeeLogin: { employeeInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${employeeInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/employees/${id}`, config);
    dispatch({
      type: EMPLOYEE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateEmployeeProfile =
  (employee) => async (dispatch, getState) => {
    try {
      dispatch({
        type: EMPLOYEE_UPDATE_PROFILE_REQUEST,
      });
      const {
        employeeLogin: { employeeInfo },
      } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${employeeInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/employees/profile`,
        employee,
        config
      );
      dispatch({
        type: EMPLOYEE_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EMPLOYEE_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listEmployees = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPLOYEE_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/employees`, config);
    dispatch({
      type: EMPLOYEE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteEmployee = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPLOYEE_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/employees/${id}`, config);
    dispatch({ type: EMPLOYEE_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateEmployee = (employee) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPLOYEE_UPDATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/employees/${employee._id}`,
      employee,
      config
    );
    dispatch({ type: EMPLOYEE_UPDATE_SUCCESS });
    dispatch({ type: EMPLOYEE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
