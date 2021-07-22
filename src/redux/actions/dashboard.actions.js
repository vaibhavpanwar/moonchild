import {API, headerSetup} from '../../services/auth';
import {dashboardConstants} from '../constants';
import {errorParser} from './errorParser';
import {errorAlert} from '../../utils/alerts';

export const getDashboardData =
  (type = 1, timeZone = 'Asia/Cacutta') =>
  async (dispatch) => {
    await headerSetup();
    dispatch({type: dashboardConstants.DASHBOARD_LOADING});

    try {
      const {
        data: {data},
      } = await API.get(`admin/v1/dashboard?type=${type}&timeZone=${timeZone}`);

      if (data) {
        dispatch({
          type: dashboardConstants.DASHBOARD_SUCCESS,
          payload: {listing: data?.listing, count: data?.count},
        });
      }
    } catch (err) {
      const parsedError = await errorParser(err);
      dispatch({
        type: dashboardConstants.DASHBOARD_ERROR,
        payload: parsedError,
      });
      errorAlert(parsedError);
    }
  };
