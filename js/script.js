$(function(){
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
	'<h3><a  href="https://www.youtube.com/embed/'+videoId+'"    class="utube" >' +title+ '</a></h3>'+'<small> by <span class= "ctitle">'+channelTitle+'</span> on '+videoDate+'<small>' +
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
			   'onclick= "nextpage()">Next Page</button></div>'; 
		 
		 
		 
	 }
	 return btnOutput;
	 
	 
	 
	 
	 
 }	

	
	
	
	
	
	
	
	
	
	
	
	
	
