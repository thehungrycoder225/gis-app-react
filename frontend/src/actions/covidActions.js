import {
  COVID_DETAILS_FAIL,
  COVID_DETAILS_REQUEST,
  COVID_DETAILS_SUCCESS,
  COVID_DELETE_FAIL,
  COVID_DELETE_REQUEST,
  COVID_DELETE_SUCCESS,
  COVID_REGISTER_FAIL,
  COVID_REGISTER_REQUEST,
  COVID_REGISTER_SUCCESS,
  COVID_UPDATE_PROFILE_FAIL,
  COVID_UPDATE_PROFILE_REQUEST,
  COVID_UPDATE_PROFILE_SUCCESS,
  COVID_LIST_SUCCESS,
  COVID_LIST_REQUEST,
  COVID_LIST_FAIL,
  COVID_LIST_RESET,
  COVID_UPDATE_REQUEST,
  COVID_UPDATE_SUCCESS,
  COVID_UPDATE_FAIL,
} from '../constants/covidConstants';

import axios from 'axios';
export const register = (
  caseId,
  age,
  gender,
  municipality,
  barangay,
  address,
  status
) => async (dispatch) => {
  try {
    dispatch({
      type: COVID_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/covid',
      {
        caseId,
        age,
        gender,
        municipality,
        barangay,
        address,
        status,
      },
      config
    );

    dispatch({
      type: COVID_REGISTER_SUCCESS,
      payload: data,
    });

    localStorage.setItem('covidInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: COVID_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCases = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COVID_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/covid`, config);
    dispatch({
      type: COVID_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COVID_LIST_FAIL,
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
      type: COVID_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/covid/${id}`, config);
    dispatch({ type: COVID_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: COVID_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCase = (covid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COVID_UPDATE_REQUEST,
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
      `/api/employees/${covid._id}`,
      covid,
      config
    );
    dispatch({ type: COVID_UPDATE_SUCCESS });
    dispatch({ type: COVID_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COVID_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
