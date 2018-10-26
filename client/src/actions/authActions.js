import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
//Redux Thunk allows us to pass in dispatch, and call it on the our async axios call
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/auth/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//LOGIN GET USER TOKEN

export const loginUser = userData => dispatch => {
  axios
    .post('/api/auth/login', userData)
    .then(res => {
      //save to local storage
      const { token } = res.data;
      // set token to localStorage
      localStorage.setItem('jwtToken', token);
      // set token to authHeader
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set Current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Log User out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  //remove Auth header from other future request
  setAuthToken(false);
  //Set current user to {} that set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
