import React from 'react';

class FeedItem extends React.Component {

  createURL(data) {
    const url = "https://maps.googleapis.com/maps/api/staticmap?&path=";
    const options = `&size=550x300&key=${window.googleAPIKey}`;
    const path = JSON.parse(data).map( waypoint => (
      `${waypoint["location"].lat},${waypoint["location"].lng}`
    )).join('|');
    return url + path + options;
  }


  render () {

    if (!this.props.workout || !this.props.route) {
      return null;
    }

    const {data, distance, elevation_gain} = this.props.route;
    const {duration, title} = this.props.workout;
    const { username } = this.props.user;

  

    return(
      <div className="feed-index-item">
        <h3>username</h3>
        <h2>{title}</h2>
        
        <img className="feed-map-img" src={`${this.createURL(data)}`} />
      </div>
    )
  }
}

export default FeedItem;