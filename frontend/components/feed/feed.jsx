import React from 'react';
import FeedItem from './feed_item';

class Feed extends React.Component {

  componentDidMount() {
    this.props.fetchUserFeed();
  }


  render() {

    // if (!this.props.currentUser) {
    //   return null;
    // }
    // if (!this.props.workouts) {
    //   return null;
    // }

    const {currentUser, workouts, routes, users} = this.props;
    
    return (
      <div className="feed-container">
        <div className="feed-left">
          {currentUser.username}
          {currentUser.primary_sport}
        </div>
        <div className="feed-center">
          {workouts.map(workout => {
            return(
              <FeedItem 
                workout={workout} 
                route={routes[workout.route_id]}
                user={users[workout.user_id]}
              />
            )
          })}
        </div>
        <div className="feed-right">
          Right
        </div>
      </div>
    )
  }
}

export default Feed;