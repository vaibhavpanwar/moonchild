import {API, headerSetup} from '../../services/auth';
import {bannersConstants} from '../constants';
import {errorParser} from './errorParser';

export const listBanners = () => async (dispatch) => {
  dispatch({type: bannersConstants.BANNER_LOADING});
  await headerSetup();
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
    const parsedError = errorParser(err);
    dispatch({
      type: bannersConstants.BANNER_ERROR,
      payload: parsedError,
    });
  }
};
