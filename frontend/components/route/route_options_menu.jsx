import React from 'react';

const RouteOptionsMenu = (props) => {
  const {setRouteTypeToRunning, setRouteTypeToCycling, save} = props;

  return(
    <div className="route-options">
      <div className="left-buttons">
        <div className="route-type" onClick={setRouteTypeToCycling}>
          <i className="fas fa-biking"></i>
        </div>
        <div className="route-type" onClick={setRouteTypeToRunning}>
          <i className="fas fa-running"></i>
        </div>
      </div>
      <div className="right-buttons">
        <button className="save" onClick={save}>Save</button>
      </div>
    </div>
  )
}

export default RouteOptionsMenu;