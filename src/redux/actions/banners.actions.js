import {API, headerSetup} from '../../services/auth';
import {bannersConstants} from '../constants';
import {errorParser} from './errorParser';

export const listBanners = () => async (dispatch) => {
  await headerSetup();
  dispatch({type: bannersConstants.BANNER_LOADING});

  try {
    const {
      data: {data},
    } = await API.get('admin/v1/listBanner');

    if (data) {
      dispatch({
        type: bannersConstants.BANNER_LIST_SUCCESS,
        payload: data?.listing,
      });
    }
  } catch (err) {
    const parsedError = await errorParser(err);
    dispatch({
      type: bannersConstants.BANNER_ERROR,
      payload: parsedError,
    });
  }
};

export const getSingleBanner = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: bannersConstants.BANNER_LOADING});

  console.log(id, 'id');
  try {
    const {
      data: {data},
    } = await API.get(`admin/v1/banner/${id}`);

    if (data) {
      dispatch({
        type: bannersConstants.BANNER_GET_SINGLE_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {
    const parsedError = await errorParser(err);
    dispatch({
      type: bannersConstants.BANNER_ERROR,
      payload: parsedError,
    });
  }
};

export const addBanner = (formData, history) => async (dispatch) => {
  await headerSetup();
  dispatch({type: bannersConstants.BANNER_LOADING});

  try {
    const {
      data: {data},
    } = await API.post('admin/v1/addBanner', formData);

    if (data) {
      dispatch({
        type: bannersConstants.BANNER_ADD_SUCCESS,
        payload: data,
      });

      history.push('/admin/banners');
    }
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: bannersConstants.BANNER_ERROR,
      payload: parsedError,
    });
  }
};

export const editBanner = (formData, history) => async (dispatch) => {
  await headerSetup();
  dispatch({type: bannersConstants.BANNER_LOADING});

  try {
    const {
      data: {data},
    } = await API.put('admin/v1/editBanner', formData);

    if (data) {
      dispatch({
        type: bannersConstants.BANNER_EDIT_SUCCESS,
        payload: data?.data,
      });

      history.push('/admin/banners');
      dispatch({
        type: bannersConstants.BANNER_RESET_SINGLE,
      });
    }
  } catch (err) {
    const parsedError = await errorParser(err);
    console.log(parsedError, err, 'error');
    dispatch({
      type: bannersConstants.BANNER_ERROR,
      payload: parsedError,
    });
  }
};

export const deleteBanner = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: bannersConstants.BANNER_LOADING});

  try {
    await API.delete(`admin/v1/deleteBanner/${id}`);

    dispatch({
      type: bannersConstants.BANNER_DELETE_SUCCESS,
      payload: id,
    });
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: bannersConstants.BANNER_ERROR,
      payload: parsedError,
    });
  }
};
