import React from 'react';

class RouteIndex extends React.Component {

  componentDidMount() {
    this.props.fetchAllRoutes();
  }

  render() {
    return(
      <div>
        <ul>
          {this.props.routes.map( route => (
            <li key={route.id}>{route.title}</li>
          ))}
        </ul>
      </div>
    )
  }

}

export default RouteIndex;