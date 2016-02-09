function searchFunction() {
	var search = document.getElementById("search").value;
	var url1 = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&generator=search&gsrsearch=";
	var url2 = "&callback=?";
	var url = url1 + search + url2;
	
	$.getJSON(url ,function(JSON) {
		var output = "";
    	$.each(JSON.query.pages, function(i, item) {
				output += "<a href='http://www.wikipedia.org/wiki/"+ item.title +"' target='_blank'><li><h1 class='title'>"+item.title+"<h1><h2 class='snippet' id='snippet" + item.pageid + "'></h2></li></a>";
				getSnip(item.pageid);
			});
		$("#results").html(output);
	});
}

function randomFunction() {
	var url="https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=10&redirects=&callback=?";
	var snippetArray = [];
	$.getJSON(url ,function(JSON) {
		var output = "";
    	$.each(JSON.query.random, function(i, item) {
				output += "<a href='http://www.wikipedia.org/wiki/"+ item.title +"' target='_blank'><li><h1 class='title'>"+item.title+"<h1><h2 class='snippet' id='snippet"+item.id+"'></h2></li></a>";
				getSnip(item.id);
			});
		$("#results").html(output);
	});
}

function getSnip(pageid) {
	var url = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exsectionformat=plain&pageids=" + pageid + "&callback=?";
	$.getJSON(url ,function(JSON) {
		$.each(JSON.query.pages, function(i, item) {
				$("#snippet"+pageid).html(item.extract.split("</p>")[0]);
			});
	});
}