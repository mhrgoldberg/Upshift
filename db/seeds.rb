# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

user1 = User.create(
  username: "MitchellReiss",
  password: "fastrider23",
  age: 29,
  city: "San Francisco",
  gender: "male",
  state: "CA",
  country: "USA",
  primary_sport: "multisport"
)

Route.destroy_all

# route_data1 = File.read("/Users/Mitchell/Desktop/app_academy/aa-projects/strava_clone/upshift/app/assets/gpx_data/bike_ride_gpx.xml")


route1 = Route.create(
  user_id: user1.id,
  distance: 20,
  title: "My First Run",
  route_type: "Running",
  elevation_gain: 42,
  elevation_loss: -26,
  max_elevation: 76,
  data:  "[{\"location\":{\"lat\":37.77339906551828,\"lng\":-122.4294954254658}},{\"location\":{\"lat\":37.78272702221117,\"lng\":-122.43056830907176}},{\"location\":{\"lat\":37.783371455747826,\"lng\":-122.4454170181782}}]"
)
route2 = Route.create(
  user_id: user1.id,
  distance: 1.94054223335719,
  title: "My First Run",
  route_type: "Running",
  elevation_gain: 42,
  elevation_loss: -26,
  max_elevation: 76,
  data:  "[{\"location\":{\"lat\":37.77339906551828,\"lng\":-122.4294954254658}},{\"location\":{\"lat\":37.78272702221117,\"lng\":-122.43056830907176}},{\"location\":{\"lat\":37.783371455747826,\"lng\":-122.4454170181782}}]"
)

  route3 = Route.create(
  user_id: user1.id,
  distance: 3.29388869005011,
  title: "Golden Gate Stroll",
  route_type: "Running",
  elevation_gain: 32,
  elevation_loss: 0,
  max_elevation: 77,
  data: "[{\"location\":{\"lat\":37.78306719152782,\"lng\":-122.4394846534729}},{\"location\":{\"lat\":37.77234857444063,\"lng\":-122.46737883290837}},{\"location\":{\"lat\":37.76919371793796,\"lng\":-122.47076914510319}},{\"location\":{\"lat\":37.76656456803042,\"lng\":-122.4660699149091}},{\"location\":{\"lat\":37.768633971273445,\"lng\":-122.45999739369938}}]"
  )

  route4 = Route.create(
    user_id: user1.id,
    distance: 3.85498687664042,
    title: "gg 4",
    route_type: "Running",
    elevation_gain: 24,
    elevation_loss: 0,
    max_elevation: 64,
    data: "[{\"location\":{\"lat\":37.78282433414079,\"lng\":-122.43507385253906}},{\"location\":{\"lat\":37.76690609912827,\"lng\":-122.47924571990967}},{\"location\":{\"lat\":37.771282289648255,\"lng\":-122.48744255065918}}]",
  )