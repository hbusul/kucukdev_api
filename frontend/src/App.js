import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./layout/Navbar";
import NotFound from "./pages/NotFound";
import Semester from "./components/Semester"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import ResetPassword from './components/ResetPassword';


function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/semesters" component={Semester} />
          <Route exact path="/signin" component={Login} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/reset-password" component={ResetPassword} />


          <Route component={NotFound} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
