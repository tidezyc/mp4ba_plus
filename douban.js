var parts = $('.location')[0].innerHTML.split('»');
var full_name = parts[parts.length-1];
var name = full_name.split('.')[0].trim();

$('body').append("<div id='douban_container'>\
  <img src='"+chrome.extension.getURL('img/loading.gif')+"'/>\
</div>");

var container = $('#douban_container');

$.get('https://api.douban.com/v2/movie/search?count=5&q='+name, function(data){
  var movies = data.subjects;
  container.empty();
  if(movies.length>0){
    addSearchResult(movies[0]);
  } else {
    addEmptySearchResult();
  }
})

function addSearchResult(data) {
  var id = data.id;
  var title  = data.title;
  var avatar = data.images.medium;
  var rating = data.rating.average
  var url = data.alt;
  container.append("<div class='douban_item'>\
    <img src='"+avatar+"' class='douban_item_avatar'/>\
    <div class='douban_item_info'>\
      <a class='douban_item_title' href='"+url+"' target='_blank'>"+title+"</a><br/>\
      <span class='douban_item_rating'>"+rating+"</span><br/>\
      <a href='http://movie.douban.com/subject/"+id+"/comments?sort=new_score' target='_blank'>热门短评</a>\
    </div>\
  </div>");
  doubanClose();
}

function addEmptySearchResult() {
  container.append("<span>No Results!!!</span>");
  doubanClose();
}

function doubanClose(argument) {
  container.append("<a href='javascript:void(0);' id='douban_close'>\
    <img src='"+chrome.extension.getURL('img/close.png')+"'/>\
  </a>");
  $('#douban_close').click(function(){
    container.hide();
  })
}
