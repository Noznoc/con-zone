function about(req, res, next){
  res.render('about', {layout: 'layout', page: 'about'});
}

function work(req, res, next){
  res.render('work', {layout: 'layout', page: 'work'});
}

function blog(req, res, next){
  res.render('blog', {layout: 'layout', page: 'blog'});
}

function blog_post(req, res, next){
  var blog = req.params.id
  res.render('blog', {layout: 'layout', page: blog});
}

function contact(req, res, next){
  res.render('contact', {layout: 'layout', page: 'contact'});
}

function home(req, res, next){
  res.render('home', {layout: 'layout', page: 'home'});
}

// add query functions to app 
module.exports = {
  about: about,
  work: work,
  contact: contact,
  blog: blog,
  blog_post: blog_post,
  home: home
};
