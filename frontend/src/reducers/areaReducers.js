import {
  AREA_LIST_REQUEST,
  AREA_LIST_SUCCESS,
  AREA_LIST_FAIL,
} from '../constants/areaConstants';

export const areaListReducer = (state = { areas: [] }, action) => {
  switch (action.type) {
    case AREA_LIST_REQUEST:
      return { loading: true, areas: [] };
    case AREA_LIST_SUCCESS:
      return { loading: false, areas: action.payload };
    case AREA_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
