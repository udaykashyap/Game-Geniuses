import { LoginData, SignupData } from "../../utils/types";
import { AppDispatch } from "../store";
import { userLoginAPI, userSignupAPI } from "./auth.api";
import * as types from "./auth.types";
// import { toast } from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";

// login interface
export interface IUserLoginRequest {
  type: typeof types.USER_LOGIN_REQUEST;
}

export interface IUserLoginSuccess {
  type: typeof types.USER_LOGIN_SUCCESS;
  payload: string;
}

export interface IUserLoginError {
  type: typeof types.USER_LOGIN_ERROR;
}

// signup interface
export interface IUserSignupRequest {
  type: typeof types.USER_SIGNUP_REQUEST;
}

export interface IUserSignupSuccess {
  type: typeof types.USER_SIGNUP_SUCCESS;
}

export interface IUserSignupError {
  type: typeof types.USER_SIGNUP_ERROR;
}

export type AuthAction =
  | IUserLoginRequest
  | IUserLoginSuccess
  | IUserLoginError
  | IUserSignupRequest
  | IUserSignupSuccess
  | IUserSignupError;

const userLoginRequest = (): IUserLoginRequest => {
  return {
    type: types.USER_LOGIN_REQUEST,
  };
};

const userLoginSuccess = (token: string): IUserLoginSuccess => {
  return {
    type: types.USER_LOGIN_SUCCESS,
    payload: token,
  };
};

const userLoginError = (): IUserLoginError => {
  return {
    type: types.USER_LOGIN_ERROR,
  };
};

// signup actions
const userSignupRequest = (): IUserSignupRequest => {
  return {
    type: types.USER_SIGNUP_REQUEST,
  };
};

const userSignupSuccess = (): IUserSignupSuccess => {
  return {
    type: types.USER_SIGNUP_SUCCESS,
  };
};

const userSignupError = (): IUserSignupError => {
  return {
    type: types.USER_SIGNUP_ERROR,
  };
};

// login api methods
export const userLogin =
  (payload: LoginData): any =>
  async (dispatch: AppDispatch) => {
    dispatch(userLoginRequest());
    try {
      let res = await userLoginAPI(payload);
      if (res) {
        dispatch(userLoginSuccess(res));
        toast.success("Login successful"); // Trigger success toast
      }
    } catch (err) {
      dispatch(userLoginError());
      toast.error("Failed to login, please try again later");
    }
  };

// signup api methods
export const userSignup =
  (payload: SignupData): any =>
  async (dispatch: AppDispatch) => {
    dispatch(userSignupRequest());
    try {
      let res = await userSignupAPI(payload);
      if (res) {
        dispatch(userSignupSuccess());
        toast.success("Signup Successful!"); // add toaster here
      }
    } catch (err) {
      dispatch(userSignupError());
      toast.error("Failed to sign up, please try again later");
    }
  };
