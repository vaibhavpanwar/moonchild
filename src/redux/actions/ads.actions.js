import {API, headerSetup} from '../../services/auth';
import {adsConstants} from '../constants';
import {errorParser} from './errorParser';
import {errorAlert, successAlert} from '../../utils/alerts';

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

// export const getSingleBanner = (id) => async (dispatch) => {
//   await headerSetup();
//   dispatch({type: adsConstants.AD_LOADING});

//   console.log(id, 'id');
//   try {
//     const {
//       data: {data},
//     } = await API.get(`admin/v1/banner/${id}`);

//     if (data) {
//       dispatch({
//         type: adsConstants.AD_GET_SINGLE_SUCCESS,
//         payload: data,
//       });
//     }
//   } catch (err) {
//     const parsedError = await errorParser(err);
//     dispatch({
//       type: adsConstants.AD_ERROR,
//       payload: parsedError,
//     });
//     errorAlert(parsedError);
//   }
// };

export const addAd = (formData, history) => async (dispatch) => {
  console.log(formData, 'from');
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

// export const editBanner = (formData, history) => async (dispatch) => {
//   await headerSetup();
//   dispatch({type: adsConstants.AD_LOADING});

//   try {
//     const {
//       data: {data},
//     } = await API.put('admin/v1/editBanner', formData);

//     if (data) {
//       dispatch({
//         type: adsConstants.AD_EDIT_SUCCESS,
//         payload: data?.data,
//       });

//       successAlert(`Banner updated successfully`);
//       history.push('/admin/banners');
//       dispatch({
//         type: adsConstants.AD_RESET_SINGLE,
//       });
//     }
//   } catch (err) {
//     const parsedError = await errorParser(err);
//     console.log(parsedError, err, 'error');
//     dispatch({
//       type: adsConstants.AD_ERROR,
//       payload: parsedError,
//     });
//     errorAlert(parsedError);
//   }
// };

// export const deleteBanner = (id) => async (dispatch) => {
//   await headerSetup();
//   dispatch({type: adsConstants.AD_LOADING});

//   try {
//     await API.delete(`admin/v1/deleteBanner/${id}`);

//     dispatch({
//       type: adsConstants.AD_DELETE_SUCCESS,
//       payload: id,
//     });

//     warningAlert(`Banner~${id} deleted`);
//   } catch (err) {
//     const parsedError = await errorParser(err);

//     dispatch({
//       type: adsConstants.AD_ERROR,
//       payload: parsedError,
//     });
//     errorAlert(parsedError);
//   }
// };

// export const editBannerStatus = (id) => async (dispatch) => {
//   await headerSetup();
//   dispatch({type: adsConstants.AD_LOADING});

//   try {
//     const {
//       data: {data},
//     } = await API.patch(`admin/v1/activeInnactiveBanner/${id}`);

//     if (data) {
//       dispatch({
//         type: adsConstants.AD_EDIT_SUCCESS,
//         payload: data,
//       });
//     }
//     successAlert(`Status updated for Banner~${id}`);
//   } catch (err) {
//     const parsedError = await errorParser(err);
//     console.log(parsedError, err, 'error');
//     dispatch({
//       type: adsConstants.AD_ERROR,
//       payload: parsedError,
//     });
//     errorAlert(parsedError);
//   }
// };
