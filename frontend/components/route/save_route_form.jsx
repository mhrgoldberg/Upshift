import React from 'react';
import { withRouter } from 'react-router-dom';

class SaveRouteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.currentUserId,
      route_type: this.props.routeInfo.route_type,
      data: JSON.stringify(this.props.routeInfo.waypoints),
      distance: this.props.routeInfo.distance,
      elevation_gain: this.props.routeInfo.elevation_gain,
      elevation_loss: this.props.routeInfo.elevation_loss,
      max_elevation: this.props.routeInfo.max_elevation,
      title: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createRoute(this.state)
    .then(route => {
        this.props.closeModal();
        // this.props.history.push(`/routes/${route.id}`)
    })
  }

  update(type) {
    return (e) => this.setState( {[type]: e.currentTarget.value } )
  }

  render(){
    const { errors } = this.props;

    const err =  <ul className="errors">
      { errors.map( (error, i) => {
        return <li key={i}>{error}</li>
      })}
    </ul>

    return (
      <div className='save-route-modal'>
        <h2>Save Route</h2>
        <br/>
        <div className="route-errors">{err}</div>
        <br/>
        <form onSubmit={this.handleSubmit}>
          <input type="text" 
            onChange={this.update('title')} 
            value={this.state.title} 
            placeholder="Title"
          />
          <br/>
          <button>Save</button>
        </form>
      </div>
    )
  }
}

export default withRouter(SaveRouteForm);