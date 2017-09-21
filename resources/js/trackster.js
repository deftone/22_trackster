// Application name 	codecademy_project_trackster
// API key 	8d035abedaf3e5b9b540ab6475789acd
// Shared secret 	56559e583f7f9a88fdd84bee21f831bb
// Registered to 	deftone33
var Trackster = {};
var API_KEY = '8d035abedaf3e5b9b540ab6475789acd';

$(document).ready(function() {
  $('#search_button').on('click', function(){
    Trackster.searchTracksByTitle($('input').val());
  });
  //alternative: when pressing "Enter" (==13) (e.which or e.keyCode works both) see: https://css-tricks.com/snippets/javascript/javascript-keycodes/
  $(document).keypress(function(e) {
    if(e.keyCode == 13) {
      Trackster.searchTracksByTitle($('input').val());
    }
  });
});


/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  var i=0;
  var list_item = '';
  var $htmlTrackRow = $('#htmlTrackRow');
  var $mediumAlbumArt = '';
  //clear list first
  $htmlTrackRow.empty();
  for (i=0; i<tracks.length; i++){
      list_item = '<div class="row list">'
              +'<a class="col-xs-1 col-xs-offset-1" href="'+ tracks[i].url + '" target="_blank">'
                +'<i class = "fa fa-play-circle-o"></i> </a>'
              +'<span class="col-xs-4"> '+tracks[i].name+' </span>'
              +'<span class="col-xs-2"> '+tracks[i].artist+' </span>'
              +'<span class="col-xs-2"> <img src="' + tracks[i].image[1]["#text"] + '"/></span>'
              +'<span class="col-xs-2"> '+tracks[i].listeners+' </span> </div>';
      $htmlTrackRow.append(list_item);
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
      Trackster.renderTracks(data.results.trackmatches.track);
    }
  });
};
