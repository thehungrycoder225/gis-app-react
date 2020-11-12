import {
  COVID_DETAILS_FAIL,
  COVID_DETAILS_REQUEST,
  COVID_DETAILS_SUCCESS,
  COVID_DELETE_FAIL,
  COVID_DELETE_REQUEST,
  COVID_DELETE_SUCCESS,
  COVID_CREATE_FAIL,
  COVID_CREATE_REQUEST,
  COVID_CREATE_SUCCESS,
  COVID_LIST_SUCCESS,
  COVID_LIST_REQUEST,
  COVID_LIST_FAIL,
  COVID_UPDATE_REQUEST,
  COVID_UPDATE_SUCCESS,
  COVID_UPDATE_FAIL,
} from '../constants/covidConstants';

import axios from 'axios';
export const createCase = (
  caseId,
  age,
  gender,
  street,
  municipality,
  barangay,
  address,
  status
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COVID_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      '/api/covid',
      { caseId, age, gender, street, municipality, barangay, address, status },
      config
    );

    dispatch({
      type: COVID_CREATE_SUCCESS,
      payload: data,
    });

    localStorage.setItem('covidInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: COVID_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCaseDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COVID_DETAILS_REQUEST,
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
    const { data } = await axios.get(`/api/covid/${id}`, config);
    dispatch({
      type: COVID_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COVID_DETAILS_FAIL,
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
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json ',
        'Access-Control-Origin': '*',
        'Access-Control-Allow-Methods': '*',
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

export const deleteCase = (id) => async (dispatch, getState) => {
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
    const { data } = await axios.put(`/api/covid/${covid._id}`, covid, config);
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
