export const getUserFeed = () =>
  $.ajax({
    method: "GET",
    url: "/api/users",
  });

// export const getUser = userId => (
//   $.ajax({
//     method: 'GET',
//     url: `/api/users/${userId}`,
//   })
// )
