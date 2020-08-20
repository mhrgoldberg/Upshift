import React from "react";
import RouteDataDisplay from "./route_data_display";
import RouteOptionsMenu from "./route_options_menu";
import RouteSaveModal from "./route_save_modal";

class CreateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route_type: "Running",
      waypoints: [],
      polyline: "",
      path: [],
      elevationSamples: [],
      distance: 0,
      elevation_gain: 0,
      elevation_loss: 0,
      max_elevation: 0,
      currentIndex: 0,
    };
    this.startMarker = null;
    this.metersToFeet = (meters) => meters * 3.28084;
    this.addWaypoints = this.addWaypoints.bind(this);
    this.calcRoute = this.calcRoute.bind(this);
    this.getElevation = this.getElevation.bind(this);
    this.setRouteTypeToCycling = this.setRouteTypeToCycling.bind(this);
    this.setRouteTypeToRunning = this.setRouteTypeToRunning.bind(this);
    this.calcElevationGain = this.calcElevationGain.bind(this);
    this.calcElevationLoss = this.calcElevationLoss.bind(this);
    this.calcMaxElevation = this.calcMaxElevation.bind(this);
    this.calcAllElevationStats = this.calcAllElevationStats.bind(this);
    this.getElevationAlongPath = this.getElevationAlongPath.bind(this);
    this.updateElevation = this.updateElevation.bind(this);
    this.placeStartMarker = this.placeStartMarker.bind(this);
    this.removeStartMarker = this.removeStartMarker.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    const mapOptions = {
      center: { lat: 37.7758, lng: -122.435 }, // this is SF
      zoom: 15,
    };
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.elevationService = new google.maps.ElevationService();
    this.directionsRenderer.setOptions({
      preserveViewport: true,
    });
    this.map = new google.maps.Map(this.refs.map, mapOptions);
    this.directionsRenderer.setMap(this.map);
    google.maps.event.addListener(this.map, "click", (e) => {
      this.addWaypoints(e.latLng);
      this.calcRoute();
    });
  }
  // UI methods
  save(e) {
    e.preventDefault();
    if (this.state.waypoints.length > 1) {
      this.props.openModal("saveRoute");
    } else {
      alert("Route must have at least two waypoints!");
    }
  }

  setRouteTypeToRunning() {
    this.setState({ route_type: "Running" });
  }

  setRouteTypeToCycling() {
    this.setState({ route_type: "Cycling" });
  }

  // Draw Route Methods:

  calcRoute() {
    if (this.state.waypoints.length === 1) {
      this.placeStartMarker();
      this.calcAllElevationStats();
    } else if (this.state.waypoints.length === 2) {
      this.removeStartMarker();
    }
    if (this.state.waypoints.length > 1) { 
      const request = {
        origin: this.state.waypoints[0].location,
        destination: this.state.waypoints[this.state.waypoints.length - 1]
          .location,
        // this.state.waypoints is an array of all clicks on the map
        waypoints: this.state.waypoints.slice(1, -1),
        // use the state to store the route type
        travelMode:
          this.state.route_type === "Running" ? "WALKING" : "BICYCLING",
        optimizeWaypoints: false,
        avoidFerries: true,
        avoidHighways: true,
        avoidTolls: true,
      };

      this.directionsService.route(request, (result, status) => {
        if (status == "OK") {
          this.directionsRenderer.setDirections(result);
          // Set distance to the sum of all leg distances and convert to miles

          this.setState(
            {
              distance:
                result.routes[0].legs
                  .map((leg) => leg.distance.value)
                  .reduce((a, b) => a + b, 0) / 1609.344,
              polyline: result.routes[0].overview_polyline,
              path: result.routes[0].overview_path.map((ele) => ({
                lat: ele.lat(),
                lng: ele.lng(),
              })),
            },
            () => {
              this.updateElevation(result.routes[0].overview_path);
            }
          );
        }
      });
    }
  }

  placeStartMarker() {
    this.startMarker = new google.maps.Marker({
      position: this.state.waypoints[0].location,
      label: {text: "A", color: "white"},
      map: this.map
    });
    this.updateElevation(this.state.waypoints);
  }

  removeStartMarker() {
    this.startMarker.setMap(null);
  }

  addWaypoints(latLng) {
    let waypoints = [...this.state.waypoints];
    waypoints.push({
      location: { lat: latLng.lat(), lng: latLng.lng() },
    });
    this.setState({ waypoints });
  }

  // Elevation Methods:

  updateElevation(path) {
    if (this.state.path.length > 1) {
      this.getElevationAlongPath(path);
    } else {
      this.getElevation(path[0].location);
    }
  }

  getElevationAlongPath(path) {
    this.elevationService.getElevationAlongPath(
      { path: path.slice(this.state.currentIndex), samples: 100 },
      (results, status) => {
        if (status === "OK") {
          const elevationSamples = results.map(({ elevation }) =>
            this.metersToFeet(elevation)
          );
          this.setState(
            {
              elevationSamples: [
                ...this.state.elevationSamples,
                ...elevationSamples,
              ],
              currentIndex: path.length - 1,
            },
            this.calcAllElevationStats
          );
        }
      }
    );
  }

  getElevation(location) {
    this.elevationService.getElevationForLocations(
      {
        locations: [location],
      },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            this.setState(
              {
                elevationSamples: [results[0].elevation],
                max_elevation: Math.floor(results[0].elevation)
              }
            );
          }
        }
      }
    );
  }

  calcAllElevationStats() {
    if (this.state.elevationSamples.length > 1) {
      this.calcElevationGain();
      this.calcElevationLoss();
      this.calcMaxElevation();
    }
  }

  calcElevationGain() {
    let gain = 0;
    for (let i = 0; i < this.state.elevationSamples.length - 1; i++) {
      let current = this.state.elevationSamples[i];
      let next = this.state.elevationSamples[i + 1];
      if (current < next) {
        gain += next - current;
      }
    }
    this.setState({ elevation_gain: Math.floor(gain) });
  }

  calcElevationLoss() {
    let loss = 0;
    for (let i = 0; i < this.state.elevationSamples.length - 1; i++) {
      let current = this.state.elevationSamples[i];
      let next = this.state.elevationSamples[i + 1];
      if (current > next) {
        loss -= current - next;
      }
    }
    this.setState({ elevation_loss: Math.floor(loss) });
  }

  calcMaxElevation() {
    this.setState({
      max_elevation: Math.floor(Math.max(...this.state.elevationSamples)),
    });
  }

  render() {
    return (
      <div>
        <RouteSaveModal routeInfo={this.state} />
        <RouteOptionsMenu
          save={this.save}
          setRouteTypeToRunning={this.setRouteTypeToRunning}
          setRouteTypeToCycling={this.setRouteTypeToCycling}
        />
        <div id="map-container" ref="map" />
        <RouteDataDisplay
          route_type={this.state.route_type}
          distance={this.state.distance}
          elevation_gain={this.state.elevation_gain}
          elevation_loss={this.state.elevation_loss}
          max_elevation={this.state.max_elevation}
        />
      </div>
    );
  }
}

export default CreateRoute;
