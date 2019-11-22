import React from 'react';
import { withRouter } from 'react-router-dom'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoSubmit = this.handleDemoSubmit.bind(this);
  }

  update(type) {
    return (e) => this.setState( {[type]: e.currentTarget.value } )
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.login(user).then( () => (
      this.props.history.push("/feed")
    ))
  }

  handleDemoSubmit(e) {
    e.preventDefault();
    const user = { 
      username: "MitchellReiss",
      password: "fastrider23"
    }
    this.props.login(user);
    this.props.history.push("/feed")
  }

  render() {
    const { errors } = this.props;
      const err = <ul className="errors">
       { errors.map( (error, i) => {
         return <li key={i}>{error}</li>
        })}
      </ul>
            
    return (
      <div className="background-login">
        <div className="login-form">
          <h2 className="h2-form">Log In</h2>
          <div className="errors">{err}</div>
          <form onSubmit={this.handleSubmit}>

            <br/>

            <label> 
              <input type="text" 
                onChange={this.update('username')} 
                value={this.state.username}
                placeholder="Username"
              />
            </label>
            
            <br/>

            <label>
              <input type="password" 
                onChange={this.update('password')} 
                value={this.state.password}
                placeholder="Password"
              />
            </label>

            <br/>

            <button onClick={this.handleSubmit}>Log In</button>

            <br/>

            <button onClick={this.handleDemoSubmit}>Demo User</button>

          </form>
        </div>
      </div>
    )
  }
}





export default withRouter(LoginForm);