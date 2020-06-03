import React from "react";
import { Link } from "react-router-dom";

class ShowRoute extends React.Component {
  constructor(props) {
    super(props);
    this.calcRoute = this.calcRoute.bind(this);
  }

  componentDidMount() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.elevationService = new google.maps.ElevationService();

    const mapOptions = {
      center: { lat: 37.7758, lng: -122.435 },
      zoom: 15,
    };
    this.directionsRenderer.setOptions({
      preserveViewport: true,
    });
    this.map = new google.maps.Map(this.refs.map, mapOptions);
    this.directionsRenderer.setMap(this.map);
    this.props.fetchRoute(this.props.match.params.routeId).then(() => {
      var routeData = JSON.parse(this.props.route.data);
      debugger;
      var markers = routeData.map((marker) => {
        return new google.maps.LatLng(marker.location);
      });
      const bounds = new google.maps.LatLngBounds();
      markers.forEach((marker) => bounds.extend(marker));
      this.map.setCenter(bounds.getCenter());
      this.map.fitBounds(bounds);
      this.calcRoute();
    });
  }

  calcRoute() {
    var routeData = JSON.parse(this.props.route.data);
    debugger
    const request = {
      origin: routeData[0].location,
      destination: routeData[routeData.length - 1].location,
      waypoints: routeData.slice(1, -1),
      travelMode:
        this.props.route.route_type === "Running" ? "WALKING" : "BICYCLING",
      optimizeWaypoints: false,
      avoidFerries: true,
      avoidHighways: true,
      avoidTolls: true,
    };

    this.directionsService.route(request, (result, status) => {
      if (status == "OK") {
        this.directionsRenderer.setDirections(result);
      }
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
