var videoId = "";
var oldVideoId = "";

window.setInterval(function(){
  videoId = extractYoutubeVideoId();
  if(videoId != null){
    updateYoutubeStats();
  }
}, 5000);

function extractYoutubeVideoId(){
  var results = new RegExp('[\?&]' + "v" + '=([^&#]*)').exec(window.location.href);
      if (results==null){
         return null;
      }
      else{
         return results[1] || 0;
      }
}

function updateYoutubeStats(){
  var url = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id="+ videoId +"&key=AIzaSyAgcQ6VzgBPjTY49pxeqHsIIDQgQ09Q4bQ";
  $.getJSON(url, function(data){
    var stats = data.items[0].statistics;
    console.log(stats);
    $(".watch-view-count").html(numberFormat(stats.viewCount));
    $("#watch8-sentiment-actions > span > span:nth-child(1) > button > span").html(numberFormat(stats.likeCount));
    $("#watch8-sentiment-actions > span > span:nth-child(3) > button > span").html(numberFormat(stats.dislikeCount));
  });
}

function numberFormat(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
