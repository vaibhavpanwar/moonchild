import {questionsConstants} from '../constants';

const questionsReducer = (state = {questions: [], question: {}}, action) => {
  switch (action.type) {
    case questionsConstants.QUESTION_LOADING:
      return {...state, loading: true};

    case questionsConstants.QUESTION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        questions: action.payload.listing,
        count: action.payload.count,
      };

    case questionsConstants.QUESTION_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        questions: [action.payload, ...state.questions],
      };

    case questionsConstants.QUESTION_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        questions: state.questions.filter((i) => i?._id !== action.payload),
      };
    case questionsConstants.QUESTION_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        questions: state.questions.map((item) =>
          item._id === action.payload?._id ? action.payload : item,
        ),
      };

    case questionsConstants.QUESTION_GET_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        question: action.payload,
      };
    case questionsConstants.QUESTION_RESET_SINGLE:
      return {
        ...state,

        question: {},
      };

    case questionsConstants.QUESTION_ERROR:
      return {...state, loading: false, error: action.payload};

    default:
      return state;
  }
};

export default questionsReducer;
