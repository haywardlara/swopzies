import {
  getUserTokenInfo,
  isAuthenticated,
  removeUser,
  saveUserToken,
} from "../utils/auth"
import { login, register } from "../apis/auth"
import { updateUserProfile } from "../apis/users"

export function requestLogin() {
  return {
    type: "LOGIN_REQUEST",
    isFetching: true,
    isAuthenticated: false,
  }
}

export function receiveLogin(user) {
  return {
    type: "LOGIN_SUCCESS",
    isFetching: false,
    isAuthenticated: true,
    user,
  }
}

export function loginError(message) {
  return {
    type: "LOGIN_FAILURE",
    isFetching: false,
    isAuthenticated: false,
    message,
  }
}

export function loginUser(creds, confirmSuccess) {
  return (dispatch) => {
    console.log("testttttt")
    dispatch(requestLogin())
    return login(creds)
      .then((userInfo) => {
        console.log("test 3")
        dispatch(receiveLogin(userInfo))
        confirmSuccess()
      })
      .catch((err) => {
        dispatch(loginError(err))
      })
  }
}

export function requestLogout() {
  return {
    type: "LOGOUT_REQUEST",
    isFetching: true,
    isAuthenticated: true,
  }
}

export function receiveLogout() {
  return {
    type: "LOGOUT_SUCCESS",
    isFetching: false,
    isAuthenticated: false,
  }
}

export function logoutUser(confirmSuccess) {
  return (dispatch) => {
    dispatch(requestLogout())
    removeUser()
    dispatch(receiveLogout())
    confirmSuccess()
  }
}

export function registerUserRequest(creds, confirmSuccess) {
  return (dispatch) => {
    register(creds)
      .then((userInfo) => {
        dispatch(receiveLogin(userInfo))
        confirmSuccess()
      })
      .catch((err) => dispatch(loginError(err)))
  }
}

export function checkAuth(confirmSuccess) {
  return (dispatch) => {
    if (isAuthenticated()) {
      dispatch(receiveLogin(getUserTokenInfo()))
      confirmSuccess()
    }
  }
}

export function updateProfile(updatedProfile, confirmSuccess) {
  return (dispatch) => {
    updateUserProfile(updatedProfile)
      .then((details) => {
        saveUserToken(details.token)
        dispatch(checkAuth(confirmSuccess))
      })
      .catch((err) => dispatch(loginError(err)))
  }
}
