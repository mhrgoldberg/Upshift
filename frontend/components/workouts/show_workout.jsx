import React from "react";
import { Link } from "react-router-dom";
class ShowWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    // this.getElevationSample = this.getElevationSample.bind(this);
    // this.plotElevation = this.plotElevation.bind(this);
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
        const polarChart = new Chart(myChartRef, {
          type: "polarArea",
          data: {
            labels: ["fatigue", "mood", "motivation", "quality"],
            datasets: [
              {
                label: "subjective workout paramaters",
                data,
                backgroundColor: [
                  "#fd4c01c4",
                  "#007fb6c4",
                  "#c6eac6c4",
                  "#ea4335c4"
                ]
              }
            ]
          },
          options: {
            responsive: true,
            animationDuration: 1000,
            legend: {
              position: "right",
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
          destination: routeData[routeData.length - 1].location,
          waypoints: routeData.slice(1, -1),
          travelMode:
            payload.route.route_type === "Running" ? "WALKING" : "BICYCLING",
          optimizeWaypoints: false,
          avoidFerries: true,
          avoidHighways: true,
          avoidTolls: true
        };

        this.directionsService.route(request, (result, status) => {
          if (status == "OK") {
            this.directionsRenderer.setDirections(result);
          }
        });
        const latLng = routeData.map(point => {
          return {
            lat: point.location.lat,
            lng: point.location.lng
          };
        });
        // this.getElevationSample(latLng, this.elevationService)
      });
  }
  // getElevationSample(path, elevator) {
  //   // Create a PathElevationRequest object using this array.
  //   // Ask for 256 samples along that path.
  //   // Initiate the path request.
  //   elevator.getElevationAlongPath({
  //     'path': path,
  //     'samples': 256
  //   }, this.plotElevation);
  // }

  // Takes an array of ElevationResult objects, draws the path on the map
  // and plots the elevation profile on a Visualization API ColumnChart.
  // plotElevation(elevations, status) {
  //   var chartDiv = document.getElementById('elevation_chart');
  //   if (status !== 'OK') {

  //     chartDiv.innerHTML = 'Cannot show elevation: request failed because ' +
  //         status;
  //     return;
  //   }

  //   // window.google.load('visualization', '1', {packages: ['columnchart']});
  //   this.chart = new google.visualization.ColumnChart(chartDiv);

  //   var data = new google.visualization.DataTable();
  //   data.addColumn('string', 'Sample');
  //   data.addColumn('number', 'Elevation');
  //   for (var i = 0; i < elevations.length; i++) {
  //     data.addRow(['', elevations[i].elevation]);
  //   }

  //   this.chart.draw(data, {
  //     height: 150,
  //     legend: 'none',
  //     titleY: 'Elevation (m)'
  //   });
  // }

  render() {
    const {
      workout_type,
      avg_speed,
      avg_hr,
      comment,
      title,
      duration,
      resting_hr,
      id
    } = this.props.workouts;
    const {
      distance,
      elevation_gain,
      elevation_loss,
      max_elevation
    } = this.props.routes;
    const hours = Math.floor(duration / 60);
    const minutes = ("0" + Math.floor(duration % 60)).slice(-2);
    const seconds = ("0" + Math.round((duration % 1) * 60)).slice(-2);
    const icon =
      workout_type === "Cycling" ? (
        <i className="fas fa-biking"></i>
      ) : (
        <i className="fas fa-running"></i>
      );

    return (
      <div className="show-workout-container">
        <div className="routes-sub-header">
          <h1>
            {icon} {title}
          </h1>
          <div className="workout-header-buttons">
            <Link to="/workouts">
              <button>All Workouts</button>
            </Link>
            <Link to={`/workout/edit/${id}`}>
              <button>Edit Workout</button>
            </Link>
          </div>
        </div>
        <div className="workout-border">
          <div className="workout-show-data">
            <ul>
              <li key="Duration">
                <div className="data">
                  {hours}:{minutes}:{seconds}
                </div>
                <div className="data-title">Duration</div>
              </li>
              <li key="dist">
                <div className="data">{distance.toFixed(2)} mi</div>
                <div className="data-title">Distance</div>
              </li>
              <li key="avg-speed">
                <div className="data">{avg_speed.toFixed(2)} mph</div>
                <div className="data-title">Avg Speed</div>
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
              <li key="avg-hr">
                <div className="data">{avg_hr} bpm</div>
                <div className="data-title">Avg HR</div>
              </li>
              <li key="resting-hr">
                <div className="data">{resting_hr} bpm</div>
                <div className="data-title">Resting HR</div>
              </li>
            </ul>
          </div>
          <div className="workout-row">
            <div className="workout-map">
              <div id="map" ref="map" />
              <div id="elevation_chart"></div>
            </div>

            <div className="subjective-polar-chart">
              <canvas id="myChart" ref={this.chartRef} />
              <h3>Comment</h3>
              <div className="workout-comment">
                <p>{comment}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowWorkout;
