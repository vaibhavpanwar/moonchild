import {API, headerSetup} from '../../services/auth';
import {categoriesConstants} from '../constants';
import {errorParser} from './errorParser';
import {
  errorAlert,
  infoAlert,
  successAlert,
  warningAlert,
} from '../../utils/alerts';

export const listCategories =
  (perPage = 15, page = 1, search = '') =>
  async (dispatch) => {
    await headerSetup();
    dispatch({type: categoriesConstants.CATEGORY_LOADING});

    try {
      const {
        data: {data},
      } = await API.get(
        `admin/v1/listCategory?perPage=${perPage}&page=${page}&search=${search}`,
      );

      if (data) {
        dispatch({
          type: categoriesConstants.CATEGORY_LIST_SUCCESS,
          payload: {listing: data?.listing, count: data?.count},
        });
      }
    } catch (err) {
      const parsedError = await errorParser(err);
      dispatch({
        type: categoriesConstants.CATEGORY_ERROR,
        payload: parsedError,
      });
      errorAlert(parsedError);
    }
  };

export const getSingleCategory = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: categoriesConstants.CATEGORY_LOADING});

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
    errorAlert(parsedError);
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
      successAlert(`${formData?.name?.en} added successfullt`);

      history.push('/admin/categories');
    }
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: categoriesConstants.CATEGORY_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
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
      successAlert(`${formData?.name?.en} updated successfullt`);
      history.push('/admin/categories');
      dispatch({
        type: categoriesConstants.CATEGORY_RESET_SINGLE,
      });
    }
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: categoriesConstants.CATEGORY_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
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
    warningAlert(`category~ ${id} deleted`);
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: categoriesConstants.CATEGORY_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
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
    infoAlert(`category status updated`);
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: categoriesConstants.CATEGORY_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};

export const suffleCategory = (formData) => async (dispatch) => {
  await headerSetup();
  dispatch({type: categoriesConstants.CATEGORY_LOADING});

  try {
    await API.put(`admin/v1/suffleCategory`, formData);

    successAlert(`Rank updated for Category`);

    dispatch(listCategories());
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: categoriesConstants.CATEGORY_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};
