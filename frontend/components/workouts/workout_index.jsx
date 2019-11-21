import React from "react";
import { Link } from 'react-router-dom'


class WorkoutIndex extends React.Component{

  componentDidMount() {
    this.props.fetchAllWorkouts();
  }

  render() {
    const { workouts, deleteWorkout } = this.props;
    return (
    <table className="index-table">
      <tr>
        <th>Title</th>
        <th>Duration</th>
        <th>Avg Heart Rate</th>
        <th>Modify Workout</th>
      </tr>
      {workouts.map( workout => (
        <tr key={workout.id}>
          <td><Link to={`/workout/${workout.id}`}>{workout.title}</Link></td> 
          <td>{workout.duration}</td>
          <td>{workout.avg_heart_rate}</td>
          <td onClick={() => deleteWorkout(workout.id)}>Delete <Link to={`/workout/edit/${workout.id}`}>Edit</Link></td>
          <td></td>
        </tr>
      ))}
    </table>
    )
  }
}

export default WorkoutIndex;