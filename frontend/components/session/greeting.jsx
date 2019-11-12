import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({ currentUser, logout }) => {
  const display = currentUser ? (
    <div>
      <h2>Greetings, {currentUser.username}</h2>
      <button onClick={logout}>logout</button>
    </div>
  ) : (
    <div>

        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
        <Link to="/login">
          <button>Log In</button>
        </Link>
    </div>
  );
  
  return <div>{display}</div>;
};

export default Greeting;


