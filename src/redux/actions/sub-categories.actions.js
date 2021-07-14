import {API, headerSetup} from '../../services/auth';
import {subCategoriesConstants} from '../constants';
import {errorParser} from './errorParser';
import {errorAlert, successAlert, warningAlert} from '../../utils/alerts';

export const listSubCategories =
  (perPage = 4, page = 1, search = '') =>
  async (dispatch) => {
    await headerSetup();
    dispatch({type: subCategoriesConstants.SUB_CATEGORY_LOADING});

    try {
      const {
        data: {data},
      } = await API.get(
        `admin/v1/listSubCategory?perPage=${perPage}&page=${page}&search=${search}`,
      );

      if (data) {
        dispatch({
          type: subCategoriesConstants.SUB_CATEGORY_LIST_SUCCESS,
          payload: {listing: data?.listing, count: data?.count},
        });
      }
    } catch (err) {
      const parsedError = await errorParser(err);
      dispatch({
        type: subCategoriesConstants.SUB_CATEGORY_ERROR,
        payload: parsedError,
      });

      errorAlert(parsedError);
    }
  };

export const getSingleSubCategory = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: subCategoriesConstants.SUB_CATEGORY_LOADING});

  console.log(id, 'id');
  try {
    const {
      data: {data},
    } = await API.get(`admin/v1/subCategory/${id}`);

    if (data) {
      dispatch({
        type: subCategoriesConstants.SUB_CATEGORY_GET_SINGLE_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {
    const parsedError = await errorParser(err);
    dispatch({
      type: subCategoriesConstants.SUB_CATEGORY_ERROR,
      payload: parsedError,
    });

    errorAlert(parsedError);
  }
};

export const addSubCategory = (formData, history) => async (dispatch) => {
  await headerSetup();
  dispatch({type: subCategoriesConstants.SUB_CATEGORY_LOADING});
  console.log(formData, 'formda');
  try {
    const {
      data: {data},
    } = await API.post('admin/v1/addSubCategory', formData);

    if (data) {
      dispatch({
        type: subCategoriesConstants.SUB_CATEGORY_ADD_SUCCESS,
        payload: data,
      });

      successAlert(`${formData?.name?.en} added successfully`);
      history.push('/admin/sub-categories');
    }
  } catch (err) {
    const parsedError = await errorParser(err);
    console.log(err, 'eerror');
    dispatch({
      type: subCategoriesConstants.SUB_CATEGORY_ERROR,
      payload: parsedError,
    });

    errorAlert(parsedError);
  }
};

export const editSubCategory = (formData, history) => async (dispatch) => {
  await headerSetup();
  dispatch({type: subCategoriesConstants.SUB_CATEGORY_LOADING});

  try {
    const {
      data: {data},
    } = await API.put('admin/v1/editSubCategory', formData);

    if (data) {
      dispatch({
        type: subCategoriesConstants.SUB_CATEGORY_EDIT_SUCCESS,
        payload: data?.data,
      });

      successAlert(`${formData?.name?.en} updated successfully`);
      history.push('/admin/sub-categories');
      dispatch({
        type: subCategoriesConstants.SUB_CATEGORY_RESET_SINGLE,
      });
    }
  } catch (err) {
    const parsedError = await errorParser(err);
    console.log(parsedError, err, 'error');
    dispatch({
      type: subCategoriesConstants.SUB_CATEGORY_ERROR,
      payload: parsedError,
    });

    errorAlert(parsedError);
  }
};

export const deleteSubCategory = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: subCategoriesConstants.SUB_CATEGORY_LOADING});

  try {
    await API.delete(`admin/v1/deleteSubCategory/${id}`);

    dispatch({
      type: subCategoriesConstants.SUB_CATEGORY_DELETE_SUCCESS,
      payload: id,
    });
    warningAlert(`Sub Category~${id} deleted`);
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: subCategoriesConstants.SUB_CATEGORY_ERROR,
      payload: parsedError,
    });

    errorAlert(parsedError);
  }
};

export const editSubCategoryStatus = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: subCategoriesConstants.SUB_CATEGORY_LOADING});

  try {
    const {
      data: {data},
    } = await API.patch(`admin/v1/activeInnactiveSubCategory/${id}`);

    if (data) {
      dispatch({
        type: subCategoriesConstants.SUB_CATEGORY_EDIT_SUCCESS,
        payload: data,
      });
    }
    successAlert(`Status updated for Sub Category~${id}`);
  } catch (err) {
    const parsedError = await errorParser(err);
    console.log(parsedError, err, 'error');
    dispatch({
      type: subCategoriesConstants.SUB_CATEGORY_ERROR,
      payload: parsedError,
    });

    errorAlert(parsedError);
  }
};
