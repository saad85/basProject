$(function(){
	//overlay
	 var title=$(this).children().data('title');
	var description=$(this).children().data('desc');
	
	$('ul#gallery li').on('mouseenter', function(){
	
	
	
	$(this).append('<div class="overlay"></div>');
	
	if(title == null){
		
		title = '';
	}
	
	if(description == null){
		
		description = 'click to enlarge';
	}
	
		var overlay = $(this).children('.overlay');
		
		overlay.html('<h3>'+title+'</h3><p>'+description+'</p>');
		
		overlay.fadeIn(800);
	
	
	
	})
	$('ul#gallery li').on('mouseleave',function(){
		
		
	$(this).append('<div class="overlay"></div>');
	
	
	
		var overlay = $(this).children('.overlay');
		
		overlay.html('<h3>'+title+'</h3><p>'+description+'</p>');
		
		overlay.fadeOut(800);
	
		
		
		
		
		
		
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//overlay ends
	var width = 720;
	var animationSpeed = 1000;
	var pause = 3000;
	
	
	$slider = $('#slider');
	$slideContainer = $slider.find('.slides');
	$slide = $slideContainer.find('.slide');
	var  currentSlide = 1;
	var   interval;
  function startSlide(){ interval = setInterval(function(){
		$slideContainer.animate({'margin-left': '-='+width}, animationSpeed, function(){
			currentSlide++;
			if(currentSlide === $slide.length){
				currentSlide = 1;
				$slideContainer.css('margin-left',0);
				
			}
				
			
			
		});
		 
		
		
	},pause);
  }
	
	function pauseSlide() {
		clearInterval(interval);
		
		
	}

	
	$slide.on('mouseenter', pauseSlide);
	$slide.on('mouseleave', startSlide);
	
	

	
	
	
	
	var searchField = $('#query');
	var icon = $('#search-btn');
	
	
	$(searchField).on('focus', function(){
		$(this).animate({
			width:'100%'
		},400);
		$(icon).animate({
	   right:'10px'
		}, 400);
	});
		
	$(searchField).on('blur', function(){
		if (searchField.val() == ''){
		$(this).animate({
		width:'45%'
		},400,function() {});
	$(icon).animate({
	   right:'360px'
	}, 400, function(){});
		}
	
	
	});
	
	$('#search-form').submit(function(e){
		e.preventDefault();
	});
	
	
	//know_button
	$('#buton').on('click', function(){
		
		
		var paragraph = $('.para');
		paragraph.html('<p>A video search engine is a web-based search engine which crawls the web for video content. Some video search engines parse externally hosted content while others allow content to be uploaded and hosted on their own servers. Some engines also allow users to search by video format type and by length of the clip. The video search results are usually accompanied by a thumbnail view of the video.</p>');
		
		
		paragraph.fadeToggle('slow');
	});
	
	//know_button
	
})

function search(){
	$('#results').html('');
	$('#buttons').html('');
	
	
	q= $('#query').val();
	
	$.get(
	"https://www.googleapis.com/youtube/v3/search",{
		part: 'snippet, id',
		q: q,
		type: 'video',
		key: 'AIzaSyBiuQDpJCDrdryk8J2xOFKsZdIJZwMczI4', },
		function(data){
			 
			 var nextPageToken = data.nextPageToken;
			 var prevPageToken = data.prevPageToken;
			  
			console.log(data);
			
		
		
		$.each(data.items, function(i, item){
			var output =getOutput(item);
			
			$('#results').append(output);
			
			});
			
			
		var buttons = getbuttons(prevPageToken,nextPageToken);
		$('#buttons').append(buttons);	
		}
	);

}

function nextpage(){
	
	 
	 var token = $('#next-button').data('token');
	 var q = $('#next-button').data('query');
	 
	 $('#results').html('');
	$('#buttons').html('');
	
	q = $('#query').val();
	
	$.get(
	"https://www.googleapis.com/youtube/v3/search",{
		part: 'snippet, id',
		q: q,
		pageToken: token,
		type: 'video',
		key: 'AIzaSyBiuQDpJCDrdryk8J2xOFKsZdIJZwMczI4' },
		function(data){
			 
			 var nextPageToken = data.nextPageToken;
			 var prevPageToken = data.prevPageToken;
			  
			console.log(data);
			
		
		
		$.each(data.items, function(i, item){
			var output =getOutput(item);
			
			$('#results').append(output);
			
			});
			
			
		var buttons = getbuttons(prevPageToken,nextPageToken);
		$('#buttons').append(buttons);	
		}
	);
	
	
	
	
	
	
	
}


function prevpage(){
	
	 
	 var token = $('#prev-button').data('token');
	 var q = $('#prev-button').data('query');
	
	$('#results').html('');
	$('#buttons').html('');
	
	
	q = $('#query').val();
	
	$.get(
	"https://www.googleapis.com/youtube/v3/search",{
		part: 'snippet, id',
		q: q,
		pageToken: token,
		type: 'video',
		key: 'AIzaSyBiuQDpJCDrdryk8J2xOFKsZdIJZwMczI4' },
		function(data){
			 
			 var nextPageToken = data.nextPageToken;
			 var prevPageToken = data.prevPageToken;
			  
			console.log(data);
			
		
		
		$.each(data.items, function(i, item){
			var output =getOutput(item);
			
			$('#results').append(output);
			
			});
			
			
		var buttons = getbuttons(prevPageToken,nextPageToken);
		$('#buttons').append(buttons);	
		}
	);
	
	
	
	
	
	
	
}







function getOutput(item){
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTit
	var videoDate = item.snippet.publishAt; 
	
	
	var output = '<li>' + '<div class= "list-left">' + 
	'<img src=" '+thumb+'">' + 
	'</div>' + 
	'<div class="list-right">' +
	'<h3><a class="fancybox fancybox.iframe" href="https://www.youtube.com/embed/'+videoId+'">' +title+ '</a></h3>'+'<small> by <span class= "ctitle">'+channelTitle+'</span> on '+videoDate+'<small>' +
	'<p>'+description+'</p>' 
	'</div>' +
	'</li>' +
	'<div class="clearfix"></div>' + '';
	  
	
	return output;
	
	
	
}
	
 function getbuttons(prevPageToken,nextPageToken){
	 
	 if(!prevPageToken){
		 var btnOutput = '<div class ="button-container">' + '<button id= "next-button" class= "paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"'+
			   'onclick= "nextpage()">next page</button></div>';
		 
		 
	 }else {
		 var btnOutput = '<div class ="button-container">' + 
		 '<button id= "prev-button" class= "paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"'+
			   'onclick= "prevpage()">Prev Page</button></div>' + 
		 '<button id= "next-button" class= "paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"'+
			   'onclick= "nextpage()">Next Page</button></div>'+
			   '<button id= "next-button" class= "paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"'+
			   'onclick= "search()">search again</button></div>'
			   
		 
		 
		 
	 }
	 return btnOutput;
	 
	 
	 
	 
	 
 }	

	
	
	
	
	
	
	
	
	
	
	
	
	
