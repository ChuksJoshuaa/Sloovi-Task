import { LOGIN } from "../contants/actionTypes";
import * as api from "../api";

export const login = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch({ type: LOGIN, data });
    history.push("/");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
