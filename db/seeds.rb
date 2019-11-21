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
  distance: 31.129453988706,
  title: "Redwood Pinehurst Loop",
  route_type: "Cycling",
  elevation_gain: 214,
  elevation_loss: -220,
  max_elevation: 266,
  data:
   "[{\"location\":{\"lat\":37.70843516826899,\"lng\":-122.07325276812043}},{\"location\":{\"lat\":37.8017416904958,\"lng\":-122.13617957287823}},{\"location\":{\"lat\":37.83855511201982,\"lng\":-122.18012488537823}},{\"location\":{\"lat\":37.803919870172294,\"lng\":-122.17124496199074}},{\"location\":{\"lat\":37.70758384900682,\"lng\":-122.07397465199568}}]",
)

route2 = Route.create(
  user_id: user1.id,
  distance: 1.94054223335719,
  title: "Short Run in the Park",
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

  route5 = Route.create(
    user_id: user1.id,
    distance: 11.3114411834884,
    title: "Ride to Treasure Island",
    route_type: "Cycling",
    elevation_gain: 48,
    elevation_loss: -49,
    max_elevation: 52,
    data:
    "[{\"location\":{\"lat\":37.83672148758919,\"lng\":-122.29545788024933}},{\"location\":{\"lat\":37.81041590160507,\"lng\":-122.36412243103058}},{\"location\":{\"lat\":37.83739934266353,\"lng\":-122.29322628234894}}]",
  )

  route6 = Route.create(
    user_id: user1.id,
    distance: 34.7066879424163,
    title: "Bart to Mt. Diablo",
    route_type: "Cycling",
    elevation_gain: 849,
    elevation_loss: -854,
    max_elevation: 902,
    data:
    "[{\"location\":{\"lat\":37.90571535671098,\"lng\":-122.06660942819991}},{\"location\":{\"lat\":37.893775662753654,\"lng\":-121.98578174564511}},{\"location\":{\"lat\":37.88375044331243,\"lng\":-121.97342212650449}},{\"location\":{\"lat\":37.875756384967644,\"lng\":-121.92964847538144}},{\"location\":{\"lat\":37.852175635307105,\"lng\":-121.92673023197324}},{\"location\":{\"lat\":37.8314346045102,\"lng\":-121.95162113163144}},{\"location\":{\"lat\":37.86202968578771,\"lng\":-122.0396527140839}},{\"location\":{\"lat\":37.90321780300551,\"lng\":-122.06729019577335}}]",
  )

  Workout.destroy_all

  workout1 = Workout.create(
    user_id: user1.id,
    route_id: route1.id,
    title: "Redwood Ride",
    workout_type: "Cycling",
    duration: 142.34,
    avg_speed: 16.8697864189307,
    avg_hr: 148,
    resting_hr: 64,
    fatigue: 2,
    mood: 4,
    motivation: 4,
    quality: 5,
    comment: "Great ride through the redwood forests. Gotta love California!",
  )


  workout2 = Workout.create(
    user_id: user1.id,
    route_id: route2.id,
    title: "Fun Run in the Park",
    workout_type: "Running",
    duration: 22.08,
    avg_speed: 0.0878868765107423,
    avg_hr: 168,
    resting_hr: 54,
    fatigue: 2,
    mood: 3,
    motivation: 4,
    quality: 2,
    comment: "Golden Gate Park is the best!",
  )

  workout3 = Workout.create(
    user_id: user1.id,
    route_id: route5.id,
    title: "Ride on the Bay Bridge",
    workout_type: "Cycling",
    duration: 92.1,
    avg_speed: 12.122816950960786,
    avg_hr: 124,
    resting_hr: 63,
    fatigue: 4,
    mood: 4,
    motivation: 2,
    quality: 2,
    comment: "I wasn't very motivated today, but I had some friends to ride with so that helped me get out of bed and on the bike!",
  )

  workout4 = Workout.create(
    user_id: user1.id,
    route_id: route6.id,
    title: "Ride up Mt. Diablo",
    workout_type: "Cycling",
    duration: 153.0,
    avg_speed: 13.6104658597711,
    avg_hr: 144,
    resting_hr: 54,
    fatigue: 4,
    mood: 5,
    motivation: 5,
    quality: 5,
    comment: "This was a big one! It is a big achievement to make it up the mountain!",
  )

