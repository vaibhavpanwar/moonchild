import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {API_URL, ADMIN_LOGIN} from '../../constants/api';
import axios from 'axios';
import {authTypes} from '../reducers/auth';
import {errorParser} from './errorParser';
import {login} from '../../services/auth';
import {useHistory} from 'react-router-dom';
const logingIn = () => {
  return {
    type: authTypes.LOGIN,
    logingIn: true,
    loggedIn: false,
    loggedInError: null,
  };
};

export const loggedInSuccess = (payload) => {
  return {
    type: authTypes.LOGIN_SUCCESS,
    logingIn: false,
    loggedIn: true,
    loggedInError: null,
    isAuthenticated: true,
    token: payload.token,
    name: payload.name,
    image: payload.image,
    userType: payload.userType,
  };
};

const loggedInFailed = (payload) => {
  return {
    type: authTypes.LOGIN_FAILED,
    logingIn: false,
    loggedIn: false,
    loggedInError: payload,
  };
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const logingInUser = async (data) => {
    dispatch(logingIn());
    setLoading(true);
    axios
      .post(`${API_URL}${ADMIN_LOGIN}`, data)
      .then((response) => {
        dispatch(loggedInSuccess(response.data.data));
        axios.defaults.headers.common['authorization'] =
          response.data.data.token;
        login(response.data.data);
        setLoading(false);
        history.push(`/admin/dashboard`);
      })
      .catch(async (error) => {
        let parsedError = await errorParser(error);
        dispatch(loggedInFailed(parsedError));
        setLoading(false);
      });
  };
  return {logingInUser, loading};
};
