import {API, headerSetup} from '../../services/auth';
import {contactUsConstants} from '../constants';
import {errorParser} from './errorParser';

export const listContactUs =
  (perPage = 4, page = 1, search = '') =>
  async (dispatch) => {
    await headerSetup();
    dispatch({type: contactUsConstants.CONTACT_US_LOADING});

    try {
      const {
        data: {data},
      } = await API.get(
        `admin/v1/listContactUsRequest?perPage=${perPage}&page=${page}&search=${search}`,
      );

      if (data) {
        dispatch({
          type: contactUsConstants.CONTACT_US_LIST_SUCCESS,
          payload: {listing: data?.listing, count: data?.count},
        });
      }
    } catch (err) {
      const parsedError = await errorParser(err);
      dispatch({
        type: contactUsConstants.CONTACT_US_ERROR,
        payload: parsedError,
      });
    }
  };
