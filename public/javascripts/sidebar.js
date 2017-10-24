function sidebar(){	
	var sidebar = $(".sidebar"); 
	var offset = sidebar.offset();
	var topPadding = -150;
	$(window).scroll(function() {
		if ($(window).scrollTop() > offset.top) {
			sidebar.stop().animate({
				marginTop: -500//$(window).scrollTop() - offset.top + topPadding
			});
		} else {
			sidebar.stop().animate({
				marginTop: 0
			});
		}
	});
}