import React, { useState, useEffect } from "react";
import HomeQuizCard from "../../components/HomeQuizCard/HomeQuizCard";
import { getAllPublicQuiz } from "../../helper/quiz";
import "./HomePage.css";
const HomePage = () => {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drops, setDrops] = useState([]);

  const getAllQuizes = () => {
    setLoading(true);
    getAllPublicQuiz()
      .then((data) => {
        if (!data?.error) {
          setQuizes(data);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const rain = async () => {
    let amount = 50;
    for (let i = 0; i < amount; i++) {
      let size = Math.random() * 5 + 0.2;
      let posX = Math.floor(Math.random() * window.innerWidth);
      let delay = Math.random() * -20;
      let duration = Math.random() * 5 + 0.5;

      drops.push(
        <i
          key={i}
          style={{
            width: size + "px",
            left: posX + "px",
            animationDelay: delay + "s",
            animationDuration: duration + "s",
          }}
        ></i>
      );
    }
  };

  useEffect(() => {
    getAllQuizes();
    rain();
  }, []);
  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center">
        <div className="spinner-border text-white" role="status"></div>
      </div>
    );
  }
  return (
    <div className="container">
      {drops.map((drop, index) => {
        return drop;
      })}
      <div className="text-center my-4">
        <h1 className="text-white">Create And Share Quizes</h1>
        <div className="d-flex flex-wrap justify-content-center">
          {quizes?.map((quiz, index) => {
            return <HomeQuizCard quiz={quiz} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
