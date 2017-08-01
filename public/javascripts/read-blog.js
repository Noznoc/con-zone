// function when the client clicks on the '+ Read More'
function readBlog(){
	$(".hide-show").on('click', function(){
		$(this).find('i').toggleClass('fa-plus-circle fa-minus-circle');
		var container = $(this).parent('.blog-post');
		var paragraphs = $(container).children('p');
		var lists = $(container).children('ul');
		paragraphs.toggle('hide show');
		lists.toggle('hide show');
	})
}