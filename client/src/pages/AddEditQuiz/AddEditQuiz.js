import React, { Fragment, useEffect, useState } from "react";
import { isAuthenticated } from "../../helper/auth";
import { createQuiz } from "../../helper/quiz";
import { Redirect } from "react-router-dom";

const AddEditQuiz = () => {
  const [values, setValues] = useState({
    title: "Quiz On America",
    questions: [
      {
        question: "Question 1",
        optionA: "A",
        optionB: "B",
        optionC: "C",
        optionD: "D",
        correct: "A",
      },
    ],
    error: "",
    success: "",
    loading: false,
    didRedirect: false,
  });

  const { title, questions, success, error, loading, didRedirect } = values;

  const { user, token } = isAuthenticated();
  //Handle Quiz Input
  const handleQuestion = (e, i) => {
    let newQuestions = [...questions];
    console.log("i: ", i);
    newQuestions[i].question = e.target.value;
    setValues({ ...values, questions: newQuestions });
  };

  const handleOptionA = (e, i) => {
    let newQuestions = [...questions];
    newQuestions[i].optionA = e.target.value;
    setValues({ ...values, questions: newQuestions });
  };

  const handleOptionB = (e, i) => {
    let newQuestions = [...questions];
    newQuestions[i].optionB = e.target.value;
    setValues({ ...values, questions: newQuestions });
  };

  const handleOptionC = (e, i) => {
    let newQuestions = [...questions];
    newQuestions[i].optionC = e.target.value;
    setValues({ ...values, questions: newQuestions });
  };

  const handleOptionD = (e, i) => {
    let newQuestions = [...questions];
    newQuestions[i].optionD = e.target.value;
    setValues({ ...values, questions: newQuestions });
  };

  const handleCorrect = (e, i) => {
    let newQuestions = [...questions];
    newQuestions[i].correct = e.target.value;
    setValues({ ...values, questions: newQuestions });
  };

  const addOne = () => {
    const newQ = {
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correct: "",
    };
    const newQuestions = [...questions, newQ];

    setValues({ ...values, questions: newQuestions });
  };

  const removeOne = () => {
    const newQuestions = [...questions];
    newQuestions.pop();
    setValues({ ...values, questions: newQuestions });
  };

  const onSubmit = (e) => {
    setValues({ ...values, loading: true, error: false, success: false });
    e.preventDefault();
    createQuiz({ title, questions }, user._id, token)
      .then((data) => {
        if (data?.error) {
          setValues({ ...values, error: data?.error + ". Please Check The Values", loading: false });
        } else {
          setValues({
            ...values,
            success: "Quiz Created Successfully",
            loading: false,
            error: "",
            didRedirect: true
          });
        }
      })
      .catch((err) => console.log(err));
  };
 
  const performRedirect = () => {
    if(didRedirect){
      return <Redirect to="/user/dashboard"/>
    }
  }

  const QuizForm = () => {
    return (
      <Fragment>
        <div className="mb-5 mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="title"
            value={title}
            onChange={(e) => {
              setValues({ ...values, title: e.target.value });
            }}
          />
        </div>
        {questions.map((question, i) => {
          return (
            <div key={i}>
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Question ${i + 1}`}
                  value={question.question}
                  onChange={(e) => {
                    handleQuestion(e, i);
                  }}
                />
              </div>
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Option A"
                  value={question.optionA}
                  required
                  onChange={(e) => {
                    handleOptionA(e, i);
                  }}
                />
              </div>
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Option B"
                  value={question.optionB}
                  onChange={(e) => {
                    handleOptionB(e, i);
                  }}
                />
              </div>
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Option C"
                  value={question.optionC}
                  onChange={(e) => {
                    handleOptionC(e, i);
                  }}
                />
              </div>
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Option D"
                  value={question.optionD}
                  onChange={(e) => {
                    handleOptionD(e, i);
                  }}
                />
              </div>
              <div className="mb-5 mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Correct Option (A, B, C, D)"
                  maxLength={1}
                  value={question.correct}
                  onChange={(e) => {
                    handleCorrect(e, i);
                  }}
                />
              </div>
            </div>
          );
        })}
        <button className="btn btn-outline-primary me-3" onClick={addOne}>
          Add
        </button>
        <button className="btn btn-outline-danger" onClick={removeOne}>
          Remove
        </button>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary btn-block mt-3 w-50"
            onClick={onSubmit}
          >
            {loading ? (
              <div class="spinner-border" role="status"></div>
            ) : (
              "Create Quiz"
            )}
          </button>
        </div>
      </Fragment>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        {success}
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };
  return (
    <div className="container">
      <h1 className="text-primary text-center my-4">Add Quiz Here</h1>
      {successMessage()}
      {errorMessage()}
      {QuizForm()}
      {performRedirect()}
    </div>
  );
};

export default AddEditQuiz;
