import axios from "axios";
const url = process.env.REACT_APP_API_URL;

export const loginCall = async (userCredential, dispatch) => {
  // console.log(userCredential);
  dispatch({ type: "Login_start" });
  try {
    const result = await axios.post(url + "/auth/login", userCredential);
    dispatch({ type: "Login_success", payload: result.data });
    localStorage.setItem("userInfo", JSON.stringify(result.data));
  } catch (err) {
    dispatch({ type: "Login_failure", payload: err });
  }
};
