import React from 'react';


class WorkoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.workout, 
      hours: Math.floor(props.workout.duration/60), 
      minutes: Math.floor(props.workout.duration%60), 
      seconds: Math.floor(props.workout.duration%10)
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.routesDropdown = this.routesDropdown.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllRoutes();
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
    newState["avg_speed"] = newState["distance"] / newState["duration"];
    delete newState["distance"]
    this.props.submitWorkout(newState);
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
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
    let time = hr*60;
    time += min;
    time += sec/10;
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
                  onChange={this.updateInteger('hours')} 
                  value={this.state.hours} 
                  min="0"
                  placeholder="hr"
                />
          
          
                <input type="number" 
                  onChange={this.updateInteger('minutes')} 
                  value={this.state.minutes} 
                  min="0"
                  placeholder="min"
                />

                <input type="number" 
                  onChange={this.updateInteger('seconds')} 
                  value={this.state.seconds} 
                  min="0"
                  placeholder="sec"
                />
              </div>
            </div>
          {/* </div>

          <div className="row"> */}
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

export default WorkoutForm;


