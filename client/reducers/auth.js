const initialState = {
  isFetching: false,
  isAuthenticated: false,
  user: { booksmarks: [] },
  errorMessage: ''
}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case 'ERROR':
      return {
        ...state,
        errorMessage: action.message
      }
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        errorMessage: ''
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.user
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      }
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        user: { booksmarks: [] }
      }
    case 'REGISTER_REQUEST':
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        errorMessage: ''
      }
    case 'REGISTER_FAILURE':
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      }
    case 'SET_BOOKMARKS':
      const newState = {...state}
      newState.user.bookmarks = action.bookmarks
      return newState
    default:
      return state
  }
}
