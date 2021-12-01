import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

const HomeQuizCard = ({ quiz }) => {
  return (
    <div className="card mx-2 my-2" style={{ width: "18rem" }}>
      <img
        src="https://placeimg.com/640/480/tech"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body text-center">
        <Link to={{pathname: "/quiz/view", state: quiz}}>
          <h5 className="card-title">{quiz.title}</h5>
        </Link>
        <div className="card-text">
          <h6 className="text-primary">{quiz.user.name}</h6>
          <p className="text-info">@{quiz.user.username}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeQuizCard;
