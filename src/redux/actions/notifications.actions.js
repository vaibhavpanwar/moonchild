import {API, headerSetup} from '../../services/auth';
import {notificationsConstants} from '../constants';
import {errorParser} from './errorParser';
import {errorAlert, successAlert} from '../../utils/alerts';

export const listNotifications =
  (perPage = 4, page = 1, search = '') =>
  async (dispatch) => {
    await headerSetup();
    dispatch({type: notificationsConstants.NOTIFICATION_LOADING});

    try {
      const {
        data: {data},
      } = await API.get(
        `admin/v1/listAdminNotification?perPage=${perPage}&page=${page}&search=${search}`,
      );

      if (data) {
        dispatch({
          type: notificationsConstants.NOTIFICATION_LIST_SUCCESS,
          payload: {listing: data?.listing, count: data?.count},
        });
      }
    } catch (err) {
      const parsedError = await errorParser(err);
      dispatch({
        type: notificationsConstants.NOTIFICATION_ERROR,
        payload: parsedError,
      });
      errorAlert(parsedError);
    }
  };

export const getSingleNotification = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: notificationsConstants.NOTIFICATION_LOADING});

  try {
    const {
      data: {data},
    } = await API.get(`admin/v1/notificationById?notificationId=${id}`);

    if (data) {
      dispatch({
        type: notificationsConstants.NOTIFICATION_GET_SINGLE_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {
    const parsedError = await errorParser(err);
    dispatch({
      type: notificationsConstants.NOTIFICATION_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};

export const addNotification = (formData, history) => async (dispatch) => {
  await headerSetup();
  dispatch({type: notificationsConstants.NOTIFICATION_LOADING});

  try {
    const {
      data: {data},
    } = await API.post('admin/v1/sendNotificationToAllUsers', formData);

    if (data) {
      dispatch({
        type: notificationsConstants.NOTIFICATION_ADD_SUCCESS,
        payload: data,
      });
      successAlert(`notification added successfully`);

      history.push('/admin/notifications');
    }
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: notificationsConstants.NOTIFICATION_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};

// export const editBanner = (formData, history) => async (dispatch) => {
//   await headerSetup();
//   dispatch({type: notificationsConstants.NOTIFICATION_LOADING});

//   try {
//     const {
//       data: {data},
//     } = await API.put('admin/v1/editBanner', formData);

//     if (data) {
//       dispatch({
//         type: notificationsConstants.NOTIFICATION_EDIT_SUCCESS,
//         payload: data?.data,
//       });

//       successAlert(`Banner updated successfully`);
//       history.push('/admin/banners');
//       dispatch({
//         type: notificationsConstants.NOTIFICATION_RESET_SINGLE,
//       });
//     }
//   } catch (err) {
//     const parsedError = await errorParser(err);
//     console.log(parsedError, err, 'error');
//     dispatch({
//       type: notificationsConstants.NOTIFICATION_ERROR,
//       payload: parsedError,
//     });
//     errorAlert(parsedError);
//   }
// };

// export const deleteBanner = (id) => async (dispatch) => {
//   await headerSetup();
//   dispatch({type: notificationsConstants.NOTIFICATION_LOADING});

//   try {
//     await API.delete(`admin/v1/deleteBanner/${id}`);

//     dispatch({
//       type: notificationsConstants.NOTIFICATION_DELETE_SUCCESS,
//       payload: id,
//     });

//     warningAlert(`Banner~${id} deleted`);
//   } catch (err) {
//     const parsedError = await errorParser(err);

//     dispatch({
//       type: notificationsConstants.NOTIFICATION_ERROR,
//       payload: parsedError,
//     });
//     errorAlert(parsedError);
//   }
// };
