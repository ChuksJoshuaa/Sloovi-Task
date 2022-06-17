import {
  FETCH_POST,
  START_LOADING,
  END_LOADING,
  FETCH_SINGLE_POST,
  CREATE,
  DELETE,
  UPDATE,
} from "../contants/actionTypes";

const tasks_reducers = (state = { isLoading: true, tasks: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_POST:
      return { ...state, tasks: action.payload };

    case FETCH_SINGLE_POST:
      return { ...state, task: action.payload };

    case CREATE:
      return { ...state, tasks: [action.payload] };

    case UPDATE:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };

    case DELETE:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    default:
      return { ...state };
  }
};

export default tasks_reducers;
