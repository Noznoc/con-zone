function pageToggle(){
	$('#home').addClass("active-page"); // assign active page
	// activate active page
	$(".navigation li").on("click", function(){
		var selected = "." + $(this).attr('value'); // get value of li to know what page to open
		$(".navigation li").removeClass("active-page"); // clear active page
		$(this).addClass("active-page"); // assign active page
		$(".body").find("div").hide(); // hide all pages
		$(selected).show().children().show(); // show active page
	});
}