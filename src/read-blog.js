// function when the client clicks on the '+ Read More'
function readBlog(){
	$(".hide-show").on('click', function(){
		$(this).find('i').toggleClass('fa-plus-circle fa-minus-circle');
		var container = $(this).parent('div');
		var blog = $(container).find('p');
		console.log(blog);
		blog.toggle();
	})
}