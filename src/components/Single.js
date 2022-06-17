import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePost } from "../actions/tasks";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Single = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, task } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [id, dispatch]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <SingleWrapper>
      <section>
        <div className="section-head">
          <div className="section-body">
            <div className="section-body__first">
              <FaUserCircle
                style={{
                  color: "blue",
                  fontSize: "1.6em",
                }}
              />
              <div style={{ visibility: "hidden" }}>.</div>
              <div className="section-body__first-head">
                <span className="span1">{task?.results?.task_msg}</span>
                <span className="span2">{task?.results?.created_string}</span>
              </div>
            </div>
            <div className="section-body__second">
              {task?.results?.user_name}
              <span style={{ visibility: "hidden" }}>jjj</span>
            </div>
          </div>
        </div>
      </section>
    </SingleWrapper>
  );
};

const SingleWrapper = styled.section`
  margin-top: 5rem;
  padding: 2em;
  margin-bottom: 0.2rem;

  section {
    margin-top: 0rem;
  }
  .section-head {
    max-width: 600px;
    width: 90%;
    margin: 0 auto;
  }

  .section-body {
    width: 450px;
    height: 4em;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    box-sizing: border-box;
    padding: 0.5rem, 0.7rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
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
  }

  .section-body__first-head {
    display: flex;
    flex-direction: column;
  }

  .section-body__first-head .span1 {
    font-size: 1.2rem;
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
    margin-left: "1em";
    margin-right: "1em";
  }
`;

export default Single;
