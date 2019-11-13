import React from 'react';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      city: "",
      state: "",
      country: "",
      age: "",
      gender: "",
      primary_sport: "",
      goal_1: "",
      goal_2: "",
      goal_3: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(type) {
    return (e) => this.setState( {[type]: e.currentTarget.value } )
  }


  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.signUp(user);
  }

  render() {
    const { errors } = this.props;

    const err = <ul className="errors">
      { errors.map( (error, i) => {
        return <li key={i}>{error}</li>
      })}
    </ul>
            
    return (
      <div className="background-signup">
        <div className="form">

          <h2 className="h2-form">Sign Up</h2>
          <br />
          <div className="errors">{err}</div>

          <br />

          <form onSubmit={this.handleSubmit}>
            <label>
              <input type="text" 
                onChange={this.update('username')} 
                value={this.state.username} 
                placeholder="Username"
                />
            </label>

            <br />

            <label>
              <input type="password" 
                onChange={this.update('password')} 
                value={this.state.password}
                placeholder="Password"
              />
            </label>

            <br />

            <label>
              <input type="text" 
                onChange={this.update('city')} 
                value={this.state.city}
                placeholder="City"
                />
            </label>

            <br />

            <label>
              <input type="text" 
                onChange={this.update('state')} 
                value={this.state.state}
                placeholder="State"
                />
            </label>

            <br />

            <label>
              <input type="text" 
                onChange={this.update('country')} 
                value={this.state.country}
                placeholder="Country"
                />
            </label>

            <br />

            <label>
              <input type="number" 
                onChange={this.update('age')} 
                value={this.state.age}
                placeholder="Age"
              />
            </label>

            <br />

            <label>
              <select 
                value={this.state.gender} 
                onChange={this.update('gender')}
              >
                <option>Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>

            <br />

            <label>
              <select 
              value={this.state.primarySport} 
              onChange={this.update('primary_sport')}
              >
                <option>Primary Sport</option>
                <option value="running">Running</option>
                <option value="cycling">Cycling</option>
                <option value="multisport">Multisport</option>
              </select>
            </label>

            <br />

            <button onClick={this.handleSubmit}>Sign Up</button>
          </form>
        </div>
      </div>
    )
  }
}





export default SignUpForm;