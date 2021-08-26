import {API, headerSetup} from '../../services/auth';
import {errorAlert, successAlert, warningAlert} from '../../utils/alerts';
import {questionsConstants} from '../constants';
import {errorParser} from './errorParser';

export const listQuestions =
  (
    perPage = 4,
    page = 1,
    search = '',
    user = 1,
    categoryId = '',
    subCategoryId = '',
  ) =>
  async (dispatch) => {
    // console.log(
    //   search,
    //   user,
    //   categoryId,
    //   'categoryId',
    //   subCategoryId,
    //   'subcatid',
    //   'listQuestionRequest',
    // );
    await headerSetup();
    dispatch({type: questionsConstants.QUESTION_LOADING});
    let url;
    if (user === '') {
      url = `admin/v1/listQuestions?perPage=${perPage}&page=${page}&search=${search}&categoryId=${categoryId}&subCategoryId=${subCategoryId}`;
    } else {
      url = `admin/v1/listQuestions?userType=${user}&perPage=${perPage}&page=${page}&search=${search}&categoryId=${categoryId}&subCategoryId=${subCategoryId}`;
    }

    try {
      const {
        data: {data},
      } = await API.get(url);

      if (data) {
        dispatch({
          type: questionsConstants.QUESTION_LIST_SUCCESS,
          payload: {listing: data?.listing, count: data?.count},
        });
      }
    } catch (err) {
      const parsedError = await errorParser(err);
      dispatch({
        type: questionsConstants.QUESTION_ERROR,
        payload: parsedError,
      });
    }
  };

export const getSingleQuestion = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: questionsConstants.QUESTION_LOADING});

  try {
    const {
      data: {data},
    } = await API.get(`admin/v1/question/${id}`);

    if (data) {
      dispatch({
        type: questionsConstants.QUESTION_GET_SINGLE_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {
    const parsedError = await errorParser(err);
    dispatch({
      type: questionsConstants.QUESTION_ERROR,
      payload: parsedError,
    });
  }
};

export const addQuestion = (formData, history) => async (dispatch) => {
  await headerSetup();
  dispatch({type: questionsConstants.QUESTION_LOADING});

  try {
    const {
      data: {data},
    } = await API.post('admin/v1/addQuestion', formData);

    if (data) {
      dispatch({
        type: questionsConstants.QUESTION_ADD_SUCCESS,
        payload: data,
      });
      successAlert(`Question added successfullt`);
      history.push('/admin/questions');
    }
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: questionsConstants.QUESTION_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};

export const editQuestion = (formData, history) => async (dispatch) => {
  await headerSetup();
  dispatch({type: questionsConstants.QUESTION_LOADING});

  try {
    const {
      data: {data},
    } = await API.put('admin/v1/editQuestion', formData);

    if (data) {
      dispatch({
        type: questionsConstants.QUESTION_EDIT_SUCCESS,
        payload: data?.data,
      });
      successAlert(`${formData?.name} updated successfully`);

      history.push('/admin/questions');
      dispatch({
        type: questionsConstants.QUESTION_RESET_SINGLE,
      });
    }
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: questionsConstants.QUESTION_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};

export const deleteQuestion = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: questionsConstants.QUESTION_LOADING});

  try {
    await API.delete(`admin/v1/deleteQuestion/${id}`);

    dispatch({
      type: questionsConstants.QUESTION_DELETE_SUCCESS,
      payload: id,
    });
    warningAlert(`user ${id} removed`);
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: questionsConstants.QUESTION_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};

export const editQuestionStatus = (id) => async (dispatch) => {
  await headerSetup();
  dispatch({type: questionsConstants.QUESTION_LOADING});

  try {
    const {
      data: {data},
    } = await API.patch(`admin/v1/activeInactiveQuestion/${id}`);

    if (data) {
      dispatch({
        type: questionsConstants.QUESTION_EDIT_SUCCESS,
        payload: data,
      });
    }
    successAlert(`Status updated for question~${id}`);
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: questionsConstants.QUESTION_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};

export const editQuestionFilterStatus = (id, filter) => async (dispatch) => {
  await headerSetup();
  dispatch({type: questionsConstants.QUESTION_LOADING});

  try {
    const {
      data: {data},
    } = await API.patch(`admin/v1/activeInactiveFeatureFilter/${id}/${filter}`);

    if (data) {
      dispatch({
        type: questionsConstants.QUESTION_EDIT_SUCCESS,
        payload: data,
      });
    }
    successAlert(`Featured Filter Status updated for Question~${id}`);
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: questionsConstants.QUESTION_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};
export const suffleQuestion = (formData) => async (dispatch) => {
  await headerSetup();
  dispatch({type: questionsConstants.QUESTION_LOADING});

  try {
    await API.put(`admin/v1/shuffleQuestions`, formData);

    successAlert(`Rank updated for Question`);

    dispatch(listQuestions());
  } catch (err) {
    const parsedError = await errorParser(err);

    dispatch({
      type: questionsConstants.QUESTION_ERROR,
      payload: parsedError,
    });
    errorAlert(parsedError);
  }
};
