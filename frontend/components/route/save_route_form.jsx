import React from "react";
import { withRouter } from "react-router-dom";

class SaveRouteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.currentUserId,
      route_type: this.props.routeInfo.route_type,
      data: this.props.routeInfo.waypoints,
      distance: this.props.routeInfo.distance,
      elevation_gain: this.props.routeInfo.elevation_gain,
      elevation_loss: this.props.routeInfo.elevation_loss,
      max_elevation: this.props.routeInfo.max_elevation,
      title: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.createPolylineAndSave = this.createPolylineAndSave.bind(this);
  }

  createPolylineAndSave() {
    const path = this.state.data
      .map(
        (waypoint) => `${waypoint["location"].lat},${waypoint["location"].lng}`
      )
      .join("|");
    $.ajax({
      method: "GET",
      url: `https://roads.googleapis.com/v1/snapToRoads?path=${path}&interpolate=true&key=${window.googleAPIKey}`,
    }).then((response) => {
      const newData = response.snappedPoints.map((point) => ({
        location: {
          lat: point.location.latitude,
          lng: point.location.longitude,
        },
      }));
      debugger;
      this.setState({ data: JSON.stringify(newData) }, () => {
        this.props.createRoute(this.state).then((payload) => {
          debugger;
          this.props.closeModal();
          this.props.history.push(`/route/${payload.route.id}`);
        });
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.createPolylineAndSave();
  }

  update(type) {
    return (e) => this.setState({ [type]: e.currentTarget.value });
  }

  render() {
    const { errors } = this.props;

    const err = (
      <ul className="errors">
        {errors.map((error, i) => {
          return <li key={i}>{error}</li>;
        })}
      </ul>
    );

    return (
      <div className="save-route-modal">
        <h2>Save Route</h2>
        <br />
        <div className="route-errors">{err}</div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.update("title")}
            value={this.state.title}
            placeholder="Title"
          />
          <br />
          <button>Save</button>
        </form>
      </div>
    );
  }
}

export default withRouter(SaveRouteForm);
