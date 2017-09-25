// Application name 	codecademy_project_trackster
// API key 	8d035abedaf3e5b9b540ab6475789acd
// Shared secret 	56559e583f7f9a88fdd84bee21f831bb
// Registered to 	deftone33
var Trackster = {};
var tracks = [];
var API_KEY = '8d035abedaf3e5b9b540ab6475789acd';


$(document).ready(function() {
  $('#search_button').on('click', function(){
    Trackster.searchTracksByTitle($('input').val());
    $('h1').addClass('blink_me');
  });
  //alternative: when pressing "Enter" (==13) (e.which or e.keyCode works both) see: https://css-tricks.com/snippets/javascript/javascript-keycodes/
  $(document).keypress(function(e) {
    if(e.keyCode == 13) {
      Trackster.searchTracksByTitle($('input').val());
      $('h1').addClass('blink_me');
    }
  });

  //listener for ordering songs
  $('.song').on('click', function() {
    tracks.sort(function(track_a, track_b){
        return track_a.name.localeCompare(track_b.name);
    });
    Trackster.renderTracks(tracks);
  });

  //listener for ordering artists
  $('.artist').on('click', function() {
    tracks.sort(function(track_a, track_b){
        return track_a.artist.localeCompare(track_b.artist);
    });
    Trackster.renderTracks(tracks);
  });

  //listener for ordering listeners
  $('.listeners').on('click', function() {
    tracks.sort(function(track_a, track_b){
        return track_b.listeners - track_a.listeners;
    });
    Trackster.renderTracks(tracks);
  });


});


/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function() {
  var i=0;
  var $list_item = '';
  var $htmlTrackRow = $('#htmlTrackRow');
  //clear list first
  $htmlTrackRow.empty();
  for (i=0; i<tracks.length; i++){
      $list_item = $('<div class="list_item row">'
              +'<a class="col-xs-1 col-xs-offset-1" href="'+ tracks[i].url + '" target="_blank">'
                +'<i class = "fa fa-play-circle-o"></i> </a>'
              +'<span class="col-xs-4"> '+tracks[i].name+' </span>'
              +'<span class="col-xs-2"> '+tracks[i].artist+' </span>'
              +'<span class="col-xs-2"> <img src="' + tracks[i].album + '"/></span>'
              +'<span class="col-xs-2 numberal"> '+numeral(tracks[i].listeners).format('0,0')+' </span> </div>');
      $htmlTrackRow.append($list_item);
  }
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: 'https://ws.audioscrobbler.com/2.0/?method=track.search&track='+title+'&api_key='+API_KEY+'&format=json',
    datatype: 'jsonp',
    success: function(data) {
      //when ajax has been successful, blinking stopps
      $('h1').removeClass('blink_me');

      //make objects with info we need:
      var trackInfo = data.results.trackmatches.track;
      var trackOject = {};
      tracks = [];
      for (var i=0; i<trackInfo.length; i++){
        trackOject = {
          url: trackInfo[i].url,
          name: trackInfo[i].name,
          artist: trackInfo[i].artist,
          album: trackInfo[i].image[1]["#text"],
          listeners: trackInfo[i].listeners
        }
        tracks.push(trackOject);
      }
      Trackster.renderTracks(tracks);
    }
  });
};


// ohne 'row' und nur 'list_item' dann wuerde folgendes funktionieren:

// $list_item.data('name', tracks[i].name);
// $list_item.data('artist', tracks[i].artist);

// $(".list_item").each(function(index) {
// console.log( index + ": " + $( this ).data('name') );
// });
