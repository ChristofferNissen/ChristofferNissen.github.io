var tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var tv,
		playerDefaults = {autoplay: 0, autohide: 1, modestbranding: 0, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3};

var vid = [
	{'videoId': YtUrl, 'startSeconds':  YtStart, 'endSeconds': YtEnd, 'suggestedQuality': 'hd720'}
],
randomvid = Math.floor(Math.random() * vid.length);

function onYouTubePlayerAPIReady(){
  tv = new YT.Player('tv', {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, playerVars: playerDefaults});
}

function onPlayerReady(){
  tv.loadVideoById(vid[randomvid]);
  tv.mute();
}

function onPlayerStateChange(e) {
  if (e.data === 1){
    $('#tv').addClass('active');
  } else if (e.data === 0){
    tv.seekTo(vid[randomvid].startSeconds)
  }
}

function vidRescale(){
  // Extra width and height is added to make reseizing the browser faster 
  var w = $(window).width() + 200;
  var h = $(window).height() + 112.5;

  if (w/h > 16/9){
    tv.setSize(w, w/16*9);
    $('.tv .screen').css({'left': '0px'});
  } else {
    tv.setSize(h/9*16, h);
    // next line handles centering, when height is larger than width
    $('.tv .screen').css({'left': -($('.tv .screen').outerWidth() - (w-200))/2});
  }
}



$(window).on('load resize', function(){
  vidRescale();
});

$('.hi span').on('click', function(){
  $('#tv').toggleClass('mute');
  if($('#tv').hasClass('mute')){
    tv.mute();
  } else {
    tv.unMute();
  }
});