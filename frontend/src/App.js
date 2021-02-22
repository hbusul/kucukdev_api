import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./layout/Navbar";
import NotFound from "./pages/NotFound";
import Semesters from "./components/Semesters"
import Home from "./components/Home"
import Login from "./forms/Login"
import Register from "./forms/Register"
import ResetPassword from './components/ResetPassword';
import AddSemester from './forms/AddSemester';
import SemesterDetail from './components/SemesterDetail';
import AddUpdateLesson from './forms/AddUpdateLesson';
import AddUISLesson from './components/AddUISLesson';
import ShowLessons from './components/Lessons';
import LessonDetail from './components/LessonDetail';
import Overview from './components/Overview';
import Attendance from './components/Attendance.js';
import { UserContext } from './Context';


function App() {

  const [login] = useContext(UserContext);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Login} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/reset-password" component={ResetPassword} />

          <Route exact path="/overview" component={Overview} />
          <Route exact path="/semesters" component={Semesters} />
          <Route exact path="/lessons" component={ShowLessons} />
          <Route exact path="/attendance" component={Attendance} />
          <Route exact path="/add-semester" component={AddSemester} />

          <Route exact path="/lessons/add-lesson" component={AddUpdateLesson} />
          <Route exact path="/lessons/update-lesson/:id" component={AddUpdateLesson} />
          <Route exact path="/lessons/add-from-uis" component={AddUISLesson} />

          <Route exact path="/semesters/:id" component={SemesterDetail} />
          <Route exact path="/lessons/:id" component={LessonDetail} />

          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
