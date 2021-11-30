import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashQuizCard from "../../components/DashQuizCard/DashQuizCard";
import { isAuthenticated } from "../../helper/auth";
import { getQuizByUser } from "../../helper/quiz";

const UserDashboard = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [quizes, setQuizes] = useState([]);
  const [userDetails, SetUserDetails] = useState();
  const [refresh, setRefresh] = useState(false);
  const { user, token } = isAuthenticated();
  const getQuizes = () => {
    setLoading(true);
    getQuizByUser(user._id, token)
      .then((data) => {
        setQuizes(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getQuizes();
  }, [refresh]);
  return (
    <div className="container">
      <div className="text-center my-3">
        <h1>Welcome to User Dashboard</h1>
      </div>
      <div className="row my-4">
        <div className="col-6 text-center">
          <h3>
            Name: <span className="text-primary">{user?.name}</span>
          </h3>
          <h5>
            Username: <span className="text-primary">@{user?.username}</span>
          </h5>
        </div>
        <div className="col-6 text-center">
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
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
