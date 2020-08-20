import React from 'react';
import { Link } from 'react-router-dom';

class FeedItem extends React.Component {

  createURL(polyline) {
    const url =
      "https://maps.googleapis.com/maps/api/staticmap?&path=color:0xfd4c01%7Cenc:";
    const options = `&size=550x300&key=${window.googleAPIKey}`;
    return url + polyline + options;
  }


  render () {

    if (!this.props.workout || !this.props.route) {
      return null;
    }

    const {polyline, distance, elevation_gain} = this.props.route;
    const {duration, avg_speed, title, created_at, id} = this.props.workout;
    const { username } = this.props.user;

    const hours = Math.floor(duration/60);
    const minutes = ("0" + Math.floor(duration%60)).slice(-2);
    const seconds = ("0" + Math.round((duration % 1) * 60)).slice(-2);


    return(
      <div className="feed-index-item">
        <div className="user-info">
          <div className="profile-pic"></div>
          <h3>{username}</h3>
        </div>
        <h2><Link className="workout-title" to={`/workout/${id}`}>{title}</Link></h2>
          <div className="data-row">
          <div className="workout-data">
            <div className="data">{hours}:{minutes}:{seconds}</div>
            <div className="data-title">Duration</div>
          </div>
          <div className="workout-data">
            <div className="data">{avg_speed.toFixed(2)} mph</div>
            <div className="data-title">Average Speed</div>
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
    )
  }
}

export default FeedItem;