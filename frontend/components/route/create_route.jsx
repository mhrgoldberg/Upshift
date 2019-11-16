import React from 'react';

class CreateRoute extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      workout_mode: "WALKING",
      markerTrack: []
    }
    this.addMarker = this.addMarker.bind(this);
    this.calcRoute = this.calcRoute.bind(this);
    // this.drawPolyline = this.drawPolyline.bind(this);
  }

  componentDidMount() {
    const mapOptions = {
      center: { lat: 37.7758, lng: -122.435 }, // this is SF
      zoom: 15
    };
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.map = new google.maps.Map(this.refs.map, mapOptions);
    this.directionsRenderer.setMap(this.map);
    google.maps.event.addListener(this.map, 'click', (e) => {
      this.addMarker(e.latLng);
      this.calcRoute()
    });
  }

  calcRoute() {
    const request = {
      origin: this.state.markerTrack[0].position,
      destination: this.state.markerTrack[this.state.markerTrack.length-1].position,
      travelMode: this.state.workout_mode,
      avoidFerries: true,
      avoidHighways: true,
      avoidTolls: true,
    };

    this.directionsService.route(request, (result, status) => {
      if (status == 'OK') {
        this.directionsRenderer.setDirections(result);
      }
    })
  }

  addMarker(latLng) {
    let marker = new google.maps.Marker({
        map: this.map,
        position: latLng,
    });
    let markerTrack = [...this.state.markerTrack];
    markerTrack.push(marker);
    this.setState({ markerTrack });
  }

  // drawPolyline() {
  //   let road = new google.maps.Polyline({
  //     path: this.markerTrack,
  //     strokeColor: "#FF0000",
  //     strokeOpacity: 1,
  //     strokeWeight: 2
  //   });
  //   road.setMap(this.map);
  // }

  render() {
    return (
      <div id="map-container" ref='map' /> 
    )
  }
}

export default CreateRoute;