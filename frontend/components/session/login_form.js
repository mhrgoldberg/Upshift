import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(type) {
    return (e) => this.setState( {[type]: e.currentTarget.value } )
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.login(user);
  }

  render() {
    const { errors } = this.props;
      const err = <ul>
       { errors.map( (error, i) => {
         return <li key='i'>{error}</li>
        })}
      </ul>
            
    return (
      <div>
        <div>{err}</div>
        <h2>Log In</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Username: 
            <input type="text" 
              onChange={this.update('username')} 
              value={this.state.username} />
          </label>

          <label>Password: 
            <input type="password" 
              onChange={this.update('password')} 
              value={this.state.password}/>
          </label>

          <button onClick={this.handleSubmit}>Log In</button>
        </form>
      </div>
    )
  }
}





export default LoginForm;