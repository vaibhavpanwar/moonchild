import {API, headerSetup} from '../../services/auth';
import {adsConstants} from '../constants';
import {errorParser} from './errorParser';
import {errorAlert, successAlert, warningAlert} from '../../utils/alerts';

export const listAds =
  (perPage = 4, page = 1, search = '') =>
  async (dispatch) => {
    await headerSetup();
    dispatch({type: adsConstants.AD_LOADING});

    try {
      const {
        data: {data},
      } = await API.get(
        `admin/v1/listAdvertisement?perPage=${perPage}&page=${page}&search=${search}`,
      );

      if (data) {
        dispatch({
          type: adsConstants.AD_LIST_SUCCESS,
          payload: {listing: data?.listing, count: data?.count},
        });
      }
    } catch (err) {
      const parsedError = await errorParser(err);
      dispatch({
        type: adsConstants.AD_ERROR,
        payload: parsedError,
      });
      errorAlert(parsedError);
    }
  };
export const listAdsByFilter =
  (perPage = 15, page = 1, userType, categoryId = '', subCategoryId = '') =>
  async (dispatch) => {
    await headerSetup();
    dispatch({type: adsConstants.AD_LOADING});

    try {
      const {
        data: {data},
      } = await API.get(
        `admin/v1/listAdvertisement?perPage=${perPage}&page=${page}&userType=${userType}&categoryId=${categoryId}&subCategoryId=${subCategoryId}`,
      );

      if (data) {
        dispatch({
          type: adsConstants.AD_LIST_SUCCESS,
          payload: {listing: data?.listing, count: data?.count},
        });
      }
    } catch (err) {
      const parsedError = await errorParser(err);
      dispatch({
        type: adsConstants.AD_ERROR,
        payload: parsedError,
      });
      errorAlert(parsedError);
    }
  };

export const getSingleAd = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: adsConstants.AD_LOADING});

  try {
    const {
      data: {data},
    } = await API.get(`admin/v1/advertisementById?addId=${id}`);

    if (data) {
      dispatch({
        type: adsConstants.AD_GET_SINGLE_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {
    const parsedError = await errorParser(err);
    dispatch({
      type: adsConstants.AD_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};

export const addAd = (formData, history) => async (dispatch) => {
  await headerSetup();
  dispatch({type: adsConstants.AD_LOADING});

  try {
    const {
      data: {data},
    } = await API.post('admin/v1/addAdvertisement', formData);

    if (data) {
      dispatch({
        type: adsConstants.AD_ADD_SUCCESS,
        payload: data,
      });
      successAlert(`Adverstisement added successfully`);

      history.push('/admin/ads');
    }
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: adsConstants.AD_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};

export const editAd = (formData, history) => async (dispatch) => {
  await headerSetup();
  dispatch({type: adsConstants.AD_LOADING});

  try {
    const {
      data: {data},
    } = await API.put('admin/v1/editAdvertisement', formData);

    if (data) {
      dispatch({
        type: adsConstants.AD_EDIT_SUCCESS,
        payload: data?.data,
      });

      successAlert(`Advertisement updated successfully`);
      history.push('/admin/ads');
      dispatch({
        type: adsConstants.AD_RESET_SINGLE,
      });
    }
  } catch (err) {
    const parsedError = await errorParser(err);
    dispatch({
      type: adsConstants.AD_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};

export const deleteAd = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: adsConstants.AD_LOADING});

  try {
    await API.delete(`admin/v1/deleteAdd/${id}`);

    dispatch({
      type: adsConstants.AD_DELETE_SUCCESS,
      payload: id,
    });

    warningAlert(`Ad~${id} deleted`);
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: adsConstants.AD_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};

export const editAdStatus = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: adsConstants.AD_LOADING});

  try {
    const {
      data: {data},
    } = await API.patch(`admin/v1/activeInnactiveAdd/${id}`);

    if (data) {
      dispatch({
        type: adsConstants.AD_EDIT_SUCCESS,
        payload: data,
      });
    }
    successAlert(`Status updated for Ad~${id}`);
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: adsConstants.AD_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};
