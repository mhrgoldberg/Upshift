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

route_data1 = File.read("/Users/Mitchell/Desktop/app_academy/aa-projects/strava_clone/upshift/app/assets/gpx_data/bike_ride_gpx.xml")


route1 = Route.create(
  user_id: user1.id,
  distance: 20,
  title: "My First Ride",
  route_type: "ride",
  elevation_gain: 832,
  elevation_loss: 832,
  max_elevation: 200,
  data: route_data1
)



# route1 = Route.new

# route1.user_id = user1.id
# route1.distance = 20
# route1.title = "My First Ride"
# route1.route_type = "ride"
# route1.elevation_gain = 832
# route1.elevation_loss = 832
# route1.max_elevation = 200
# route1.data = route_data1


# route1.save