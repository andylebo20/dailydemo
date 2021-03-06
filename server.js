var express = require('express')
var app = express()
var request = require('request')
var cors = require('cors')
var path = require('path')
app.use(cors())

app.use(express.static(path.join(__dirname, 'frontend/build'))) // hosts frontend files

app.get("/*", function(req, res){ // redirecting server to frontend index.html where react router can handle routing
  res.sendFile(path.join(__dirname, "frontend/build/index.html"), function(error){
    if (error){
      res.status(500).send(error)
    }
  })
})

app.post('/createRoom', function(req, res){ // sends request to daily.co api to create a new room
  var options = {
      method: 'POST',
      url: 'https://api.daily.co/v1/rooms',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer e2477e186419d706575140a30c9e9ba55fc1cb3b0b2b1b14e4b9edd5e95f99fd'
      }
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body); // sends back room details (room name is used on frontend)
  });
})
app.listen(process.env.PORT || 9000)