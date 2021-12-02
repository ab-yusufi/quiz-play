import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeQuizCard = ({ quiz }) => {
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
          <Link to={{pathname: "/user/dashboard", state: quiz.user}}>
            <h6 className="text-primary">{quiz.user.name}</h6>
          </Link>
          <Link to="/user/dashboard">
            <p className="text-info">@{quiz.user.username}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeQuizCard;
