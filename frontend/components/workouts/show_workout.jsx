import React from "react";

class ShowWorkout extends React.Component {
  componentDidMount() {
    // debugger
    this.props.fetchWorkout(this.props.match.params.workoutId)
      .then((payload) => this.props.fetchRoute(payload.workout.route_id)
      .then(route => {
        // debugger
        const myChartRef = this.chartRef.current.getContext("2d");
        const data = [1, 2, 4, 5];
        new Chart(myChartRef, {
          type: "polarArea",
          data: {
            labels: ["Fatigue", "Mood", "Motivation", "Quality"],
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
      }));
  }


  render() {
    return (
      <div>
        <div className="subjective-polar-chart">
          <canvas id="myChart" ref={this.chartRef} />
        </div>
      </div>
    );
  }
}

export default ShowWorkout;
