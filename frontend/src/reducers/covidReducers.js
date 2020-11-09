import {
  COVID_CREATE_REQUEST,
  COVID_CREATE_SUCCESS,
  COVID_CREATE_FAIL,
  COVID_CREATE_RESET,
  COVID_DETAILS_REQUEST,
  COVID_DETAILS_SUCCESS,
  COVID_DETAILS_FAIL,
  COVID_UPDATE_PROFILE_SUCCESS,
  COVID_UPDATE_PROFILE_REQUEST,
  COVID_UPDATE_PROFILE_FAIL,
  COVID_LIST_SUCCESS,
  COVID_LIST_REQUEST,
  COVID_LIST_FAIL,
  COVID_LIST_RESET,
  COVID_DELETE_SUCCESS,
  COVID_DELETE_REQUEST,
  COVID_DELETE_FAIL,
  COVID_UPDATE_REQUEST,
  COVID_UPDATE_SUCCESS,
  COVID_UPDATE_FAIL,
  COVID_UPDATE_RESET,
} from '../constants/covidConstants';

export const covidCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COVID_CREATE_REQUEST:
      return { loading: true };
    case COVID_CREATE_SUCCESS:
      return { loading: false, success: true, covidInfo: action.payload };
    case COVID_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case COVID_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const covidDetailsReducer = (state = { record: {} }, action) => {
  switch (action.type) {
    case COVID_DETAILS_REQUEST:
      return { ...state, loading: true };
    case COVID_DETAILS_SUCCESS:
      return { loading: false, record: action.payload };
    case COVID_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const covidUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case COVID_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case COVID_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, caseInfo: action.payload };
    case COVID_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const covidListReducer = (state = { cases: [] }, action) => {
  switch (action.type) {
    case COVID_LIST_REQUEST:
      return { loading: true };
    case COVID_LIST_SUCCESS:
      return { loading: false, cases: action.payload };
    case COVID_LIST_FAIL:
      return { loading: false, error: action.payload };
    case COVID_LIST_RESET:
      return { cases: [] };
    default:
      return state;
  }
};

export const covidDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COVID_DELETE_REQUEST:
      return { loading: true };
    case COVID_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COVID_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const covidUpdateReducer = (state = { record: {} }, action) => {
  switch (action.type) {
    case COVID_UPDATE_REQUEST:
      return { loading: true };
    case COVID_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case COVID_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case COVID_UPDATE_RESET:
      return { record: {} };
    default:
      return state;
  }
};
