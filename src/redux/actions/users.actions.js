import {API, headerSetup} from '../../services/auth';
import {errorAlert, successAlert, warningAlert} from '../../utils/alerts';
import {usersConstants} from '../constants';
import {errorParser} from './errorParser';

export const listUsers =
  (perPage = 4, page = 1, search = '') =>
  async (dispatch) => {
    await headerSetup();
    dispatch({type: usersConstants.USER_LOADING});

    try {
      const {
        data: {data},
      } = await API.get(
        `admin/v1/userListing?perPage=${perPage}&page=${page}&search=${search}`,
      );

      if (data) {
        dispatch({
          type: usersConstants.USER_LIST_SUCCESS,
          payload: {listing: data?.listing, count: data?.count},
        });
      }
    } catch (err) {
      const parsedError = await errorParser(err);
      dispatch({
        type: usersConstants.USER_ERROR,
        payload: parsedError,
      });
    }
  };

export const getSingleBanner = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: usersConstants.USER_LOADING});

  try {
    const {
      data: {data},
    } = await API.get(`admin/v1/user/${id}`);

    if (data) {
      dispatch({
        type: usersConstants.USER_GET_SINGLE_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {
    const parsedError = await errorParser(err);
    dispatch({
      type: usersConstants.USER_ERROR,
      payload: parsedError,
    });
  }
};

export const addUser = (formData, history) => async (dispatch) => {
  await headerSetup();
  dispatch({type: usersConstants.USER_LOADING});

  try {
    const {
      data: {data},
    } = await API.post('admin/v1/addUser', formData);

    if (data) {
      dispatch({
        type: usersConstants.USER_ADD_SUCCESS,
        payload: data,
      });
      successAlert(`User ${formData?.name} added successfullt`);
      history.push('/admin/users');
    }
  } catch (err) {
    const parsedError = await errorParser(err);
    console.log(err, 'error');

    dispatch({
      type: usersConstants.USER_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};

export const editUser = (formData, history) => async (dispatch) => {
  await headerSetup();
  dispatch({type: usersConstants.USER_LOADING});

  try {
    const {
      data: {data},
    } = await API.put('admin/v1/editUser', formData);

    if (data) {
      dispatch({
        type: usersConstants.USER_EDIT_SUCCESS,
        payload: data?.data,
      });
      successAlert(`${formData?.name} updated successfully`);

      history.push('/admin/banners');
      dispatch({
        type: usersConstants.USER_RESET_SINGLE,
      });
    }
  } catch (err) {
    const parsedError = await errorParser(err);
    console.log(parsedError, err, 'error');
    dispatch({
      type: usersConstants.USER_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: usersConstants.USER_LOADING});

  try {
    await API.delete(`admin/v1/deleteUser/${id}`);

    dispatch({
      type: usersConstants.USER_DELETE_SUCCESS,
      payload: id,
    });
    warningAlert(`user ${id} removed`);
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: usersConstants.USER_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};
