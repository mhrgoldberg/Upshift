import React from 'react';
import { Link } from 'react-router-dom'

class NavBar extends React.Component {

  loggedInBar() {
    return (
      <div className="r-side-buttons">
        <div className="profile_pic"></div>
        <button onClick={this.props.logout}>logout</button>
      </div>
    )
  }

  loggedOutBar() {
    return (
      <div className="r-side-buttons">
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
        <Link to="/login">
          <button>Log In</button>
        </Link>
      </div>
    )
  }

  logInFormButtons() {
    return (
      <div className="r-side-buttons">
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    )
  }

  signUpFormButtons() {
    return (
      <div className="r-side-buttons">
        <Link to="/login">
          <button>Log In</button>
        </Link>
      </div>
    )
  }

  render() {
    const {currentUser, location} = this.props;
    let rSide = this.loggedOutBar();

    if (currentUser) {
      rSide = this.loggedInBar();
    } else {
      if (location.pathname === "/login"){
        rSide = this.logInFormButtons();
      } else if (location.pathname === "/signup") {
        rSide = this.signUpFormButtons();
      }
    }

    return(
      <nav>
        <div className="logo">
          <Link to="/">
            <div className="logo"></div>
          </Link>
        </div>
        <div>
          {rSide}
        </div>
      </nav>
    )
  }

}

export default NavBar;