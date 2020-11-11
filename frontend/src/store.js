import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { areaListReducer } from './reducers/areaReducers';
import { courseListReducer } from './reducers/courseReducers';
import { departmentListReducer } from './reducers/departmentReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import {
  employeeLoginReducer,
  employeeRegisterReducer,
  employeeDetailsReducer,
  employeeUpdateProfileReducer,
  employeeListReducer,
  employeeDeleteReducer,
  employeeUpdateReducer,
} from './reducers/employeeReducers';
import {
  studentLoginReducer,
  studentRegisterReducer,
  studentDetailsReducer,
  studentUpdateProfileReducer,
  studentListReducer,
  studentDeleteReducer,
  studentUpdateReducer,
} from './reducers/studentReducers';
import {
  covidCreateReducer,
  covidDetailsReducer,
  covidUpdateProfileReducer,
  covidListReducer,
  covidDeleteReducer,
  covidUpdateReducer,
} from './reducers/covidReducers';

const reducer = combineReducers({
  areaList: areaListReducer,
  courseList: courseListReducer,
  departmentList: departmentListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  employeeLogin: employeeLoginReducer,
  employeeRegister: employeeRegisterReducer,
  employeeDetails: employeeDetailsReducer,
  employeeUpdateProfile: employeeUpdateProfileReducer,
  employeeList: employeeListReducer,
  employeeDelete: employeeDeleteReducer,
  employeeUpdate: employeeUpdateReducer,
  studentLogin: studentLoginReducer,
  studentRegister: studentRegisterReducer,
  studentDetails: studentDetailsReducer,
  studentUpdateProfile: studentUpdateProfileReducer,
  studentList: studentListReducer,
  studentDelete: studentDeleteReducer,
  studentUpdate: studentUpdateReducer,
  covidCreate: covidCreateReducer,
  covidDetails: covidDetailsReducer,
  covidUpdateProfile: covidUpdateProfileReducer,
  covidList: covidListReducer,
  covidDelete: covidDeleteReducer,
  covidUpdate: covidUpdateReducer,
});
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const employeeInfoFromStorage = localStorage.getItem('employeeInfo')
  ? JSON.parse(localStorage.getItem('employeeInfo'))
  : null;
const studentInfoFromStorage = localStorage.getItem('studentInfo')
  ? JSON.parse(localStorage.getItem('studentInfo'))
  : null;
const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
  employeeLogin: {
    employeeInfo: employeeInfoFromStorage,
  },
  studentLogin: {
    studentInfo: studentInfoFromStorage,
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
