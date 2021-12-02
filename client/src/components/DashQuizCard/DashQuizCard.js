import React, { useState } from "react";
import { isAuthenticated } from "../../helper/auth";
import { deleteQuiz, publicPrivateQuiz } from "../../helper/quiz";
import { Link } from "react-router-dom";
const DashQuizCard = ({ quiz, refresh, setRefresh = (f) => f }) => {
  const [loading, setLoading] = useState(false);
  const [pubLoading, setPubLoading] = useState(false);
  const { user, token } = isAuthenticated();

  const removeQuiz = () => {
    setLoading(true);
    deleteQuiz(quiz._id, user._id, token)
      .then((data) => {
        console.log("data: ", data);
        if (data.error) {
          console.log(data?.error);
          setLoading(false);
        } else {
          console.log("Deleted");
          setLoading(false);
          setRefresh(!refresh);
        }
      })
      .catch((err) => console.log(err));
  };

  const publicPrivate = () => {
    setPubLoading(true);
    publicPrivateQuiz(quiz._id, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        setPubLoading(false);
      } else {
        console.log(data);
        setPubLoading(false);
        setRefresh(!refresh);
      }
    });
  };
  return (
    <div className="card mx-2 my-2" style={{ width: "18rem" }}>
      <img
        src="https://placeimg.com/640/480/tech"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body text-center">
        <Link to={{ pathname: "/quiz/view", state: quiz }}>
          <h5 className="card-title">{quiz.title}</h5>
        </Link>
        <div className="card-text">
          <Link to={{ pathname: "/quiz/add", state: quiz }}>
            <button className="btn btn-info">Edit</button>
          </Link>
          <button
            className="btn btn-outline-danger mx-3"
            onClick={() => {
              removeQuiz();
            }}
          >
            {loading ? <div className="spinner-border"></div> : "Delete"}
          </button>
        </div>
        <div className="card-text mt-3">
          <button
            className="btn btn-primary mx-3"
            onClick={() => {
              publicPrivate();
            }}
          >
            {pubLoading ? (
              <div className="spinner-border"></div>
            ) : quiz.visibility ? (
              "Make Private"
            ) : (
              "Make Public"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashQuizCard;
