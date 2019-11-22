import React from 'react';
import FeedItem from './feed_item';

class Feed extends React.Component {

  componentDidMount() {
    this.props.fetchUserFeed();
  }


  render() {

    const {currentUser, workouts, routes, users} = this.props;
    
    return (
      <div className="feed-background">
        <div className="feed-container">
          <div className="feed-left">
            <div className="feed-user-data">
              <div className="user-info">
                <div className="profile_pic"></div>
              <h3>{currentUser.username}</h3>
            </div>
            <div className="workout-data">
              <div className="data">{currentUser.city}, {currentUser.state}</div>
            </div>
            <div className="workout-data">
              <div className="data">{workouts.length}</div>
              <div className="data-title">Total Workouts</div>
            </div>
            </div>
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
            <div className="feed-right-links">
              <h3>Follow me on GitHub</h3>
              <a href="https://github.com/mitchellreiss" className="github-logo"></a>
              <h3>Connect with me on LinkedIn</h3>
              <a href="https://www.linkedin.com/in/mitchell-reiss/" className="linkedin-logo"></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Feed;