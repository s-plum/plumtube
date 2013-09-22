function plumTube(elem) {
	var options = $(elem).data();
	options.container = $(elem).attr('id');
	if (options.plumMaxResults) {
		var results = options.plumMaxResults;
	}
	else {
		var results = 10;
	}
	if (options.plumUser) {
		var URL = "http://gdata.youtube.com/feeds/api/users/"+options.plumUser+"/uploads?v=2&alt=jsonc&max-results="+results;
	}
	else if (options.plumPlaylist) {
		var URL = "http://gdata.youtube.com/feeds/api/playlists/"+options.plumPlaylist+"?v=2&alt=jsonc&max-results="+results;
	}
	var feedList = document.createElement('ul');
	var feedListId = options.container + '-ytlist';
	feedList.id = feedListId;
	
	document.getElementById(options.container).innerHTML = '';
	document.getElementById(options.container).appendChild(feedList);
	$.ajax({
		type: "GET",
		url: URL,
		cache: false,
		dataType:'jsonp',
		success: function(data){
			$.each(data.data.items, function(index) {
				if (options.plumUser) {
					var v = this;
				}
				else if (options.plumPlaylist) {
					var v = this.video;
				}
				if (options.plumLargeThumb) {
					var thumb = v.thumbnail.hqDefault;
				}
				else {
					var thumb = v.thumbnail.sqDefault;
				}
				var title = v.title;
				if (options.plumModal) {
	
					if(options.plumModalOptions) {
						var modalString = '?';
						var keyCounter = 0;
						for (var key in options.plumModalOptions) {
							modalString += key + '=' + options.plumModalOptions[key] + '&';
							keyCounter++
						}
						modalString = modalString.slice(0, modalString.length-1);
					}
					var link = 'http://www.youtube.com/embed/'+v.id+modalString;
				}
				else {
					var link = 'http://www.youtube.com/watch?v='+v.id;
				}

				var listItem = document.createElement('li');

				var imgLink = document.createElement('a');
				imgLink.href = link;
				if (options.plumNewWindow === true) {
					imgLink.target = '_blank';
				}
				imgLink.className = 'yt-image-link';
				listItem.appendChild(imgLink);

				if (options.plumShowThumb !== false) {
					var imgLinkThumb = new Image();
					imgLinkThumb.src = thumb;
					imgLinkThumb.alt = title;
					imgLink.appendChild(imgLinkThumb);
				}
				
				if (options.plumShowThumb === false) {
					options.plumShowTitle = 'link';
				}

				if (options.plumShowTitle) {
					if (options.plumShowTitle === 'text') {
						var titleText = document.createElement('p');
						titleText.innerHTML = title;
						titleText.className = 'yt-title';
						listItem.appendChild(titleText);
					}
					else if (options.plumShowTitle === 'link') {
						var titleLink = document.createElement('a');
						titleLink.href = link;
						titleLink.innerHTML = title;
						if (options.plumNewWindow === true) {
							titleLink.target = '_blank';
						}
						titleLink.className = 'yt-title-link';
						listItem.appendChild(titleLink);
					}
				}
				document.getElementById(feedListId).appendChild(listItem);  
			});
		}
	});
};

$(document).ready( function() {
	var plumTubes = $('[data-plumtube]');
	plumTubes.each(function() {
		plumTube(this);
	});
});