import React, {Fragment} from "react";
import { isAuthenticated, logout } from "../../helper/auth";
import {Link, withRouter} from "react-router-dom"
import "./Navbar.css"



const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { backgroundColor: "#FFFFFF", color: "#0275d8" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Navbar = ({history}) => {
  return (
    <Fragment>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link style={currentTab(history, "/")} className="nav-link" to="/">
            Home
          </Link>
        </li>
        {isAuthenticated() && (
          <li className="nav-item">
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
          <li className="nav-item">
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
          <li className="nav-item">
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
          <Fragment>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/register")}
                className="nav-link"
                to="/register"
              >
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/login")}
                className="nav-link"
                to="/login"
              >
                Log In
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
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
    </Fragment>
  );
};

export default withRouter(Navbar);
