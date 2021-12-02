import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashQuizCard from "../../components/DashQuizCard/DashQuizCard";
import { isAuthenticated } from "../../helper/auth";
import { getQuizByUser } from "../../helper/quiz";

const UserDashboard = ({ history, location }) => {
  const [loading, setLoading] = useState(false);
  const [quizes, setQuizes] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [disabled, setDisabled] = useState();
  const [refresh, setRefresh] = useState(false);

  const { user } = isAuthenticated();

  const getQuizes = async (userId) => {
    setLoading(true);
    getQuizByUser(userId)
      .then((data) => {
        if (!data?.error) {
          setQuizes(data);
          if (user) {
            if (userId === user._id) {
              console.log("disabled");
              setDisabled(false);
            } else {
              setDisabled(true);
            }
          } else {
            setDisabled(true);
          }
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (location.state) {
      setUserDetails(location.state);
      getQuizes(location.state._id);
    } else if (user) {
      setUserDetails(user);
      getQuizes(user._id);
    }
  }, [refresh]);
  return (
    <div className="container">
      <div className="text-center my-3">
        <h1>Welcome to User Dashboard</h1>
      </div>
      <div className="row my-4">
        <div className="col-md-6 col-12 text-center">
          <h3>
            Name: <span className="text-primary">{userDetails?.name}</span>
          </h3>
          <h5>
            Username:{" "}
            <span className="text-primary">@{userDetails?.username}</span>
          </h5>
        </div>
        <div className="col-md-6 col-12 text-center">
          <h3>
            Total Quizes: <span className="text-primary">{quizes?.length}</span>
          </h3>
        </div>
      </div>
      <div className="d-flex flex-row flex-wrap w-100 text-center">
        {loading ? (
          <div className="spinner-border" role="status"></div>
        ) : (
          quizes?.map((quiz, index) => {
            return (
              <DashQuizCard
                quiz={quiz}
                key={index}
                refresh={refresh}
                setRefresh={setRefresh}
                disabled={disabled}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
