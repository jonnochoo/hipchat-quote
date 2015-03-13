var request = require('request');
var format = require('string-template');
var Hipchatter = require('hipchatter');
var quoteUrl = 'http://quotes-api.jonnochoo.com/api/quotes/random';

var roomName = process.argv[2];
var hipchatAuthToken = process.argv[3];
var hipchatRoomToken = process.argv[4];

request.get(quoteUrl, function(err, res, data) {
  if(err) {
    throw err;
  }

  var quote = JSON.parse(data);
  var quoteText = quote.author ? format("{text} - {author}", quote) : quote.text;

  var hipchatter = new Hipchatter(hipchatAuthToken);
  hipchatter.notify(roomName, { message: quoteText, color: 'green', token: hipchatRoomToken }, 
    function(err){
      if(err)
        console.log(err);

      if (err == null) 
        console.log('Successfully notified the room.');
  });
});