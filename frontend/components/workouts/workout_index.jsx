import React from "react";
import { Link } from 'react-router-dom'


class WorkoutIndex extends React.Component{

  componentDidMount() {
    this.props.fetchAllWorkouts();
  }

  render() {
    const { workouts, deleteWorkout } = this.props;

    return (
    <div>
      <div className="routes-sub-header">
        <h1>My Workouts</h1>
        <Link to="/workout/new"><button>Create New Workout</button></Link>
      </div>
      <table className="index-table">
        <tr>
          <th>Title</th>
          <th>Duration</th>
          <th>Avg Heart Rate</th>
          <th>Avg Speed</th>
          <th>Modify Workout</th>
        </tr>
          {workouts.map( workout => {
            const hours = Math.floor(workout.duration/60);
            const minutes = ("0" + Math.floor(workout.duration%60)).slice(-2);
            const seconds = ("0" + Math.floor(workout.duration%10)).slice(-2);
            return <tr key={workout.id}>
              <td><Link to={`/workout/${workout.id}`}>{workout.title}</Link></td> 
              <td>{hours}:{minutes}:{seconds}</td>
              <td>{workout.avg_hr}</td>
              <td>{workout.avg_speed.toFixed(2)}</td>
              <td className="modify-workout"> 
                <div className="delete-workout" onClick={() => deleteWorkout(workout.id)} >
                  Delete
                </div> 
                <Link to={`/workout/edit/${workout.id}`}>Edit</Link>
              </td>
              <td></td>
            </tr>
          }
        )}
      </table>
    </div>
    )
  }
}

export default WorkoutIndex;