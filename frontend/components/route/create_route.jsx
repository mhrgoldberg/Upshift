import React from 'react';

class CreateRoute extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      workout_mode: "WALKING",
      waypoints: [],
      distance: 0
    }
    this.addWaypoints = this.addWaypoints.bind(this);
    this.calcRoute = this.calcRoute.bind(this);
    this.getElevation = this.getElevation.bind(this);

  }


  componentDidMount() {
    const mapOptions = {
      center: { lat: 37.7758, lng: -122.435 }, // this is SF
      zoom: 15
    };
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setOptions({
      preserveViewport: true
    })
    this.map = new google.maps.Map(this.refs.map, mapOptions);
    this.directionsRenderer.setMap(this.map);
    google.maps.event.addListener(this.map, 'click', (e) => {
      this.addWaypoints(e.latLng);
      this.calcRoute()
    });
  }

  calcRoute() {
    const request = {
      origin: this.state.waypoints[0].location,
      destination: this.state.waypoints[this.state.waypoints.length-1].location,
      waypoints: this.state.waypoints.slice(1, -1),
      travelMode: this.state.workout_mode,
      optimizeWaypoints: false,
      avoidFerries: true,
      avoidHighways: true,
      avoidTolls: true,
    };

    this.directionsService.route(request, (result, status) => {
      if (status == 'OK') {
        this.directionsRenderer.setDirections(result);
        // Set distance to sum of all distances converted from meters to miles
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

  getElevation(location, elevator) {
    elevator.getElevationForLocations({
      locations: [location]
    }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
            results[0].elevation 
        } 
      }
    });
  }


  render() {
    return (
      <div id="map-container" ref='map' /> 
    )
  }
}

export default CreateRoute;