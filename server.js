var express = require('express')
var app = express()
var request = require('request')
var cors = require('cors')
app.use(cors())
app.post('/createRoom', function(req, res){
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
        res.send(body);
      });
})
app.listen(process.env.PORT || 9000)