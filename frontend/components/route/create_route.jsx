import React from 'react';

class CreateRoute extends React.Component {

  constructor(props) {
    super(props);
    this.markerTrack = [];
    this.addMarker = this.addMarker.bind(this);
    this.drawPolyline = this.drawPolyline.bind(this);
  }

  componentDidMount() {
    const mapOptions = {
      center: { lat: 37.7758, lng: -122.435 }, // this is SF
      zoom: 15
    };

    this.map = new google.maps.Map(this.refs.map, mapOptions);

    google.maps.event.addListener(this.map, 'click', (e) => {
      this.addMarker(e.latLng);
    });
  }

  addMarker(latLng) {
    let marker = new google.maps.Marker({
        map: this.map,
        position: latLng,
        draggable: true
    });
    this.markerTrack.push(marker);
    // marker.addListener('position_changed', function() {
    //   drawPolyline();
    // });
    //store the marker object drawn in global array
  }

  drawPolyline() {
    let markersPositionArray = [];
    // obtain latlng of all markers on map
    markersArray.forEach(function(e) {
      markersPositionArray.push(e.getPosition());
    });
    // draw new polyline at markers' position
    polyline = new google.maps.Polyline({
      map: map,
      path: markersPositionArray,
      strokeOpacity: 0.4
    });
  }

  // componentDidUpdate() {
  //   this.MarkerManager.updateMarkers(this.props.benches);
  // }

  render() {
    return (
      <div id="map-container" ref='map' /> 
    )
  }
}

export default CreateRoute;