import React from 'react';
import { withRouter } from 'react-router-dom';


class WorkoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.workout, 
      hours:("0" + Math.floor(props.workout.duration/60)).slice(-2) || "", 
      minutes: ("0" + Math.floor(props.workout.duration%60)).slice(-2) || "", 
      seconds: ("0" + Math.round((props.workout.duration % 1) * 60)).slice(-2) || "",
      distance: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.routesDropdown = this.routesDropdown.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllRoutes()
    .then(payload => {
      payload.routes.forEach(route => {
      if (route.id === this.state.route_id) {
        this.setState({distance: route.distance})
      };
    })})
  }

  handleSubmit(e) {
    e.preventDefault();
    let newState = Object.assign({}, this.state);
    const duration = this.convertTime(
      newState.hours, newState.minutes, newState.seconds
    ); 
    delete newState["hours"];
    delete newState["minutes"];
    delete newState["seconds"];
    newState["duration"] = duration;
    newState["user_id"] = this.props.currentUserId;
    newState["avg_speed"] = newState["distance"] / (newState["duration"] / 60);
    delete newState["distance"]
    this.props.submitWorkout(newState).then(workout => {
      this.props.history.push(`/workouts`);
    })
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  updateIntegerTime(field) {
    return e => {
      const newInt = parseInt(("0" + parseInt(e.currentTarget.value, 10)).slice(-2));
      this.setState({ [field]: newInt });
    }
  }

  updateInteger(field) {
    return e => {
      const newInt = parseInt(e.currentTarget.value, 10);
      this.setState({ [field]: newInt });
    }
  }


  updateRoute() {
    return e => {
      this.setState({ route_id: parseInt(e.currentTarget.value, 10) });
      this.props.routes.forEach(route => {
        if (parseInt(e.currentTarget.value, 10) === route.id) {
          this.setState( {workout_type: route.route_type} )
          this.setState( {distance: route.distance} )
        }
      });
    }
  }

  convertTime(hr, min, sec) {
    let time = hr === "aN" || hr === NaN ? 0 : parseInt(hr, 10)*60;
    time += min === "aN" || min === NaN ? 0 : parseInt(min, 10);
    time += sec === "aN" || sec === NaN ? 0 : parseInt(sec, 10)/60; 
    return time;
  }

  routesDropdown() {
    if (!this.props.routes) {
      return <select className="numbered-select">
        <option></option>
      </select>
    }
    return(
      <select
        value={this.state.route_id} 
        onChange={this.updateRoute()}
        className="numbered-select"
      >
        <option></option>
        {this.props.routes.map( route => 
          <option value={`${route.id}`}>
            {route.title} | {route.distance.toFixed(2)} mi
          </option>
        )}
      </select>
    )
   
  }

  
  render() {
    const { formType, errors } = this.props;


    return (
      <div className="workout-form">
        <div className="workouts-sub-header">
          <h1>{formType}</h1>

          <div className="workout-errors">
            { errors.join(' | ') }
          </div>
        </div>

        <form onSubmit={this.handleSubmit}>

          <div className="row">
            <div className="input-block">
              <div className="form-label">Title</div>
              <input type="text" 
                onChange={this.update('title')} 
                value={this.state.title} 
              />
            </div>


          <div className="input-block">
            <div className="form-label">Duration</div>
              <div className="form-duration">
                <input type="number" 
                  onChange={this.updateIntegerTime('hours')} 
                  value={this.state.hours} 
                  min="0"
                  placeholder="hr"
                />
          
          
                <input type="number" 
                  onChange={this.updateIntegerTime('minutes')} 
                  value={this.state.minutes} 
                  min="0"
                  placeholder="min"
                />

                <input type="number" 
                  onChange={this.updateIntegerTime('seconds')} 
                  value={this.state.seconds} 
                  min="0"
                  placeholder="sec"
                />
              </div>
            </div>

            <div className="input-block">
              <div className="form-label">Route</div>
                {this.routesDropdown()}
            </div>
          </div>

          <div className="row">
            <div className="form-hr">
              <div className="input-block">
                <div className="form-label">Average Heart Rate</div>
                <input type="number" 
                  onChange={this.updateInteger('avg_hr')} 
                  value={this.state.avg_hr} 
                  min="0"
                />
              </div>

            <div className="input-block">
              <div className="form-label">Resting Heart Rate</div>
                <input type="number" 
                  onChange={this.updateInteger('resting_hr')} 
                  value={this.state.resting_hr} 
                  min="0"
                />
              </div>
            </div>
        

          <div className="form-subjective-params">
            <div className="input-block">
              <div className="form-label">Fatigue</div>
              <select 
                  value={this.state.fatigue} 
                  onChange={this.updateInteger('fatigue')}
                  className="numbered-select"
                >
                  <option></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
              </select>
            </div>

            <div className="input-block">
              <div className="form-label">Mood</div>
              <select 
                  value={this.state.mood} 
                  onChange={this.updateInteger('mood')}
                  className="numbered-select"
                >
                  <option></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
              </select>
            </div>

            <div className="input-block">
              <div className="form-label">Motivation</div>
              <select 
                  value={this.state.motivation} 
                  onChange={this.updateInteger('motivation')}
                  className="numbered-select"
                >
                  <option></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
              </select>
            </div>

            <div className="input-block">
              <div className="form-label">Quality</div>
              <select 
                  value={this.state.quality} 
                  onChange={this.updateInteger('quality')}
                  className="numbered-select"
                >
                  <option></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
              </select>
            </div>
          </div>
          </div>
        
          <div className="row">
            <div className="input-block">
              <div className="form-label">Comment</div>
              <textarea 
                value={this.state.comment} 
                onChange={this.update('comment')}
                placeholder="How did your workout go? How did you feel? How was the weather?"
              />
            </div>
          </div>
          <button className="workout-submit">{formType}</button>
        </form>
      </div>
    )
  }

}

export default withRouter(WorkoutForm);


