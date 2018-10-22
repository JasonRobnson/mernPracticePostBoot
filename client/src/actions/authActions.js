import axios from 'axios';
import { GET_ERRORS } from './types';

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
