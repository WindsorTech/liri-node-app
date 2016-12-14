// Global variables

var keys = require('./keys.js');

keys = keys.twitterKeys;

var fs = require('fs');

var Twitter = require('twitter');

var request = require('request');

var spotify = require('spotify');

var command = process.argv[2];

var movie = process.argv[3] || "mr-nobody";

var song = process.argv[3] || "the-sign-ace-of-base";

//===============================================================//

// Functions for the API calls and fs.readFile

function twitterCall() {

  var client = new Twitter({
     consumer_key: 'EpnOyMMQqlF3qas0syaktqN3S',
     consumer_secret: 'vJr62mDVIIa2mDU2nwd49ryg0QybdeKMwCmWPXculk0aJmkWVJ',
     access_token_key: '3105257457-msCvCT6VhZ63tO4lSnFIdWn39fHK2DsmBZ8iDeB',
     access_token_secret: 'xbKA8BZGAIZHJ4HPXICIQA4nataEwrwVmOsqaFdcOKQwj',
  });
 
  var params = {screen_name: 'followgotripps', count: 20};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error & response.statusCode === 200) {

  for (var i = 0; i < tweets.length; i++) {
    console.log('Tweet: ' + tweets[i].text);
    console.log('Created at: ' + tweets[i].created_at);
    console.log('--------------------------------------------------');
    }
     }
  });

}

function spotifyCall(song) {

    spotify.search({ type: 'track', query: song }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
    console.log('Song Name: ' + data.tracks.items[0].name);
    console.log('Album: ' + data.tracks.items[0].album.name);
    console.log('Preview Link: ' + data.tracks.items[0].preview_url);   
});

}

function movieCall(movie) {

  var url = "http://www.omdbapi.com/?t=" + movie +"&y=&plot=short&tomatoes=true&r=json"

  request(url, function(err, res, body) { 

      body = JSON.parse(body);
      console.log('Title: ' + body.Title);
      console.log('Year: ' + body.Year);
      console.log('Rating: ' + body.Rated);
      console.log('Country: ' + body.Country);
      console.log('Language: ' + body.Language);
      console.log('Plot: ' + body.Plot);
      console.log('Actors: ' + body.Actors);
      console.log('Rotten Tomatoes Rating: ' + body.tomatoRotten);
      console.log('Rotten Tomatoes URL: ' + body.tomatoURL);

  });
}

function whatever() {

    fs.readFile('random.txt', 'utf8', function(err, data) {

    var info = data.split(',');

    console.log(info[0], info[1]);

    if (info[0] === 'spotify-this-song') {

        spotifyCall(info[1]);

    } else if (info[0] === 'my-tweets'){

        twitterCall();
    } else if (info[0] === 'movie-this'){

        movieCall(info[1]);
    }

});

}

//======================================================//

//If statements to trigger Liri's commands

if (command == 'my-tweets') {

    twitterCall();
}

else if (command == 'spotify-this-song') {

    spotifyCall(song);
}

else if (command == 'movie-this') {

    movieCall(movie);
}

else if (command == 'do-what-it-says') {

    whatever();
}