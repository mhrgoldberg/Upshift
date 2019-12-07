import React from "react";

class ShowWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();

  }

  componentDidMount() {
    // grabbing canvas element off page
    const myChartRef = this.chartRef.current.getContext("2d");
    // Fetching workout
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.elevationService = new google.maps.ElevationService();

    const mapOptions = {
      center: { lat: 37.7758, lng: -122.435 },
      zoom: 15
    };
    this.directionsRenderer.setOptions({
      preserveViewport: true
    });
    this.map = new google.maps.Map(this.refs.map, mapOptions);
    this.directionsRenderer.setMap(this.map);

    this.props
      .fetchWorkout(this.props.match.params.workoutId)
      .then(payload => {
        // setting chart options
        const route = this.props.fetchRoute(payload.workout.route_id);
        let fatigue = 0;
        let mood = 0;
        let motivation = 0;
        let quality = 0;
        if (payload.workout) {
          fatigue = payload.workout.fatigue;
          mood = payload.workout.mood;
          motivation = payload.workout.motivation;
          quality = payload.workout.quality;
        }

        const data = [fatigue, mood, motivation, quality];
        new Chart(myChartRef, {
          type: "polarArea",
          data: {
            labels: ["fatigue", "mood", "motivation", "quality"],
            datasets: [
              {
                label: "subjective workout paramaters",
                data,
                backgroundColor: ["#fd4c01", "#2867b2", "green", "red"]
              }
            ]
          },
          options: {
            responsive: true,
            legend: {
              position: "left",
              labels: {
                usePointStyle: true
              }
            }
          }
        });
        return route;
      })
      .then(payload => {
        var routeData = JSON.parse(payload.route.data);
        var markers = routeData.map(marker => {
          return new google.maps.LatLng(marker.location);
        });
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(marker => bounds.extend(marker));
        this.map.setCenter(bounds.getCenter());
        this.map.fitBounds(bounds);
        
        const request = {
          origin: routeData[0].location,
          destination: routeData[routeData.length-1].location,
          waypoints: routeData.slice(1, -1),
          travelMode: this.props.route.route_type === 'Running' ? 'WALKING' : 'BICYCLING',
          optimizeWaypoints: false,
          avoidFerries: true,
          avoidHighways: true,
          avoidTolls: true,
        };
    
        this.directionsService.route(request, (result, status) => {
          if (status == 'OK') {   
            this.directionsRenderer.setDirections(result);
          }
        });

      });
  }


  render() {
    // const {} = this.props.workout;
    // const {} = this.props.route;
    return (
      <div>
        <div id="map" ref='map' />
        <div className="subjective-polar-chart">
          
          <canvas id="myChart" ref={this.chartRef} />
        </div>
      </div>
    );
  }
}

export default ShowWorkout;

// function initMap() {
//   // The following path marks a path from Mt. Whitney, the highest point in the
//   // continental United States to Badwater, Death Valley, the lowest point.
//   var path = JSON.parse(this.props.data);
//   var map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 8,
//     center: path[1],
//     mapTypeId: "terrain"
//   });

//   // Create an ElevationService.
//   var elevator = new google.maps.ElevationService();

//   // Draw the path, using the Visualization API and the Elevation service.
//   displayPathElevation(path, elevator, map);
// }

// function displayPathElevation(path, elevator, map) {
//   // Display a polyline of the elevation path.
//   new google.maps.Polyline({
//     path: path,
//     strokeColor: "#0000CC",
//     strokeOpacity: 0.4,
//     map: map
//   });

//   // Create a PathElevationRequest object using this array.
//   // Ask for 256 samples along that path.
//   // Initiate the path request.
//   elevator.getElevationAlongPath(
//     {
//       path: path,
//       samples: 256
//     },
//     plotElevation
//   );
// }
// // Takes an array of ElevationResult objects, draws the path on the map
// // and plots the elevation profile on a Visualization API ColumnChart.
// function plotElevation(elevations, status) {
//   var chartDiv = document.getElementById("elevation_chart");
//   if (status !== "OK") {
//     // Show the error code inside the chartDiv.
//     chartDiv.innerHTML =
//       "Cannot show elevation: request failed because " + status;
//     return;
//   }
//   // Create a new chart in the elevation_chart DIV.
//   var chart = new google.visualization.ColumnChart(chartDiv);

//   // Extract the data from which to populate the chart.
//   // Because the samples are equidistant, the 'Sample'
//   // column here does double duty as distance along the
//   // X axis.
//   var data = new google.visualization.DataTable();
//   data.addColumn("string", "Sample");
//   data.addColumn("number", "Elevation");
//   for (var i = 0; i < elevations.length; i++) {
//     data.addRow(["", elevations[i].elevation]);
//   }

//   // Draw the chart using the data within its DIV.
//   chart.draw(data, {
//     height: 150,
//     legend: "none",
//     titleY: "Elevation (m)"
//   });
// }
