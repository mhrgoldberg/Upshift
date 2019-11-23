# UpShift

[Live Link](https://upshift.herokuapp.com/#/)

Upshift, is my take on cloning Strava which allows you to create and track your workout routes and activities. This application was built in 10 days and is a single page app built with a Rails backend, postgress database, and a React and Redux frontend.

<a href="https://ibb.co/3cJjyy3"><img src="https://i.ibb.co/WfTMWWh/Screen-Shot-2019-11-22-at-12-32-21-PM.png" alt="Screen-Shot-2019-11-22-at-12-32-21-PM" border="0"></a>

## Features
* Sign Up/ Sign In/ Log Out
* Workout Feed
* Route creation with the Google Maps API
* Workout tracking

## Challenges

One of the biggest challenges I encountered while building this app was deciding on how I was going to map workout routes and store them in the database. I had considered a few differnet mapping API options but ultimately decided on using Google Maps. I considered two differnt ways of drawing routes on a map. The first option was using markers and a polyline to connect the markers with the Snap to Roads functionality in the Roads API but decided against this due to the lack of context the service provides for transportation mode(cycling or running). I ultimately used the directions service to map between all the different waypoints the user inputs by clicking on the map. This allowed for me to route inteligently based on if the user is trying to map a ride or run. I wrote the below request to the google maps directions service API using the local React state to store all the waypoints of the route and the transportation mode.

```javascript

  calcRoute() {
    const request = {
      origin: this.state.waypoints[0].location,
      destination: this.state.waypoints[this.state.waypoints.length-1].location,
      // this.state.waypoints is an array of all clicks on the map
      waypoints: this.state.waypoints.slice(1, -1),
      // use the state to store the route type
      travelMode: this.state.route_type === 'Running' ? 'WALKING' : 'BICYCLING',
      optimizeWaypoints: false,
      avoidFerries: true,
      avoidHighways: true,
      avoidTolls: true,
    };

    this.directionsService.route(request, (result, status) => {
      if (status == 'OK') {
        this.directionsRenderer.setDirections(result);
        
        //  map all the distances between waypoints to routeDistance array
        const routeLegDistances = result.routes[0].legs.map( leg => (
          leg.distance.value));
        // Set routedistance to the sum of all leg distances
        let routeDistance = routeLegDistance.reduce((a,b) => a + b, 0)
        // convert to miles
        routeDistance = routeDistance / 1609.344;
        // Set the local state of distance to later save to the database
        this.setState( { distance: routeDistance } );
      }
    });
  }

  ```
<a href="https://ibb.co/Jpz0Msh"><img src="https://i.ibb.co/QH6z1K5/Screen-Shot-2019-11-22-at-11-02-07-AM.png" alt="Screen-Shot-2019-11-22-at-11-02-07-AM" border="0"></a>

Another challenge I encountered was deciding on how I was going to store my route data in my database. I initially wanted to store the route data in a gpx(XML format) file. This would allow users to use a common data format supported by most fitness tracking device to upload past workout files and routes directly to the app and have it parsed into google maps latLng route waypoints. With the consideration of time I settled on storing the data as a JSON object converted into a string. In the future I will implement a GPX parsing algorithim to store the data in a more flexible format.


## Built With:
### Technologies
* Ruby on Rails
* PostgreSQL
* HTML
* SCSS/CSS

### Libraries
* React JS
* Redux
* JQuery for AJAX calls
* BCrypt for user authentication
* Google Maps API
  * Google directions service
  * Google elevations service
  * Google static maps


## Future Features
* Ability for users to upload workout data with GPX Files
* Profile picture stored on AWS
* Elevation chart on route show page
* Data visualisation for workout show page

