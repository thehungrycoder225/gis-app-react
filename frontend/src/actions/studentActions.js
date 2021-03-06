import {
  STUDENT_DETAILS_FAIL,
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
  STUDENT_DELETE_FAIL,
  STUDENT_DELETE_REQUEST,
  STUDENT_DELETE_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STUDENT_LOGIN_REQUEST,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGOUT,
  STUDENT_REGISTER_FAIL,
  STUDENT_REGISTER_REQUEST,
  STUDENT_REGISTER_SUCCESS,
  STUDENT_UPDATE_PROFILE_FAIL,
  STUDENT_UPDATE_PROFILE_REQUEST,
  STUDENT_UPDATE_PROFILE_SUCCESS,
  STUDENT_LIST_SUCCESS,
  STUDENT_LIST_REQUEST,
  STUDENT_LIST_FAIL,
  STUDENT_LIST_RESET,
  STUDENT_UPDATE_REQUEST,
  STUDENT_UPDATE_SUCCESS,
  STUDENT_UPDATE_FAIL,
} from '../constants/studentConstants';

import axios from 'axios';
export const sLogin = (studentId) => async (dispatch) => {
  try {
    dispatch({
      type: STUDENT_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/students/login', {
      studentId,
      config,
    });

    dispatch({
      type: STUDENT_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('studentInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: STUDENT_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const slogout = () => (dispatch) => {
  localStorage.removeItem('studentInfo');
  dispatch({ type: STUDENT_LOGOUT });
  dispatch({ type: STUDENT_LIST_RESET });
};

export const register = (
  studentId,
  name,
  age,
  gender,
  phone,
  landline,
  street,
  municipality,
  barangay,
  school,
  course,
  yearLevel,
  address
) => async (dispatch) => {
  try {
    dispatch({
      type: STUDENT_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/students',
      {
        studentId,
        name,
        age,
        gender,
        phone,
        landline,
        street,
        municipality,
        barangay,
        school,
        course,
        yearLevel,
        address,
      },
      config
    );

    dispatch({
      type: STUDENT_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: STUDENT_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('studentInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: STUDENT_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getStudentDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_DETAILS_REQUEST,
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
    const { data } = await axios.get(`/api/students/${id}`, config);
    dispatch({
      type: STUDENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_DETAILS_FAIL,
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
      type: STUDENT_DETAILS_REQUEST,
    });
    const {
      studentLogin: { studentInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/students/${id}`, config);
    dispatch({
      type: STUDENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStudentProfile = (student) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_UPDATE_PROFILE_REQUEST,
    });
    const {
      studentLogin: { studentLogin },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentLogin.token}`,
      },
    };
    const { data } = await axios.put(`/api/students/profile`, student, config);
    dispatch({
      type: STUDENT_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listStudents = (keyword = '', pageNumber = '') => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: STUDENT_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `/api/students?keyword=${keyword}&pageNumber=${pageNumber}`,
      config
    );
    dispatch({
      type: STUDENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteStudent = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/students/${id}`, config);
    dispatch({ type: STUDENT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: STUDENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStudent = (student) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_UPDATE_REQUEST,
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
      `/api/students/${student._id}`,
      student,
      config
    );
    dispatch({ type: STUDENT_UPDATE_SUCCESS });
    dispatch({ type: STUDENT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STUDENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
