import {API, headerSetup} from '../../services/auth';
import {countriesConstants} from '../constants';
import {errorParser} from './errorParser';
import {errorAlert, successAlert, warningAlert} from '../../utils/alerts';

export const listCountries =
  (perPage = 15, page = 1, search = '') =>
  async (dispatch) => {
    await headerSetup();
    dispatch({type: countriesConstants.COUNTRY_LOADING});

    try {
      const {
        data: {data},
      } = await API.get(
        `admin/v1/listCountry?perPage=${perPage}&page=${page}&search=${search}`,
      );

      if (data) {
        dispatch({
          type: countriesConstants.COUNTRY_LIST_SUCCESS,
          payload: {listing: data?.listing, count: data?.count},
        });
      }
    } catch (err) {
      const parsedError = await errorParser(err);
      dispatch({
        type: countriesConstants.COUNTRY_ERROR,
        payload: parsedError,
      });
      errorAlert(parsedError);
    }
  };

export const getSingleCountry = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: countriesConstants.COUNTRY_LOADING});

  try {
    const {
      data: {data},
    } = await API.get(`admin/v1/country?countryId=${id}`);

    if (data) {
      dispatch({
        type: countriesConstants.COUNTRY_GET_SINGLE_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {
    const parsedError = await errorParser(err);
    dispatch({
      type: countriesConstants.COUNTRY_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};

export const addCountry = (formData, history) => async (dispatch) => {
  await headerSetup();
  dispatch({type: countriesConstants.COUNTRY_LOADING});

  try {
    const {
      data: {data},
    } = await API.post('admin/v1/addCountry', formData);

    if (data) {
      dispatch({
        type: countriesConstants.COUNTRY_ADD_SUCCESS,
        payload: data,
      });
      successAlert(`country added successfully`);

      history.push('/admin/countries');
    }
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: countriesConstants.COUNTRY_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};

export const editCountry = (formData, history) => async (dispatch) => {
  await headerSetup();
  dispatch({type: countriesConstants.COUNTRY_LOADING});

  try {
    const {
      data: {data},
    } = await API.put('admin/v1/editCountry', formData);

    if (data) {
      dispatch({
        type: countriesConstants.COUNTRY_EDIT_SUCCESS,
        payload: data?.data,
      });

      successAlert(`Country updated successfully`);
      history.push('/admin/countries');
      dispatch({
        type: countriesConstants.COUNTRY_RESET_SINGLE,
      });
    }
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: countriesConstants.COUNTRY_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};

export const deleteCountry = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: countriesConstants.COUNTRY_LOADING});

  try {
    await API.delete(`admin/v1/deleteCountry/${id}`);

    dispatch({
      type: countriesConstants.COUNTRY_DELETE_SUCCESS,
      payload: id,
    });

    warningAlert(`Country~${id} deleted`);
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: countriesConstants.COUNTRY_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};

export const editCountryStatus = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: countriesConstants.COUNTRY_LOADING});

  try {
    const {
      data: {data},
    } = await API.patch(`admin/v1/activeInnactiveCountry/${id}`);

    if (data) {
      dispatch({
        type: countriesConstants.COUNTRY_EDIT_SUCCESS,
        payload: data,
      });
    }
    successAlert(`Status updated for Country~${id}`);
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: countriesConstants.COUNTRY_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};

export const suffleCountry = (formData) => async (dispatch) => {
  await headerSetup();
  dispatch({type: countriesConstants.COUNTRY_LOADING});

  try {
    await API.put(`admin/v1/suffleCountry`, formData);

    successAlert(`Rank updated for Country`);

    dispatch(listCountries());
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: countriesConstants.COUNTRY_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};
