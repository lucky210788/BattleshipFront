import {LOAD_USERS, LOGIN, RESET_LOADING, LOGOUT} from '../constants';

export const logIn = () => {
  return {
    type: LOGIN,
    isLogIn: true
  }
};

export const logOut = () => {
  return {
    type: LOGOUT,
    isLogIn: false
  }
};

export const loadUsers = (users, remainingShips) => {
  return {
    type: LOAD_USERS,
    users,
    remainingShips
  }
};

export const resetLoading = () => {
  return {
    type: RESET_LOADING
  }
};

