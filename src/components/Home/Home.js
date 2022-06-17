import React, { useState, useEffect } from "react";
import Body from "./Body";
import Content from "./Content";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../../actions/tasks";

const Home = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const company_id = user?.results?.company_id;
  const [showBody, setShowBody] = useState(false);
  const { isLoading, tasks } = useSelector((state) => state.tasks);
  const [currentId, setCurrentId] = useState(null);

  const switchMode = () => {
    setShowBody((prevShowBody) => !prevShowBody);
  };
  useEffect(() => {
    dispatch(fetchPosts(company_id));
  }, [company_id, dispatch]);

  if (!user) {
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>
          Please sign in to access the full functionality of the website
        </h2>
      </div>
    );
  }

  return (
    <Wrapper>
      <link
        href="https://fonts.googleapis.com/css2?family=Amiri:ital@1&family=Cormorant+Garamond:wght@300&family=Racing+Sans+One&family=Rajdhani:wght@500&family=Roboto+Mono:wght@100&display=swap"
        rel="stylesheet"
      ></link>
      <div className="container">
        <div className="main-container">
          <div>
            <div className="head-container">
              <div className="head-container_first">
                <h1>Tasks</h1>
                <button type="button" onClick={switchMode}>
                  <AiOutlinePlus />
                </button>
              </div>
            </div>
            {showBody && (
              <Body currentId={currentId} setCurrentId={setCurrentId} />
            )}
          </div>
          <div>
            <Content
              isLoading={isLoading}
              tasks={tasks}
              deletePost={deletePost}
              setCurrentId={setCurrentId}
              setShowBody={setShowBody}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 3em;

  .container {
    max-width: 1200px;
    width: 90%;
    margin: 0 auto;
  }

  .main-container {
    display: grid;
    grid-template-columns: 30% 70%;
    justify-content: space-between;
    align-content: center;
    grid-gap: 20px;
  }

  @media screen and (max-width: 1295px) {
    .main-container {
      grid-template-columns: 1fr;
      place-items: center;
      justify-content: center;
      align-content: center;
    }
  }

  .head-container {
    height: 2em;
    width: 20em;
    padding: 0 0.5em;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  @media screen and (max-width: 1294px) {
    .head-container {
      width: 40em;
    }
  }

  @media screen and (max-width: 1100px) {
    .head-container {
      width: 20em;
    }
  }

  @media screen and (max-width: 399px) {
    .head-container {
      width: 15em;
    }
  }

  .head-container_first {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 1em;
      font-weight: 400;
      line-height: 0.5em;
      font-family: "Rajdhani", sans-serif;
      text-transform: uppercase;
    }

    button {
      border: none;
      box-shadow: none;
      background: white;
      font-size: 1em;
      font-weight: 600;
    }
  }
`;

export default Home;
