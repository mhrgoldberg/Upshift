import React from "react";
import FeedItem from "./feed_item";
import Chart from "chart.js";
import { Link } from "react-router-dom";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.state = {
      workouts: []
    };
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    this.props.fetchUserFeed().then(payload => {
      this.setState({ workouts: Object.values(payload.workouts).reverse() });
      let bike_count = 0;
      let run_count = 0;
      if (payload.userWorkouts) {
        bike_count = Object.values(payload.userWorkouts).filter(
          workout => workout.workout_type === "Cycling"
        ).length;

        run_count = Object.values(payload.userWorkouts).filter(
          workout => workout.workout_type === "Running"
        ).length;
      }

      const data = [bike_count, run_count];
      new Chart(myChartRef, {
        type: "doughnut",
        data: {
          labels: ["Bike", "Run"],
          datasets: [
            {
              label: "Total Workouts",
              data,
              backgroundColor: ["#fd4c01c4", "#007fb6c4"]
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            position: "right",
            labels: {
              usePointStyle: true
            }
          }
        }
      });
    });
  }

  render() {
    const { currentUser, userWorkouts, routes, users } = this.props;
    const workouts = this.state.workouts;
    if (!userWorkouts || !workouts) {
      return <div class="loader loader-double is-active"></div>;
    }

    return (
      <div className="feed-background">
        <div className="feed-container">
          <div className="feed-left">
            <div className="feed-user-data">
              <div className="user-info">
                <div className="profile-pic"></div>
                <h3>{currentUser.username}</h3>
              </div>
              <div className="feed-user-info">
                <div className="data">
                  {currentUser.city}, {currentUser.state}
                </div>
              </div>

              <div className="workout-pie-chart">
                <div className="feed-user-info">
                  <div className="data-title">Workouts by Sport</div>
                </div>
                <canvas id="myChart" ref={this.chartRef} />
              </div>

              <div className="my-workouts-link">
                <Link to="/workouts">
                  My Workouts<i className="fas fa-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="feed-center">
            {workouts.map(workout => {
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
              <div className="feed-right-links-div">
                <div className="feed-link-item">
                  <a href="https://github.com/mitchellreiss">
                    {" "}
                    <div className="github-logo"> </div>
                    <h3>Follow me on GitHub</h3>
                  </a>
                </div>
                <div className="feed-link-item">
                  <a href="https://www.linkedin.com/in/mitchell-reiss/">
                    <div className="linkedin-logo"></div>
                    <h3>Connect with me on LinkedIn</h3>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
