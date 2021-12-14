import React, { Fragment } from "react";
import { isAuthenticated, logout } from "../../helper/auth";
import { Link, withRouter } from "react-router-dom";
import "./Navbar.css";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { backgroundColor: "#FFFFFF", color: "#0275d8" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Navbar = ({ history }) => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            QuizPlay
          </a>
          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon text-white"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item mx-1">
                <Link
                  style={currentTab(history, "/")}
                  className="nav-link"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {isAuthenticated() && (
                <li className="nav-item mx-1">
                  <Link
                    style={currentTab(history, "/user/dashboard")}
                    className="nav-link"
                    to="/user/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              {isAuthenticated() && (
                <li className="nav-item mx-1">
                  <Link
                    style={currentTab(history, "/quiz/add")}
                    className="nav-link"
                    to="/quiz/add"
                  >
                    Add Quiz
                  </Link>
                </li>
              )}
              {isAuthenticated() && isAuthenticated().user.role >= 1 && (
                <li className="nav-item mx-1">
                  <Link
                    style={currentTab(history, "/admin/dashboard")}
                    className="nav-link"
                    to="/admin/dashboard"
                  >
                    Admin Dashboard
                  </Link>
                </li>
              )}
              {!isAuthenticated() && (
                <div className="d-flex ms-auto">
                  <li className="nav-item mx-1">
                    <Link
                      style={currentTab(history, "/register")}
                      className="nav-link"
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                  <li className="nav-item mx-1">
                    <Link
                      style={currentTab(history, "/login")}
                      className="nav-link"
                      to="/login"
                    >
                      Log In
                    </Link>
                  </li>
                </div>
              )}
              {isAuthenticated() && (
                <li className="nav-item ms-auto mx-1">
                  <span
                    className="nav-link text-white cursor-pointer"
                    onClick={() => {
                      logout(() => {
                        history.push("/");
                      });
                    }}
                  >
                    Logout
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default withRouter(Navbar);
