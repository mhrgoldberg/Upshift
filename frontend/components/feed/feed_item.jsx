import React from "react";
import { Link } from "react-router-dom";

class FeedItem extends React.Component {
  createURL(polyline) {
    const url =
      "https://maps.googleapis.com/maps/api/staticmap?&path=color:0xfd4c01%7Cenc:";
    const options = `&size=550x300&key=${window.googleAPIKey}`;
    return url + polyline + options;
  }

  convertNumToTime(number) {
    // Check sign of given number
    var sign = number >= 0 ? 1 : -1;

    // Set positive value of number of sign negative
    number = number * sign;

    // Separate the int from the decimal part
    var hour = Math.floor(number);
    var decpart = number - hour;

    var min = 1 / 60;
    // Round to nearest minute
    decpart = min * Math.round(decpart / min);

    var minute = Math.floor(decpart * 60) + "";

    // Add padding if need
    if (minute.length < 2) {
      minute = "0" + minute;
    }

    // Add Sign in final result
    sign = sign == 1 ? "" : "-";

    // Concate hours and minutes
    var time = sign + hour + ":" + minute;

    return time;
  }

  render() {
    if (!this.props.workout || !this.props.route) {
      return null;
    }
    const { polyline, distance, elevation_gain } = this.props.route;
    const {
      duration,
      avg_speed,
      title,
      created_at,
      id,
      workout_type,
    } = this.props.workout;
    const { username } = this.props.user;
    const date = new Date(created_at);
    const hours = Math.floor(duration / 60);
    const minutes = ("0" + Math.floor(duration % 60)).slice(-2);
    const seconds = ("0" + Math.round((duration % 1) * 60)).slice(-2);

    return (
      <div className="feed-index-item">
        <div className="user-info">
          <span>
            <div className="profile-pic"></div>
            <h3>{username}</h3>
          </span>
          <h4>
            {date.getMonth()}/{date.getDay()}/{date.getFullYear()}
          </h4>
        </div>
        <h2>
          <Link className="workout-title" to={`/workout/${id}`}>
            {title}
          </Link>
        </h2>
        <div className="data-row">
          <div className="workout-data">
            <div className="data">
              {hours}:{minutes}:{seconds}
            </div>
            <div className="data-title">Duration</div>
          </div>
          <div className="workout-data">
            <div className="data">
              {workout_type === "Running"
                ? `${this.convertNumToTime(60 / avg_speed)} /mi`
                : `${avg_speed.toFixed(2)} mph`}
            </div>
            <div className="data-title">
              {workout_type === "Running" ? "Average Pace" : "Average Speed"}
            </div>
          </div>
          <div className="workout-data">
            <div className="data">{distance.toFixed(2)} mi</div>
            <div className="data-title">Distance</div>
          </div>
          <div className="workout-data">
            <div className="data">{elevation_gain} ft</div>
            <div className="data-title">Elevation</div>
          </div>
        </div>
        <Link className="workout-title" to={`/workout/${id}`}>
          <img className="feed-map-img" src={`${this.createURL(polyline)}`} />
        </Link>
      </div>
    );
  }
}

export default FeedItem;
