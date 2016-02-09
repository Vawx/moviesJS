// default
function Ticket( title, image, outline )
{
  this.title = title;
  this.image = image;
  this.outline = outline;
}

var movies = [];
$(document).ready(function( ) {
  var found = {};

  theMovieDb.movies.getNowPlaying( found, currentPlayingSuccess, currentPlayingFailed );

  function currentPlayingSuccess( response )
  {
    var obj = jQuery.parseJSON( response );
    var imageContainer = $("#image-container");
    for ( var i = 0; i < obj.results.length; i++ )
    {
      if( obj.results[i]['poster_path'] != null )
      {
        var imageClone = $("#image-nail").clone( );
        imageClone.attr("id", "duplicate-nail");
        imageClone.attr("class", "col-xs-3");
        imageClone.attr("name", obj.results[i]['original_title']);

        imageClone.find("#image").attr("src", "http://image.tmdb.org/t/p/original" + obj.results[i]['poster_path'] );
        imageClone.find("#image").attr("name", "movie-image")
        imageClone.find("#title").text(obj.results[i]['original_title']);

        newMovie = new Ticket( obj.results[i]['original_title'], "http://image.tmdb.org/t/p/original" + obj.results[i]['poster_path'], obj.results[i]['overview']);
        movies.push( newMovie );

        imageContainer.append(imageClone);
      }
    }
  }

  function currentPlayingFailed( )
  {
    console.log( "Couldn't find current playing!" );
  }
});


var mouseIdle = false;
var timeout;
var title;
$(document).on('mouseenter','#duplicate-nail', function (event) {
  mouseIdle = true;
  title = this.children[ 0 ].innerHTML;
  timeout = setTimeout(function(){
    console.log( title );
    if( mouseIdle )
    {
      for ( var i = 0; i < movies.length; i++ )
      {
        if( movies[ i ].title == title )
        {
          var modal = $("#myModal");
          modal.find("#movie-title").text( title );
          modal.find("#outline").text( movies[i].outline );
          modal.modal("show");
          return;
        }
      }
      clearTimeout(timeout);
    }
  },1000);
}).on('mouseleave','#duplicate-nail',  function(){
  mouseIdle = false;
  clearTimeout(timeout);
});
