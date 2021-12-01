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

function App() {
  return (
      <Router>
      <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/user/dashboard" component={UserDashboard} />
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <Route exact path="/quiz/add" component={AddEditQuiz} />
          <Route exact path="/quiz/view" component={ViewQuiz} />
        </Switch>
      </Router>
  );
}

export default App;
