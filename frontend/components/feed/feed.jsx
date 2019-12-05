import React from "react";
import FeedItem from "./feed_item";
import Chart from "chart.js";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    this.props.fetchUserFeed().then((payload) => {
      let bike_count = 0;
      let run_count = 0;
      if (payload.userWorkouts) {
        bike_count = Object.values(payload.userWorkouts).filter( workout => 
          workout.workout_type === "Cycling").length
        
        run_count = Object.values(payload.userWorkouts).filter( workout => 
          workout.workout_type === "Running").length
      }


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
    });
  }

  render() {
    const { currentUser, workouts, userWorkouts, routes, users } = this.props;
  
    return (
      <div className="feed-background">
        <div className="feed-container">
          <div className="feed-left">
            <div className="feed-user-data">
              <div className="user-info">
                <div className="profile_pic"></div>
                <h3>{currentUser.username}</h3>
              </div>
              <div className="workout-data">
                <div className="data">
                  {currentUser.city}, {currentUser.state}
                </div>
              </div>
              <div className="workout-data">
                <div className="data-title">Total Workouts</div>
                <div className="data">{Object.keys(userWorkouts).length}</div>
                <br/>
                <div className="data-title">Workouts by Sport</div>
              </div>
              <div className="workout-pie-chart">
                <canvas id="myChart" ref={this.chartRef} />
              </div>
            </div>
          </div>
          <div className="feed-center">
            {workouts.reverse().map(workout => {
              return (
                <FeedItem
                  workout={workout}
                  key={workout.id}
                  route={routes[workout.route_id]}
                  user={users[workout.user_id]}
                />
              );
            })}
          </div>
          <div className="feed-right">
            <div className="feed-right-links">
              <h3>Follow me on GitHub</h3>
              <a
                href="https://github.com/mitchellreiss"
                className="github-logo"
              ></a>
              <h3>Connect with me on LinkedIn</h3>
              <a
                href="https://www.linkedin.com/in/mitchell-reiss/"
                className="linkedin-logo"
              ></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
