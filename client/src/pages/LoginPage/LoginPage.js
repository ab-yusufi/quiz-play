import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, login } from "../../helper/auth";

const LoginPage = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
    loading: false,
    didRedirect: false,
  });

  const { user } = isAuthenticated();

  const { email, password, error, success, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const loginUser = (event) => {

    event.preventDefault();
    if ( !email || !password ) {
      setValues({
        ...values,
        error: "All Fields Are Required",
      });
      return;
    }
    setValues({ ...values, error: false, loading: true });
    login({ email, password })
      .then((data) => {
        if (data?.error) {
          console.log("data: ", data)
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
              loading: false
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role >= 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loginForm = () => {
    return (
      <Fragment>
        <h1 className="text-primary text-center my-4">Login Here</h1>

        <div className="mb-3 mt-3">
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
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={handleChange("password")}
          />
        </div>
        <div>
          <button type="submit" disabled={loading} onClick={loginUser} className="mb-3 btn btn-primary">
            {loading ? (
              <div className="spinner-border" role="status"></div>
            ) : (
              "Login"
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
      {loginForm()}
      {successMessage()}
      {errorMessage()}
      {performRedirect()}
    </div>
  );
};

export default LoginPage;
