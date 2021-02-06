import logo from './logo.svg';
import './App.css';
var Kucukdevapi = require('kucukdevapi');


function App() {

  var api = new Kucukdevapi.DefaultApi()
  var username = "hello@agu.edu.tr"; // {String} 
  var password = "123456"; // {String} 
  var opts = {
    'grantType': "password", // {String} 
  };
  var callback = function (error, data, response) {
    if (error) {
      console.error(error);
    } else {
      console.log('API called successfully. Returned data: ' + data);
    }
  };
  api.loginForAccessTokenTokenPost(username, password, opts, callback);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
