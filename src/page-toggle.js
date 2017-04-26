function pageToggle(){
	$('#home').addClass("active-page"); // assign active page
	
	// activate active page
	$(".navigation li").on("click", function(){
		var section = $(this).attr('value');
		window.location.href += "#" + section
		var selected = "." + $(this).attr('value'); // get value of li to know what page to open
		$(".navigation li").removeClass("active-page"); // clear active page
		$(this).addClass("active-page"); // assign active page
		$(".body").find("div").hide(); // hide all pages
		$(selected).show().children().show(); // show active page
		if ($(this).attr("value") == "home") {
			slideshow()
		}
	});

	var url = window.location.href; // stores the url the client has entered
	var id = url.substr(url.indexOf("#") + 1);
	console.log(id)
	if (id == "file:///C:/Users/Julia/Documents/Coding/coding_projects/con-zone/index.html" || id =="https://noznoc.github.io/con-zone/index.html") {
		id = "home";
	}
	if (id.length > 0){
		$(".navigation li").removeClass("active-page"); // clear active page
		console.log($(".navigation li").attr("value"))
		$(".navigation li").each(function(){
			if ($(this).attr("value") == id) {
				$(this).addClass("active-page"); // assign active page
			}
		});
		$(".body").find("div").hide(); // hide all pages
		var selected = "." + id;
		$(selected).show().children().show(); // show active page
		if ($(".navigation li").attr("value") == "home") {
			slideshow()
		}
	}
}