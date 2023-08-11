import * as types from "./actionTypes";
import axios from "axios";

export const userSignup = (payload) => {
  axios
    .post("http://localhost:4500/user/signup", payload)
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err);
    })
};

export const Login = (payload) => (dispatch) => {
  dispatch({ type: types.GET_LOGIN_DATA_REQUEST});
  axios
    .post("http://localhost:4500/user/login", payload)
    .then((res) => {
      console.log(res);
      dispatch({ type: types.GET_LOGIN_DATA_SUCCESS, payload: res.data.token });
      localStorage.setItem("token", res.data.token);
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: types.GET_LOGIN_DATA_ERROR});
    });
};
