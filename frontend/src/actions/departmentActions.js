import axios from 'axios';
import {
  DEPARTMENT_LIST_REQUEST,
  DEPARTMENT_LIST_SUCCESS,
  DEPARTMENT_LIST_FAIL,
} from '../constants/departmentConstants';

export const listDepartments = (keyword = '') => async (dispatch) => {
  try {
    dispatch({ type: DEPARTMENT_LIST_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(`/api/departments`, config);
    dispatch({
      type: DEPARTMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DEPARTMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
