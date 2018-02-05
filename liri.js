require("dotenv").config();

var keys = require('./keys.js');
var request = require('request');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var spotify = new spotify({
	id: '095794fcbd38447eb93db73d5f463036',
	secret: '3527c4ef8c4c41d39d76a3f421e1bc77'
});


var fs = require('fs');
var parameters = process.argv.slice(3);

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


// Twitter function
function myTweets(){
	// Twitter keys
	var client = new twitter({
		consumer_key: keys.twitter.consumer_key,
		consumer_secret: keys.twitter.consumer_secret,
		access_token_key: keys.twitter.access_token_key,
		access_token_secret: keys.twitter.access_token_secret
	});
	// Params from my twitter
	var params = {screen_name: 'notannelisa'};
	// Get TL statuses
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			console.log("----Recent Tweets----");
			// Loops last 20 tweets
			for (i = 0; i < 20; i++) {
				console.log(tweets[i].created_at + "You tweeted: " + tweets[i].text);
			}
		}
	});	
}

function myMusic(songName) {
	
	var spotify = require('node-spotify-api');

	var spotify = new spotify({
		id: '095794fcbd38447eb93db73d5f463036',
		secret: '3527c4ef8c4c41d39d76a3f421e1bc77'
	});
	
	var songName = process.argv[3];
	if(!songName) {
		songName = "the sign ace of base";
	}
	params = songName;

	spotify
		.search({ type: 'track', query: params, limit: 1}, function(error, data){
    if(!error){
      for(var i = 0; i < data.tracks.items.length; i++){
        var songData = data.tracks.items[i];
        //artist
        console.log("Artist: " + songData.artists[0].name);
        //song name
        console.log("Song: " + songData.name);
        //spotify preview link
        console.log("Preview URL: " + songData.preview_url);
        //album name
        console.log("Album: " + songData.album.name);
        
      }
    } else{
      console.log('Error occurred.');
    }
  });
};
