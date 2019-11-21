import React from 'react';

class ShowWorkout extends React.Component {
  
  componentDidMount() {
    this.props.fetchAllRoutes()
    .then( () => this.props.fetchWorkout(this.props.match.params.workoutId)) 
  }

  render() {

    return (
      <div></div>
    )
  }
}

export default ShowWorkout;