import { getUserFeed } from "../util/user_api_util";

export const RECEIVE_USER_FEED = "RECEIVE_USER_FEED";
// export const RECEIVE_USER = "RECEIVE_USER";

const receiveUserFeed = payload => ({
  type: RECEIVE_USER_FEED,
  workouts: payload.workouts,
  routes: payload.routes,
  users: payload.users
})

// const receiveUser = payload => ({
//   type: RECEIVE_USER,
//   user: payload.user,
//   workouts: payload.workouts
// })


export const fetchUserFeed = () => dispatch => {
  return getUserFeed()
  .then( payload => dispatch(receiveUserFeed(payload)))
}

