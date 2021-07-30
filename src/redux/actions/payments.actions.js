import {API, headerSetup} from '../../services/auth';
import {paymentsConstants} from '../constants';
import {errorParser} from './errorParser';
import {errorAlert} from '../../utils/alerts';

export const listPayments =
  (perPage = 4, page = 1, search = '') =>
  async (dispatch) => {
    await headerSetup();
    dispatch({type: paymentsConstants.PAYMENT_LOADING});

    try {
      const {
        data: {data},
      } = await API.get(
        `admin/v1/listPayments?perPage=${perPage}&page=${page}&search=${search}`,
      );

      if (data) {
        dispatch({
          type: paymentsConstants.PAYMENT_LIST_SUCCESS,
          payload: {listing: data?.listing, count: data?.count},
        });
      }
    } catch (err) {
      const parsedError = await errorParser(err);
      dispatch({
        type: paymentsConstants.PAYMENT_ERROR,
        payload: parsedError,
      });
      errorAlert(parsedError);
    }
  };
