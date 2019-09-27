var modal;

$('#searchResults').html("<span>Search Results for: technology</span>")
$.getScript('https://itunes.apple.com/search?term=' + 'technology' + '&media=podcast&callback=searchSetInfo')

$("#search").submit(function(event) {
	event.preventDefault();
	
	$("#main_banner").hide()
	
	
	var term = $('#searchInputX').val().toLowerCase();
	
	if (term.length == 0) {
		$('#results').empty()
		$("#main_banner").show();
		$('#searchResults').html("<span>Search Results</span>")
		return;
	} else {
		$('#searchResults').html("<span>Search Results for: " + $('#searchInputX').val() + "</span>")
	}
	term = term.split(' ').join('+')
	term = encodeURI(term)

	$.getScript('https://itunes.apple.com/search?term=' + term + '&media=podcast&callback=searchSetInfo')
})

function searchSetInfo(data) {
	
		$('#results').empty()
	
		console.log("data " + data)				
	
		$.each(data.results, function(index, element) {
			$('#results').append(castEntry(
				element.collectionViewUrl,
				element.trackName, 
				element.artistName,
				element.artworkUrl100
			))
		});
		
		// var modals = document.getElementsByClassName('js-modal');
// 		if( modals.length > 0 ) {
// 			for( var i = 0; i < modals.length; i++) {
// 				(function(i){modal = new Modal(modals[i]);})(i);
// 			}
// 		}
		
		$('#modal1').on("modalIsOpen", function(event) {
			var podcastId = event.detail.id
			//$.getScript('https://itunes.apple.com/lookup?id=' + podcastId + '&callback=modalSetInfo')
		})
}

function modalSetInfo(data) {
	var item = data.results[0]
	setTimeout(function() {
		modal.closeModal();
		window.location = item.collectionViewUrl
		
	}, 1500);
}

function castEntry(trackId, title, artist, image) {
	var entry = ''
	
	entry += '<div class="p-table__item col-4@md">'


	entry += '	<div class="flex margin-bottom-xxs">'
	entry += ' 		<img style="object-fit: scale-down" class="margin-xs" src="' + image + '">'
	entry += '		<h4 class="p-table__title">' + title + '</h4>'
	entry += '	</div>'

	entry += '	<div class="p-table__price margin-bottom-sm"><i>by</i> ' + artist + '</div>'

	entry += '<div class="margin-top-auto"><a href="' + trackId + '" class="btn btn--primary btn--md width-100%" aria-controls="modal1">Episodes...</a></div>'
	entry += '</div>'
	
	return entry
}

