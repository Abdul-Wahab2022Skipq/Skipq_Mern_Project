export const LoginStart = (userCredentials) => ({
  type: "Login_start",
});

export const LoginSuccess = (user) => ({
  type: "Login_success",
  payload: user,
});

export const LoginFailure = (error) => ({
  type: "Login_failure",
  payload: error,
});

export const Follow = (userId) => ({
  type: "Follow",
  payload: userId,
});

export const Unfollow = (userId) => ({
  type: "Unfollow",
  payload: userId,
});
