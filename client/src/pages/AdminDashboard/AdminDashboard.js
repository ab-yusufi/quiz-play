import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blockUnblockUser, getAllUsers } from "../../helper/admin";
import {getQuizByUser} from "../../helper/quiz";
import { isAuthenticated } from "../../helper/auth";

const AdminDashboard = ({ history }) => {
  const [users, setUsers] = useState([]);
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const { user, token } = isAuthenticated();

  const getUsers = () => {
    setLoading(true);
    getAllUsers(user._id, token)
      .then((data) => {
        if (!data.error) {
          setUsers(data);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const getQuizes = (u) => {
      getQuizByUser(u._id)
        .then(data => {
            if(!data.error){
                setQuizes(data)
            }
        }).catch(err => console.log(err))
  }

  const blockUnblock = (u) => {
    blockUnblockUser(user._id, token, u).then((data) => {
      if (data?.error) {
        console.log(data.error);
    } else {
        setReload(!reload)
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, [reload]);

  return (
    <div className="container">
      <div className="text-primary text-center my-4">
        <h1>Welcome to Admin Dashboard</h1>
      </div>
      <div className="row">
        <div className="col-6">
          {users.map((user, index) => {
            return (
              <div className="card p-2" key={index}>
                <div className="row text-center">
                  <div className="col-8">
                    <h4 onClick={() => {
                        getQuizes(user)
                    }}>{user.name}</h4>
                  </div>
                  <div className="col-4">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        blockUnblock(user);
                      }}
                    >
                      {user.blocked ? "Unblock" : "Block"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-6">
        {quizes && quizes.map((quiz, index) => {
            return (
              <div className="card p-2" key={index}>
                <div className="row text-center">
                  <div className="col-8">
                    <h4>{quiz.title}</h4>
                  </div>
                  <div className="col-4">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        blockUnblock(user);
                      }}
                    >
                      {user.blocked ? "Unblock" : "Block"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {quizes.length == 0 && (<p>No Quizes</p>)}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
