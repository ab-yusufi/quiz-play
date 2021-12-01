import React, { useState, useEffect } from "react";
import { createAttempt } from "../../helper/attempt";
import { isAuthenticated } from "../../helper/auth";


const ViewQuiz = ({ location }) => {
  const [quiz, setQuiz] = useState();
  const [answers, setAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [values, setValues] = useState({
    success: "",
    error: ""
  })

  const { user, token } = isAuthenticated();

  const handleOptions = (e, i) => {
    const a = [...answers];
    a[i] = e.target.value;
    setAnswers(a);
  };

  const submitQuiz = () => {
    let score = 0;
    if (answers == correctAnswers) {
      score = quiz.questions.length;
    } else {
      for (let i = 0; i < quiz.questions.length; i++) {
        if (answers[i] == correctAnswers[i]) {
          score++;
        }
      }
    }
    setScore(score);
    setAnswers([]);
    createAttempt(quiz._id, user._id, token, {score})
      .then(data => {
        console.log("data: ", data)
        if(data?.error){
          console.log(data?.error)  
        } else {
          setValues({...values, success: `Quiz Submitted Successfully, Your Score is ${score}`})
        }
      })
  };

  useEffect(() => {
    if (location.state) {
      const corrects = [];
      setQuiz(location.state);
      location.state.questions.map((quiz) => {
        corrects.push(quiz.correct);
      });
      setCorrectAnswers(corrects);
    }
  }, []);
  return (
    <div className="container">
      <div className="text-center text-primary my-4">
        <h3>{quiz?.title}</h3>
        {values.success}
      </div>
      <div className="row">
        <div className="col-6">
          {quiz?.questions.map((question, index) => {
            return (
              <div className="card p-4">
                <h6>{"Q. " + question.question}</h6>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name={question.question + `${index}`}
                    value={"A"}
                    onChange={(e) => handleOptions(e, index, 0)}
                  />
                  <label class="form-check-label">
                    {"A. " + question.optionA}
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name={question.question + `${index}`}
                    value={"B"}
                    onChange={(e) => handleOptions(e, index, 1)}
                  />
                  <label class="form-check-label">
                    {"B. " + question.optionB}
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name={question.question + `${index}`}
                    value={"C"}
                    onChange={(e) => handleOptions(e, index, 2)}
                  />
                  <label class="form-check-label">
                    {"C. " + question.optionC}
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name={question.question + `${index}`}
                    value={"D"}
                    onChange={(e) => handleOptions(e, index, 3)}
                  />
                  <label class="form-check-label">
                    {"D. " + question.optionD}
                  </label>
                </div>
              </div>
            );
          })}
          <div className="text-center">
            <button className="btn btn-primary my-4 w-50" onClick={submitQuiz}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuiz;
