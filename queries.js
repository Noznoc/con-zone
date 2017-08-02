function about(req, res, next){
  res.render('index', {page: 'about'})
}

function work(req, res, next){
  res.render('index', {page: 'work'})
}

function blog(req, res, next){
  res.render('index', {page: 'blog'})
}

function contact(req, res, next){
  res.render('index', {page: 'contact'})
}

function home(req, res, next){
  res.render('index', {page: 'home'})
}

// add query functions to app 
module.exports = {
  about: about,
  work: work,
  contact: contact,
  blog: blog,
  home: home
};
