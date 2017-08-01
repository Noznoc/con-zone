function about(req, res, next){
  res.render('index', {page: 'about', title: '', body: ''})
}

function work(req, res, next){
  res.render('index', {page: 'work', title: '', body: ''})
}

function blog(req, res, next){
  res.render('index', {page: 'blog', title: '', body: ''})
}

function contact(req, res, next){
  res.render('index', {page: 'contact', title: '', body: ''})
}

function home(req, res, next){
  res.render('index', {page: 'home', title: '', body: ''})
}

// add query functions to app 
module.exports = {
  about: about,
  work: work,
  contact: contact,
  blog: blog,
  home: home
};
