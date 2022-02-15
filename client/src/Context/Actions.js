import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT } from './Constants';

export const LoginStart = () => ({ type: LOGIN_START });

export const LoginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });

export const LoginFailure = () => ({ type: LOGIN_FAILURE });

export const Logout = () => ({ type: LOGOUT });
