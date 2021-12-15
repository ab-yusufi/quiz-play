import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import Navbar from "./components/Navbar/Navbar";
import AddEditQuiz from "./pages/AddEditQuiz/AddEditQuiz";
import ViewQuiz from "./pages/ViewQuiz/ViewQuiz";
import { useEffect, useState } from "react";

function App() {
  const [values, setValues] = useState({
    drops: [],
  });

  const { drops } = values;
  const rain = async () => {
    let amount;
    if (window.innerWidth <= 800) {
      amount = 25;
    } else {
      amount = 50;
    }
    let tempDrops = [];
    for (let i = 0; i < amount; i++) {
      let size = Math.random() * 5 + 0.2;
      let posX = Math.floor(Math.random() * window.innerWidth);
      let delay = Math.random() * -20;
      let duration = Math.random() * 5 + 0.5;
      tempDrops.push(
        <i
          key={i}
          style={{
            width: size + "px",
            left: posX + "px",
            animationDelay: delay + "s",
            animationDuration: duration + "s",
          }}
        ></i>
      );
    }
    setValues({ drops: tempDrops });
  };

  useEffect(() => {
    rain();
  }, []);
  return (
    <Router>
      <Navbar />
      {drops.map((drop, index) => {
        return drop;
      })}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/user/dashboard" component={UserDashboard} />
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
        <Route exact path="/quiz/add" component={AddEditQuiz} />
        <Route exact path="/quiz/view" component={ViewQuiz} />
        <Route exact path="/quiz/view/:quizId" component={ViewQuiz} />
      </Switch>
    </Router>
  );
}

export default App;
