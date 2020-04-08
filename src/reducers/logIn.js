import {LOGIN, LOGOUT} from '../constants';

const initialState = {
  isLogIn: false
};

const logIn = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        isLogIn: action.isLogIn
      };
    case LOGOUT:
      return {
        isLogIn: action.isLogIn
      };
    default:
      return state;
  }
};

export default logIn;