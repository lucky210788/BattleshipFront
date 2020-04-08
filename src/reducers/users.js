import {LOAD_USERS, RESET_LOADING} from '../constants';

const initialState = {
  users: [],
  remainingShips: [],
  isLoading: true
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case RESET_LOADING:
      return {
        users: [],
        remainingShips: [],
        isLoading: true
      };
    case LOAD_USERS:
      return {
        users: action.users,
        remainingShips: action.remainingShips,
        isLoading: false
      };
    default:
      return state;
  }
};

export default users;