function plumTube(options) {
	if (options.maxResults) {
		var results = options.maxResults;
	}
	else {
		var results = 10;
	}
	if (options.user) {
		var URL = "http://gdata.youtube.com/feeds/api/users/"+options.user+"/uploads?v=2&alt=jsonc&max-results="+results;
	}
	else if (options.playlist) {
		var URL = "http://gdata.youtube.com/feeds/api/playlists/"+options.playlist+"?v=2&alt=jsonc&max-results="+results;
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
				if (options.user) {
					var v = this;
				}
				else if (options.playlist) {
					var v = this.video;
				}
				if (options.largeThumb) {
					var thumb = v.thumbnail.hqDefault;
				}
				else {
					var thumb = v.thumbnail.sqDefault;
				}
				var title = v.title;
				if (options.modal) {
					if(options.modalOptions) {
						var modalString = '?';
						var keyCounter = 0;
						for (var key in options.modalOptions) {
							modalString += key + '=' + options.modalOptions[key] + '&';
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
				if (options.newWindow === true) {
					imgLink.target = '_blank';
				}
				imgLink.className = 'yt-image-link';
				listItem.appendChild(imgLink);

				if (options.showThumb !== false) {
					var imgLinkThumb = new Image();
					imgLinkThumb.src = thumb;
					imgLinkThumb.alt = title;
					imgLink.appendChild(imgLinkThumb);
				}
				
				if (options.showThumb === false) {
					options.showTitle = 'link';
				}

				if (options.showTitle) {
					if (options.showTitle === 'text') {
						var titleText = document.createElement('p');
						titleText.innerHTML = title;
						titleText.className = 'yt-title';
						listItem.appendChild(titleText);
					}
					else if (options.showTitle === 'link') {
						var titleLink = document.createElement('a');
						titleLink.href = link;
						titleLink.innerHTML = title;
						if (options.newWindow === true) {
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