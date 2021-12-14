import React, { useState, useEffect } from "react";
import HomeQuizCard from "../../components/HomeQuizCard/HomeQuizCard";
import { getAllPublicQuiz } from "../../helper/quiz";
const HomePage = () => {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getAllQuizes();
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
      <div className="text-center my-4">
        <div className="text-bg my-4">
        <h1 className="text-white">Create And Share Quizes</h1>
        </div>
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
