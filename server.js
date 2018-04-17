// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get("/*", (request, response) => {
  //response.send(request.params)
  
  var timeStamp=request.params[0];
  var unixStamp=null;
  var naturalStamp=null;
  
  if (/^\d+$/.test(timeStamp)){
    unixStamp=parseInt(timeStamp);
  }else{
    unixStamp=new Date(timeStamp).getTime() / 1000;
  }
  
  if (!unixStamp>0){
    unixStamp=null;
  }else{
    naturalStamp=timeConverter(unixStamp);
  }
   
  response.send({"unix": unixStamp, "natural": naturalStamp})
})




function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = month + ' ' + date + ', ' + year;
  return time;
}



/*
// Simple in-memory store
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
]

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", (request, response) => {
  dreams.push(request.query.dream)
  response.sendStatus(200)
})
*/

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
