json.routes do 
  json.array! @routes do |route|
      json.partial! 'api/routes/route', route: route
  end
end
