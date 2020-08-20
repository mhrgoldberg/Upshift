import React from "react";
import { Link } from "react-router-dom";

class ShowRoute extends React.Component {

  componentDidMount() {
    const mapOptions = {
      center: { lat: 37.7758, lng: -122.435 }, // this is SF
      zoom: 15,
    };
    this.map = new google.maps.Map(this.refs.map, mapOptions);
    this.props.fetchRoute(this.props.match.params.routeId).then(() => {
      const latLngPath = JSON.parse(this.props.route.path);
      const routePath = new window.google.maps.Polyline({
        path: latLngPath,
        geodesic: true,
        strokeColor: "#fd4c01",
        strokeOpacity: 2,
        strokeWeight: 3,
      });
      const bounds = new google.maps.LatLngBounds();
      latLngPath.forEach((trackPoint) => bounds.extend(trackPoint));
      this.map.setCenter(bounds.getCenter());
      this.map.fitBounds(bounds);
      routePath.setMap(this.map);
    });
  }

  render() {
    const {
      title,
      route_type,
      distance,
      elevation_gain,
      elevation_loss,
      max_elevation,
    } = this.props.route;

    return (
      <div className="show">
        <div className="routes-sub-header">
          <h1>{route_type} Route</h1>
          <Link to="/routes">
            <button>All Routes</button>
          </Link>
        </div>
        <div className="show-container">
          <div id="map" ref="map" />
          <div className="show-route-data">
            <h2>{title}</h2>
            <ul>
              <li key="route-type">
                <div className="data">{route_type}</div>
                <div className="data-title">Route Type</div>
              </li>
              <li key="dist">
                <div className="data">{distance.toFixed(2)} mi</div>
                <div className="data-title">Distance</div>
              </li>
              <li key="gain">
                <div className="data">{elevation_gain} ft</div>
                <div className="data-title">Elevation Gain</div>
              </li>
              <li key="loss">
                <div className="data">{elevation_loss} ft</div>
                <div className="data-title">Elevation Loss</div>
              </li>
              <li key="max">
                <div className="data">{max_elevation} ft</div>
                <div className="data-title">Max Elevation</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowRoute;
