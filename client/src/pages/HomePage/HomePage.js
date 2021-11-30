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
  return (
    <div className="container">
      <div className="text-center my-4">

        <h1 className="text-primary">Create And Share Quizes</h1>
        <div className="d-flex flex-row flex-wrap w-100 text-center">
          {quizes?.map((quiz, index) => {
            return <HomeQuizCard quiz={quiz} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
