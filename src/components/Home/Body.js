import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPost, updatePost } from "../../actions/tasks";

const randy = Math.floor(Math.random() * 50000);
const sasuke = Math.floor(Math.random() * 10000);
const completed = Math.floor(Math.random() * 2);
const user_id = JSON.parse(localStorage.getItem("profile"))?.results?.user_id;
const user_name = JSON.parse(localStorage.getItem("profile"))?.results?.name;

const initialState = {
  task_msg: "",
  task_date: "",
  is_completed: completed,
  time_zone: randy,
  assigned_user: user_id,
  task_time: "",
};

const Body = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState(initialState);

  const task = useSelector((state) =>
    currentId
      ? state.tasks.tasks?.results?.find((p) => p.id === currentId)
      : null
  );
  const timmy = parseInt(task?.task_time);
  const result2 = new Date(timmy ? timmy * 1000 : 1 * 1000)
    ?.toISOString()
    .slice(11, 19);
  const new_time = result2.toString().slice(0, 5);

  useEffect(() => {
    if (task) {
      setFormData({
        task_msg: task?.task_msg,
        task_date: task?.task_date,
        is_completed: completed,
        time_zone: randy,
        assigned_user: user_id,
        task_time: new_time,
      });
    }
  }, [task, new_time]);

  const handleChange = (e) => {
    const timeString = e.target.value;
    const arr = timeString.split(":");
    const ade = arr[0] * 3600 + arr[1] * 60;
    const jake = ade ? ade : sasuke;

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      task_time: jake,
    });
  };

  const clear = () => {
    setCurrentId(null);
    setFormData({
      task_msg: "",
      task_date: "",
      is_completed: "",
      time_zone: "",
      assigned_user: "",
      task_time: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, { ...formData }, history));
    } else {
      dispatch(createPost({ ...formData }, history));
    }
    clear();
  };

  return (
    <BodyWrapper>
      <link
        href="https://fonts.googleapis.com/css2?family=Amiri:ital@1&family=Cormorant+Garamond:wght@300&family=Racing+Sans+One&family=Rajdhani:wght@500&family=Roboto+Mono:wght@100&display=swap"
        rel="stylesheet"
      ></link>
      <div className="body-container">
        <form onSubmit={handleSubmit}>
          <div className="body-container__first">
            <label htmlFor="task_msg">Task Description</label>
            <input
              name="task_msg"
              value={formData.task_msg}
              type="text"
              placeholder=""
              onChange={handleChange}
            />
          </div>
          <div className="body-container__second">
            <div className="body-container__third">
              <label htmlFor="task_date">Date</label>
              <input
                name="task_date"
                type="date"
                value={formData.task_date}
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div className="body-container__third">
              <label htmlFor="task_time">Time</label>
              {currentId ? (
                <input
                  name="task_time"
                  value={formData.task_time}
                  type="time"
                  placeholder=""
                  onChange={handleChange}
                />
              ) : (
                <input
                  name="task_time"
                  type="time"
                  placeholder=""
                  onChange={handleChange}
                />
              )}
            </div>
          </div>
          <div className="body-container__first">
            <label htmlFor="task_time">Assigned User</label>
            <select name="assigned_user">
              <option
                value="assigned_user"
                name="assigned_user"
                className="user"
              >
                {user_name}
              </option>
            </select>
          </div>
          <div className="body-container__button">
            <button type="submit" className="cancel" onClick={clear}>
              Cancel
            </button>
            <button type="submit" className="save">
              Save
            </button>
          </div>
        </form>
      </div>
    </BodyWrapper>
  );
};

const BodyWrapper = styled.div`
  padding: 0;

  .body-container {
    height: 20em;
    width: 20em;
    padding: 0 0.5em;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background: rgb(200, 227, 222);
  }

  @media screen and (max-width: 1294px) {
    .body-container {
      width: 40em;
      height: auto;
    }
  }

  @media screen and (max-width: 1100px) {
    .body-container {
      width: 20em;
    }
  }

  @media screen and (max-width: 399px) {
    .body-container {
      width: 15em;
    }
  }

  .body-container__first {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
    margin-bottom: 5px;
    font-family: "Rajdhani", sans-serif;
    text-transform: capitalize;

    input {
      margin-top: 0.3rem;
      height: 1.5em;
      border-radius: 3px 3px;
    }
  }

  select {
    margin-top: 0.3rem;
    height: 1.8em;
    border-radius: 3px 3px;
    font-family: "Rajdhani", sans-serif;
  }

  .body-container__second {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    justify-content: center;
    align-content: center;
  }

  .body-container__third {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
    margin-bottom: 5px;
    font-family: "Rajdhani", sans-serif;
    text-transform: capitalize;

    input {
      margin-top: 0.3rem;
      width: 97%;
      height: 1.5em;
      border-radius: 3px 3px;
    }
  }

  .body-container__button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
    margin: 10px;
    margin-right: 0;
  }

  /* CSS */
  .save {
    background-color: initial;
    background-image: linear-gradient(-180deg, #00d775, #00bd68);
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    font-family: Inter, -apple-system, system-ui, Roboto, "Helvetica Neue",
      Arial, sans-serif;
    height: 44px;
    line-height: 44px;
    outline: 0;
    overflow: hidden;
    padding: 0 20px;
    pointer-events: auto;
    position: relative;
    text-align: center;
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
    vertical-align: top;
    white-space: nowrap;
    width: 30%;
    z-index: 9;
    border: 0;
    margin: 10px;
    margin-left: 0;
  }

  .save:hover {
    background: #00bd68;
  }

  /* CSS */
  .cancel {
    background-color: #ffffff;
    border: 1px solid rgb(209, 213, 219);
    border-radius: 0.5rem;
    box-sizing: border-box;
    color: #111827;
    font-family: "Inter var", ui-sans-serif, system-ui, -apple-system, system-ui,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
    padding: 0.75rem 1rem;
    width: 30%;
    text-align: center;
    text-decoration: none #d1d5db solid;
    text-decoration-thickness: auto;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    margin: 10px;
    margin-left: 0;
  }

  .cancel:hover {
    background-color: rgb(249, 250, 251);
  }

  .cancel:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  .cancel:focus-visible {
    box-shadow: none;
  }
`;

export default Body;
