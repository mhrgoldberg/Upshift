import React from 'react';

class ShowWorkout extends React.Component {
  
  componentDidMount() {
    this.props.fetchAllRoutes()
    .then( () => this.props.fetchWorkout(this.props.match.params.workoutId))
    .then( workout => {
      const myChartRef = this.chartRef.current.getContext("2d");
      const data = [bike_count, run_count];
      new Chart(myChartRef, {
        type: "pie",
        data: {
          labels: ["Bike", "Run"],
          datasets: [
            {
              label: "Total Workouts",
              data,
              backgroundColor: ["#fd4c01", "#2867b2"]
            }
          ]
        },
        options: {}
      });
      return workout;
    }) 
  }

  render() {

    return (
      <div></div>
    )
  }
}

export default ShowWorkout;