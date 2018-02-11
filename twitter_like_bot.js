const Twitter = require('twitter');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};
const myEmitter = new MyEmitter();

var client = new Twitter({
  consumer_key: 'eIfje6tRbFjrqqWwH3JISXQrB',
  consumer_secret: 'qmm0OubgEhqMD7pTWUh3lQ8i78w5ZvVFmoNEP9ljZvy1M3LiDF',
  access_token_key: '	959097430896553984-MJ4bDubbdU8AWmMPRNP5ekvFU7AnmjV',
  access_token_secret: 'pOUCuL3uwYcYA3nLQXE0GGjAzE8AncAXAGuoCoDDBSRLy'
});

var keywords = {track:'hmmmmm'};
var stream = client.stream('statuses/filter', keywords);

myEmitter.on('event', (tweetId) => {
  client.post('favorites/create', {id:tweetId}, (error, response) => {
    if(error) throw error;
    console.log(response.text);
    console.log('Tweet ID: '+response.id_str+' Liked!')
  });
});

stream.on('data', (event) => {
  myEmitter.emit('event', event.id_str);
});

stream.on('error', (error) => {
  throw error;
});
