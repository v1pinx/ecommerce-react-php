import React from 'react';
import Register from './Register';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <div>
        <h2>Register a new user:</h2>
        <Register />
      </div>
      <div>
        <h2>Login with your credentials:</h2>
        <Login />
      </div>
    </div>
  );
}

export default App;
