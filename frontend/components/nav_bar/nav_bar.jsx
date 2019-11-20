import React from 'react';
import { Link } from 'react-router-dom'

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.signUpLink = this.signUpLink.bind(this);
    this.loginLink = this.loginLink.bind(this);
  }

  signUpLink() {
    this.props.clearSessionErrors();
    this.props.history.push("/signup");
  }

  loginLink() {
    this.props.clearSessionErrors();
    this.props.history.push("/login");
  }

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
          <button onClick={this.signUpLink}>Sign Up</button>
          <button onClick={this.loginLink}>Log In</button>
      </div>
    )
  }

  logInFormButtons() {
    return (
      <div className="r-side-buttons">
        {/* <Link to="/signup"> */}
          <button onClick={this.signUpLink}>Sign Up</button>
        {/* </Link> */}
      </div>
    )
  }

  signUpFormButtons() {
    return (
      <div className="r-side-buttons">
        <Link to="/login">
          <button onClick={this.loginLink}>Log In</button>
        </Link>
      </div>
    )
  }

  dashboardDropdown() {
    return (
      <div className="dropdown">
      <p>Dashboard</p>
      <i className="fas fa-caret-down"></i>
        <div className="dropdown-content">
          <Link to="/routes">Routes</Link>
          <Link to="/route/new">New Route</Link>
        </div>
    </div>
    )
  }

  render() {
    const {currentUser, location} = this.props;
    let rSide = this.loggedOutBar();
    let lSide = null;

    if (currentUser) {
      rSide = this.loggedInBar();
      lSide = this.dashboardDropdown();
    } else {
      if (location.pathname === "/login"){
        rSide = this.logInFormButtons();
      } else if (location.pathname === "/signup") {
        rSide = this.signUpFormButtons();
      }
    }

    return(
      <nav>
          <div className="left-side">
            <Link to="/" >
            <div className="logo"></div>
            <h1>UpShift</h1>
            </Link>
            {lSide} 
          </div>
        <div>
          {rSide}
        </div>
      </nav>
    )
  }

}

export default NavBar;