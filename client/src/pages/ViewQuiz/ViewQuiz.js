import React, { useState, useEffect } from "react";
import { getQuizById } from "../../helper/quiz";
import { createAttempt, getAttemptsByQuiz } from "../../helper/attempt";
import { isAuthenticated } from "../../helper/auth";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewQuiz = ({ location, match, history }) => {
  const [quiz, setQuiz] = useState();
  const [answers, setAnswers] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [showCorrects, setShowCorrects] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [score, setScore] = useState(0);
  const [values, setValues] = useState({
    success: "",
    error: "",
  });
  const {success, error} = values

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
    window.scrollTo(0,0);
    setValues({
      ...values,
      success: `Quiz Submitted Successfully, Your Score is ${score} / ${quiz.questions.length}`,
    });
    setShowCorrects(true)
    // setAnswers([]);
    // createAttempt(quiz._id, user._id, token, { score }).then((data) => {
    //   if (data?.error) {
    //     console.log(data?.error);
    //   } else {
    //     setValues({
    //       ...values,
    //       success: `Quiz Submitted Successfully, Your Score is ${score}`,
    //     });
    //   }
    // });
  };

  const getAttempts = () => {
    getAttemptsByQuiz(location.state._id)
      .then((data) => {
        console.log(data);
        if (!data?.error) {
          setAttempts(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const getQuiz = (quizId) => {
    getQuizById(quizId)
      .then(data => {
        if(!data?.error){
          setQuiz(data);
        }
      }).catch(err => console.log(err))
  }

  useEffect(() => {
    if (location.state) {
      const corrects = [];
      setQuiz(location.state);
      location.state.questions.map((quiz) => {
        corrects.push(quiz.correct);
      });
      setCorrectAnswers(corrects);
      getAttempts();
    } else if(match.params.quizId){
      getQuiz(match.params.quizId);
    }
  }, []);
  return (
    <div className="container">
      <ToastContainer/>
      <div className="text-center text-primary my-4">
        <h3>{quiz?.title}</h3>
        <h6 className="alert alert-success" style={{display: success ? "": "none"}}>{success}</h6>
        <h6 className="alert alert-danger" style={{display: error ? "": "none"}}>{error}</h6>
      </div>
      <div className="text-center my-4">
        <button
          className="btn btn-success"
          onClick={() => {
            setShowCorrects(!showCorrects);
            setDisableSubmit(!disableSubmit);
          }}
        >
          {showCorrects ? "Hide Answers" : "Show Answers"}
        </button>
        <button className="btn btn-primary btn-sm mx-3"
        onClick={() =>  {
          navigator.clipboard.writeText("https://quiz-play.herokuapp.com/quiz/view/"+quiz._id)
          toast.info('Copied To Clipboard');
        }}
        >
          Copy Quiz Link
        </button>
      </div>
      <div className="row">
        <div className="col-6 offset-3">
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

                <h6
                  className="alert alert-success mt-3"
                  style={{ display: showCorrects ? "" : "none" }}
                >
                  {"Correct Answer: " + question.correct}
                </h6>
              </div>
            );
          })}
          <div className="text-center">
            <button
              className="btn btn-primary my-4 w-50"
              onClick={submitQuiz}
              disabled={disableSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        {/* <div className="col-6">
          <table className="table table-striped text-center">
            <tr className="">
              <th>Username</th>
              <th>Score</th>
            </tr>
            {attempts?.map((attempt, i) => {
              return (
                <tr>
                  <td>{attempt.user.username}</td>
                  <td>{attempt.score}</td>
                </tr>
              );
            })}
          </table>
        </div> */}
      </div>
    </div>
  );
};

export default ViewQuiz;
