import React from 'react';
import RouteDataDisplay from './route_data_display';

class CreateRoute extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      route_type: "WALKING",
      waypoints: [],
      distance: 0,
      elevation_gain: 0,
      elevation_loss: 0,
      max_elevation: 0,
    }
    this.elevations = [];
    this.addWaypoints = this.addWaypoints.bind(this);
    this.calcRoute = this.calcRoute.bind(this);
    this.getElevation = this.getElevation.bind(this);
    this.setRouteTypeToCycling = this.setRouteTypeToCycling.bind(this);
    this.setRouteTypeToRunning = this.setRouteTypeToRunning.bind(this);
    this.calcElevationGain = this.calcElevationGain.bind(this);
    this.calcElevationLoss = this.calcElevationLoss.bind(this);
    this.calcMaxElevation = this.calcMaxElevation.bind(this);
    this.calcAllElevationStats = this.calcAllElevationStats.bind(this);

  }



  componentDidMount() {
    const mapOptions = {
      center: { lat: 37.7758, lng: -122.435 }, // this is SF
      zoom: 15
    };
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.elevationService = new google.maps.ElevationService;
    this.directionsRenderer.setOptions({
      preserveViewport: true
    })
    this.map = new google.maps.Map(this.refs.map, mapOptions);
    this.directionsRenderer.setMap(this.map);
    google.maps.event.addListener(this.map, 'click', (e) => {
      this.addWaypoints(e.latLng);
      this.calcRoute();
      this.getElevation(e.latLng, this.elevationService);
    });
  }


  setRouteTypeToRunning() {
    this.setState( { route_type: "WALKING" } )
  }

  setRouteTypeToCycling() {
    this.setState( { route_type: "BICYCLING" } )
  }

  calcRoute() {
    const request = {
      origin: this.state.waypoints[0].location,
      destination: this.state.waypoints[this.state.waypoints.length-1].location,
      waypoints: this.state.waypoints.slice(1, -1),
      travelMode: this.state.route_type,
      optimizeWaypoints: false,
      avoidFerries: true,
      avoidHighways: true,
      avoidTolls: true,
    };

    this.directionsService.route(request, (result, status) => {
      if (status == 'OK') {
        this.directionsRenderer.setDirections(result);
        // Set distance to the sum of all leg distances and convert to miles
        this.setState({distance: result.routes[0].legs.map( leg => (
          leg.distance.value)).reduce((a,b) => a + b, 0)/1609.344});
      }
    });
  }

  addWaypoints(latLng) {
    let waypoints = [...this.state.waypoints];
    waypoints.push({
      location: {lat: latLng.lat(), lng: latLng.lng()},
      // stopover: true
    });
    this.setState({ waypoints }); 
  }

  getElevation(location, elevationService) {
    elevationService.getElevationForLocations({
      locations: [location]
    }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.elevations.push(Math.floor(results[0].elevation));
          this.calcAllElevationStats();
        } 
      }
    });
  }

  calcAllElevationStats() {
    this.calcElevationGain();
    this.calcElevationLoss();
    this.calcMaxElevation();
  }

  calcElevationGain() {
    let gain = 0;
    
    for (let i = 0; i < this.elevations.length-1; i++) {
      if (this.elevations[i] < this.elevations[i+1]) {
        gain += (this.elevations[i+1] - this.elevations[i]);
      }
    }
    this.setState({elevation_gain: gain })
  }

  calcElevationLoss() {
    let loss = 0;
    for (let i = 0; i < this.elevations.length-1; i++) {
      if (this.elevations[i] > this.elevations[i+1]) {
        loss += (this.elevations[i+1] - this.elevations[i]);
      }
    }
    this.setState({ elevation_loss: loss })
  }

  calcMaxElevation() {
    this.setState({ max_elevation: Math.max(...this.elevations) })
  }


  render() {
    return (
      <div>
      <div id="map-container" ref='map' /> 
      <RouteDataDisplay 
        distance={this.state.distance}
        elevation_gain={this.state.elevation_gain}
        elevation_loss={this.state.elevation_loss}
        max_elevation={this.state.max_elevation}
      />
      </div>
    )
  }
}

export default CreateRoute;