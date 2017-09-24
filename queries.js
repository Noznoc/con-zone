function about(req, res, next){
  res.render('about', {layout: 'layout', page: 'about'});
}

function projects(req, res, next){
  res.render('projects', {layout: 'layout', page: 'projects'});
}

function blog(req, res, next){
  res.render('blog', {layout: 'layout', page: 'blog'});
}

function blog_post(req, res, next){
  var blog = req.params.id
  if (blog.indexOf('blog-') >= 0) {
    res.render('blog', {layout: 'layout', page: blog});
  }

  if (blog.indexOf('travel') >= 0) {
    res.render('blog', {layout: 'layout', page: 'travel'});
  } 

  if (blog.indexOf('geo') >= 0) {
    res.render('blog', {layout: 'layout', page: 'geo'});
  } 
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
  projects: projects,
  contact: contact,
  blog: blog,
  blog_post: blog_post,
  home: home
};
