import axios from 'axios';
import {
  AREA_LIST_REQUEST,
  AREA_LIST_SUCCESS,
  AREA_LIST_FAIL,
} from '../constants/areaConstants';

export const listAreas = (municipality = '') => async (dispatch) => {
  try {
    dispatch({ type: AREA_LIST_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(
      `/api/areas/?municipality=${municipality}`,
      config
    );
    dispatch({
      type: AREA_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AREA_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
