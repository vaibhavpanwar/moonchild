import {API, headerSetup} from '../../services/auth';
import {usersConstants} from '../constants';
import {errorParser} from './errorParser';

export const listUsers =
  (perPage = 4, page = 1, search = '') =>
  async (dispatch) => {
    await headerSetup();
    dispatch({type: usersConstants.USER_LOADING});

    try {
      const {
        data: {data},
      } = await API.get(
        `admin/v1/userListing?perPage=${perPage}&page=${page}&search=${search}`,
      );

      if (data) {
        dispatch({
          type: usersConstants.USER_LIST_SUCCESS,
          payload: {listing: data?.listing, count: data?.count},
        });
      }
    } catch (err) {
      const parsedError = await errorParser(err);
      dispatch({
        type: usersConstants.USER_ERROR,
        payload: parsedError,
      });
    }
  };

// export const getSingleBanner = (id) => async (dispatch) => {
//   await headerSetup();
//   dispatch({type: usersConstants.USER_LOADING});

//   console.log(id, 'id');
//   try {
//     const {
//       data: {data},
//     } = await API.get(`admin/v1/banner/${id}`);

//     if (data) {
//       dispatch({
//         type: usersConstants.USER_GET_SINGLE_SUCCESS,
//         payload: data,
//       });
//     }
//   } catch (err) {
//     const parsedError = await errorParser(err);
//     dispatch({
//       type: usersConstants.USER_ERROR,
//       payload: parsedError,
//     });
//   }
// };

// export const addBanner = (formData, history) => async (dispatch) => {
//   await headerSetup();
//   dispatch({type: usersConstants.USER_LOADING});

//   try {
//     const {
//       data: {data},
//     } = await API.post('admin/v1/addBanner', formData);

//     if (data) {
//       dispatch({
//         type: usersConstants.USER_ADD_SUCCESS,
//         payload: data,
//       });

//       history.push('/admin/banners');
//     }
//   } catch (err) {
//     const parsedError = await errorParser(err);

//     dispatch({
//       type: usersConstants.USER_ERROR,
//       payload: parsedError,
//     });
//   }
// };

// export const editBanner = (formData, history) => async (dispatch) => {
//   await headerSetup();
//   dispatch({type: usersConstants.USER_LOADING});

//   try {
//     const {
//       data: {data},
//     } = await API.put('admin/v1/editBanner', formData);

//     if (data) {
//       dispatch({
//         type: usersConstants.USER_EDIT_SUCCESS,
//         payload: data?.data,
//       });

//       history.push('/admin/banners');
//       dispatch({
//         type: usersConstants.USER_RESET_SINGLE,
//       });
//     }
//   } catch (err) {
//     const parsedError = await errorParser(err);
//     console.log(parsedError, err, 'error');
//     dispatch({
//       type: usersConstants.USER_ERROR,
//       payload: parsedError,
//     });
//   }
// };

// export const deleteBanner = (id) => async (dispatch) => {
//   await headerSetup();
//   dispatch({type: usersConstants.USER_LOADING});

//   try {
//     await API.delete(`admin/v1/deleteBanner/${id}`);

//     dispatch({
//       type: usersConstants.USER_DELETE_SUCCESS,
//       payload: id,
//     });
//   } catch (err) {
//     const parsedError = await errorParser(err);

//     dispatch({
//       type: usersConstants.USER_ERROR,
//       payload: parsedError,
//     });
//   }
// };

// export const editBannerStatus = (id) => async (dispatch) => {
//   await headerSetup();
//   dispatch({type: usersConstants.USER_LOADING});

//   try {
//     const {
//       data: {data},
//     } = await API.patch(`admin/v1/activeInnactiveBanner/${id}`);

//     if (data) {
//       dispatch({
//         type: usersConstants.USER_EDIT_SUCCESS,
//         payload: data,
//       });
//     }
//   } catch (err) {
//     const parsedError = await errorParser(err);
//     console.log(parsedError, err, 'error');
//     dispatch({
//       type: usersConstants.USER_ERROR,
//       payload: parsedError,
//     });
//   }
// };
