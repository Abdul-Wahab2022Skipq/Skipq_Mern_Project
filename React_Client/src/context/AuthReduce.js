const AuthReducer = (state, action) => {
  switch (action.type) {
    case "Login_start":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "Login_success":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "Login_failure":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "Follow":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "Unfollow":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
    case "Logout":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
