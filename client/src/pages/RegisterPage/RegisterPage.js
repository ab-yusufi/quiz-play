import React, { Fragment, useState } from "react";
import { register } from "../../helper/auth";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    success: false,
  });

  const { name, email, password, username, error, success, loading } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const registerUser = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    if (!name || !email || !password || !username) {
      setValues({
        ...values,
        error: "All Fields Are Required",
        loading: false,
      });
      return;
    }
    register({ name, email, password, username })
      .then((data) => {
        if (data?.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
            loading: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            username: "",
            error: "",
            success: true,
            loading: false,
          });
        }
      })
      .catch((err) => console.log("Error in signup: ", err));
  };

  const registerForm = () => {
    return (
      <Fragment>
        <div className="text-bg py-1">
        <h1 className="text-white text-center my-4">Register Here</h1>
        </div>
        <div className="mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={handleChange("name")}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={handleChange("email")}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={handleChange("username")}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={handleChange("password")}
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-primary mb-3"
            onClick={registerUser}
            disabled={loading}
          >
            {loading ? <div class="spinner-border" role="status"></div> : "Register"}
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
        New account was created successfully. Please
        <Link to="/login">Login Here</Link>
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
      {registerForm()}
      {successMessage()}
      {errorMessage()}
    </div>
  );
};

export default RegisterPage;
