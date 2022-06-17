import React from "react";
import styled from "styled-components";
import Loading from "../Loading";
import { AiOutlinePlus, AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Content = ({
  tasks,
  isLoading,
  deletePost,
  setCurrentId,
  setShowBody,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <ContentWrapper>
      <link
        href="https://fonts.googleapis.com/css2?family=Amiri:ital@1&family=Cormorant+Garamond:wght@300&family=Racing+Sans+One&family=Rajdhani:wght@500&family=Roboto+Mono:wght@100&display=swap"
        rel="stylesheet"
      ></link>
      <section>
        <div className="section-head">
          {tasks?.results.map((item) => {
            return (
              <div key={item.id} className="section-body">
                <div className="section-body__first">
                  <FaUserCircle
                    style={{
                      color: "blue",
                      fontSize: "1.6em",
                    }}
                  />
                  <div style={{ visibility: "hidden" }}>.</div>
                  <div className="section-body__first-head">
                    <span className="span1">{item.task_msg}</span>
                    <span className="span2">{item.task_date}</span>
                  </div>
                </div>
                <div className="section-body__second">
                  <AiOutlinePlus
                    style={{
                      border: "1px solid grey",
                      color: "#222",
                      margin: "3px",
                    }}
                    onClick={() => {
                      return (
                        setCurrentId(item.id),
                        setShowBody((prevShowBody) => !prevShowBody)
                      );
                    }}
                  />
                  <AiOutlineDelete
                    style={{
                      border: "1px solid grey",
                      color: "crimson",
                      margin: "3px",
                    }}
                    onClick={() => {
                      return dispatch(deletePost(item.id, history));
                    }}
                  />
                  <Link to={`/task/${item.id}`}>
                    <AiOutlineCheck
                      style={{
                        border: "1px solid grey",
                        color: "blue",
                        margin: "3px",
                      }}
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.section`
  margin-bottom: 0.2rem;

  section {
    margin-top: 0rem;
  }
  .section-head {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 4px;
    margin: 10px;
  }

  @media screen and (max-width: 1100px) {
    .section-head {
      grid-template-columns: 1fr;
      place-items: center;
      justify-content: center;
      align-content: center;
    }
  }

  .section-body {
    width: 400px;
    height: 5em;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    box-sizing: border-box;
    padding: 0.5rem, 0.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: auto;
  }

  @media screen and (max-width: 399px) {
    .section-body {
      width: 15em;
    }
  }

  .section-body__first {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    margin: 6px;
    padding: 0 0.5rem 0 0;
    /* margin-bottom: 30px; */
  }

  .section-body__first-head {
    display: flex;
    flex-direction: column;
  }

  .section-body__first-head .span1 {
    font-size: 0.9rem;
    letter-spacing: 0.125rem;
    font-weight: 600;
    color: #222;
    font-family: "Rajdhani", sans-serif;
  }

  .section-body__first-head .span2 {
    text-transform: capitalize;
    font-size: 0.7rem;
    letter-spacing: 0.125rem;
    font-weight: 300;
    color: crimson;
    font-family: "Rajdhani", sans-serif;
  }

  @media screen and (max-width: 399px) {
    .section-body__first-head .span1 {
      font-size: 0.9rem;
    }
    .section-body__first-head .span2 {
      font-size: 0.5rem;
    }
  }

  .second-body__second {
    padding-left: "1em";
  }
`;

export default Content;
