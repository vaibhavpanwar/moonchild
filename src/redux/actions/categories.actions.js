import {API, headerSetup} from '../../services/auth';
import {categoriesConstants} from '../constants';
import {errorParser} from './errorParser';

export const listCategories = () => async (dispatch) => {
  await headerSetup();
  dispatch({type: categoriesConstants.CATEGORY_LOADING});

  try {
    const {
      data: {data},
    } = await API.get('admin/v1/listCategory');

    if (data) {
      dispatch({
        type: categoriesConstants.CATEGORY_LIST_SUCCESS,
        payload: data?.listing,
      });
    }
  } catch (err) {
    const parsedError = await errorParser(err);
    dispatch({
      type: categoriesConstants.CATEGORY_ERROR,
      payload: parsedError,
    });
  }
};

export const getSingleCategory = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: categoriesConstants.CATEGORY_LOADING});

  console.log(id, 'id');
  try {
    const {
      data: {data},
    } = await API.get(`admin/v1/category/${id}`);

    if (data) {
      dispatch({
        type: categoriesConstants.CATEGORY_GET_SINGLE_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {
    const parsedError = await errorParser(err);
    dispatch({
      type: categoriesConstants.CATEGORY_ERROR,
      payload: parsedError,
    });
  }
};

export const addCategory = (formData, history) => async (dispatch) => {
  await headerSetup();
  dispatch({type: categoriesConstants.CATEGORY_LOADING});

  try {
    const {
      data: {data},
    } = await API.post('admin/v1/addCategory', formData);

    if (data) {
      dispatch({
        type: categoriesConstants.CATEGORY_ADD_SUCCESS,
        payload: data,
      });

      history.push('/admin/categories');
    }
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: categoriesConstants.CATEGORY_ERROR,
      payload: parsedError,
    });
  }
};

export const editCategory = (formData, history) => async (dispatch) => {
  await headerSetup();
  dispatch({type: categoriesConstants.CATEGORY_LOADING});

  try {
    const {
      data: {data},
    } = await API.put('admin/v1/editCategory', formData);

    if (data) {
      dispatch({
        type: categoriesConstants.CATEGORY_EDIT_SUCCESS,
        payload: data?.data,
      });

      history.push('/admin/categories');
      dispatch({
        type: categoriesConstants.CATEGORY_RESET_SINGLE,
      });
    }
  } catch (err) {
    const parsedError = await errorParser(err);
    console.log(parsedError, err, 'error');
    dispatch({
      type: categoriesConstants.CATEGORY_ERROR,
      payload: parsedError,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: categoriesConstants.CATEGORY_LOADING});

  try {
    await API.delete(`admin/v1/deleteCategory/${id}`);

    dispatch({
      type: categoriesConstants.CATEGORY_DELETE_SUCCESS,
      payload: id,
    });
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: categoriesConstants.CATEGORY_ERROR,
      payload: parsedError,
    });
  }
};

export const editCategoryStatus = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: categoriesConstants.CATEGORY_LOADING});

  try {
    const {
      data: {data},
    } = await API.patch(`admin/v1/activeInnactiveCategory/${id}`);

    if (data) {
      dispatch({
        type: categoriesConstants.CATEGORY_EDIT_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {
    const parsedError = await errorParser(err);
    console.log(parsedError, err, 'error');
    dispatch({
      type: categoriesConstants.CATEGORY_ERROR,
      payload: parsedError,
    });
  }
};
