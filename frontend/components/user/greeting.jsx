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
        <Link className="btn" to="/signup">Sign Up</Link>
        <Link className="btn" to="/login">Log In</Link>
    </div>
  );
  
  return <div>{display}</div>;
};

export default Greeting;


