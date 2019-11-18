import React from 'react';

const RouteDataDisplay = (props) => {
  const {distance, elevation_gain, elevation_loss, max_elevation} = props;
  return (
    <div className="data-display">
      <ul>
        <li key="dist">
          <div className="data">{distance.toFixed(2)} mi</div>
          <div className="data-title">Distance</div>
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
      </ul>
    </div>
  )
}

export default RouteDataDisplay;