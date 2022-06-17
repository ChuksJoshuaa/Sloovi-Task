import {
  FETCH_POST,
  FETCH_SINGLE_POST,
  START_LOADING,
  END_LOADING,
  DELETE,
  UPDATE,
  CREATE,
} from "../contants/actionTypes";
import * as api from "../api";

// get all posts
export const fetchPosts = (company_id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(company_id);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

// get single post
export const fetchSinglePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchSinglePost(id);
    dispatch({ type: FETCH_SINGLE_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

// delete post
export const deletePost = (id, history) => async (dispatch) => {
  try {
    await api.deletePost(id);
    history.push("/");
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

//create post
export const createPost = (task, history) => async (dispatch) => {
  try {
    const { data } = await api.createPost(task);
    history.push(`/`);
    const action = { type: CREATE, payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

// update post
export const updatePost = (id, formData, history) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, formData);
    history.push("/");
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
