function pageToggle(){
	$('#home').addClass("active-page"); // assign active page
	var url = window.location.href;
	var section = url.split("#")[1];
	url = url.split("/index.html")[0];
	console.log(section)

	$(".navigation li").on("click", function(){
		var section = $(this).attr('value');
		var selected = "." + $(this).attr('value'); // get value of li to know what page to open
		$(".navigation li").removeClass("active-page"); // clear active page
		$(this).addClass("active-page"); // assign active page
		window.location.href = url + "/index.html#" + section
		$(".body").find("div").hide(); // hide all pages
		$(selected).show().children().show(); // show active page
		if (section == "home"){
			$('.map-container').children().show();
			$('#map').show();
		}
		//var url = window.location.href;
		//window.location.href = 'file:///C:/Users/Julia/Documents/Coding/coding_projects/con-zone/index.html?option=' + $(this).attr('value');
	});

	$(document).ready(function() {
		var url = window.location.href;
		if (section == "home" || section == "about" || section == "work" || section == "blog" || section == "contact") {
			$(".navigation li").removeClass("active-page");
			$('.text').hide();
			$('#' + section).addClass("active-page");
			$('.' + section).show();
			$('.' + section).show();
		}
	});

	/*
	function showDiv(option) {
		$(".body").find("div").hide();
		$('.' + option).show();
		$(".navigation li").removeClass("active-page"); // clear active page
		$('#' + option).addClass("active-page"); // assign active page
	}*/

	//http://jennamolby.com/how-to-display-dynamic-content-on-a-page-using-url-parameters/
}