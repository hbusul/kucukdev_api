import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./layout/Navbar";
import NotFound from "./pages/NotFound";
import Semesters from "./components/Semesters"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import ResetPassword from './components/ResetPassword';
import AddSemester from './forms/AddSemester';
import SemesterDetail from './components/SemesterDetail';
import AddLesson from './forms/AddLesson';
import AddUISLesson from './components/AddUISLesson';
import ShowLessons from './components/Lessons';


function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/semesters" component={Semesters} />
          <Route exact path="/lessons" component={ShowLessons} />
          <Route exact path="/signin" component={Login} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/add-semester" component={AddSemester} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path={"/semesters/:id"} component={SemesterDetail} />
          <Route exact path="/lessons/add-lesson" component={AddLesson} />
          <Route exact path="/lessons/add-from-uis" component={AddUISLesson} />
          <Route exact path="/lessons/show-lessons" component={ShowLessons} />
          <Route component={NotFound} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
