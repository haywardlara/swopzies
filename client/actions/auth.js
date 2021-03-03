// import { getUserTokenInfo, isAuthenticated, removeUser } from '../utils/auth'
import { login, register } from '../apis/auth'
import { fetchBookmarksForUser } from './listings'
import {
  getUserTokenInfo,
  isAuthenticated,
  removeUser,
  saveUserToken,
} from "../utils/auth"
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

export function generalError(message) {
  return {
    type: "ERROR",
    message,
  }
}

export function loginUser(creds, confirmSuccess) {
  return (dispatch) => {
    dispatch(requestLogin())
    return login(creds)
      .then((userInfo) => {
        dispatch(receiveLogin(userInfo))
        dispatch(fetchBookmarksForUser(userInfo.id))
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
  return (dispatch) => {login
    if (isAuthenticated()) {
      const userInfo = getUserTokenInfo()
      dispatch(receiveLogin(getUserTokenInfo()))
      dispatch(fetchBookmarksForUser(userInfo.id))
      confirmSuccess()
    }
  }
}

export function setBookmarks (bookmarks) {
  return {
    type: 'SET_BOOKMARKS',
    bookmarks: bookmarks
  }
}

export function updateProfile(updatedProfile, confirmSuccess) {
  return (dispatch) => {
    updateUserProfile(updatedProfile)
      .then((details) => {
        console.log("updated profile deets", details)
        saveUserToken(details.token)
        dispatch(checkAuth(confirmSuccess))
      })
      .catch((err) => {
        console.log(err)
        return dispatch(generalError(err))})
  }
}
