export const authTypes = {
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
};

const INITIAL_STATE = {
  isAuthenticated: false,
  token: '',
  name: '',
  image: '',
  logingIn: false,
  loggedIn: false,
  loggedInError: null,
  userType: null,
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.LOGIN:
      return {
        ...state,
        ...{
          logingIn: action.logingIn,
          loggedIn: action.loggedIn,
          loggedInError: action.loggedInError,
        },
      };

    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...{
          logingIn: action.logingIn,
          loggedIn: action.loggedIn,
          loggedInError: action.loggedInError,
          isAuthenticated: action.isAuthenticated,
          token: action.token,
          name: action.name,
          image: action.image,
          userType: action.userType,
        },
      };

    case authTypes.LOGIN_FAILED:
      return {
        ...state,
        ...{
          logingIn: false,
          loggedIn: false,
          loggedInError: action.loggedInError,
        },
      };

    default:
      return state;
  }
};

export default auth;
