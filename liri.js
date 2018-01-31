require("dotenv").config();

// Grabs the key file and npm packages
var keys = require('./keys.js');
var request = require('request');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var fs = require('fs');
var parameters = process.argv.slice(3);

// switching method- display on type
var action = process.argv[2];
    switch(action){
    case 'my-tweets' :
      myTweets();
      break;
    case 'spotify-this-song' :
      myMusic();
      break;
    case 'movie-this' :
      myMovie();
      break;
    case 'do-what-it-says' :
      doWhat();
      break;  
  };


//twitter feed display
function myTweets(){
	// calling my keys from keys.js
	var client = new twitter({
		consumer_key: keys.twitter.consumer_key,
		consumer_secret: keys.twitter.consumer_secret,
		access_token_key: keys.twitter.access_token_key,
		access_token_secret: keys.twitter.access_token_secret
	});
	// getting info from my twitter
	var params = {screen_name: 'notannelisa'};
	// getting my timeline statuses
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			console.log("----Recent Tweets----");
			// looping my latest 20 tweets
			for (i = 0; i < 20; i++) {
				console.log(tweets[i].created_at + "You tweeted: " + tweets[i].text);
			}
		}
	});	
}
