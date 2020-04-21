export const postRoute = (route) =>
  $.ajax({
    method: "POST",
    url: "/api/routes",
    data: { route },
  });

export const getAllRoutes = () =>
  $.ajax({
    method: "GET",
    url: "/api/routes",
  });

export const getRoute = (routeId) =>
  $.ajax({
    method: "GET",
    url: `/api/routes/${routeId}`,
  });
