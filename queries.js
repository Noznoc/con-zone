var data = require('./data.json');
var blogData = data.data.blogs;
var docData = data.data.docs;

function about(req, res, next){
  res.render('about', {layout: 'layout', id: 'about'});
}

function projects(req, res, next){
  res.render('projects', {layout: 'layout', id: 'projects'});
}

function blog(req, res, next){
    res.render('blog', {layout: 'blog', data: blogData, id: 'blog', title: 'Check out my blog pages'});
}

function docs(req, res, next){
    res.render('docs', {layout: 'docs', data: docData, id: 'docs', title: 'Check out my documentation'});
}

function getData(req, res, next){
  var request = req.params.id,
      render = [];
  
  if (request.indexOf('blog-') >= 0) {
    for (var i = 0; i < blogData.length; i++){
      if (blogData[i].id == request){
        render.push(blogData[i])
      }
    }
    res.render(request, {layout: 'blog', data: render, id: 'blog-post'});
  }

  if (request.indexOf('travel') >= 0) {
    for (var i = 0; i < blogData.length; i++){
      if (blogData[i].tags == 'travel'){
        render.push(blogData[i])
      }
    }
    res.render('blog', {layout: 'blog', data: render, id: 'travel', title: 'Travel blog', subtitle:"I love to travel, but haven't been good at sharing my experiences. Since moving to Ayacucho, Peru, I have been posting about my journeys in and around the Ayacucho region. Overtime this blog will focus on my cultural experiences in various places worldwide."});
  } 

  if (request.indexOf('geo') >= 0) {
    for (var i = 0; i < blogData.length; i++){
      if (blogData[i].tags == 'geo'){
        render.push(blogData[i])
      }
    }
    res.render('blog', {layout: 'blog', data: render, id: 'geo', title: 'Geo blog', subtitle: "Posts about my opinions on various topics in geography, but most are focused on volunteered geographic information (e.g., OpenStreetMap), open data, location based services, and geosurveillance."});
  }

  if (request.indexOf('doc-') >= 0) {
    for (var i = 0; i < docData.length; i++){
      if (docData[i].id == request){
        render.push(docData[i])
      }
    }
    res.render(request, {layout: 'docs', data: render, id: 'doc-post'});
  }

  if (request.indexOf('guide') >= 0) {
    for (var i = 0; i < docData.length; i++){
      if (docData[i].tags == 'guide'){
        render.push(docData[i])
      }
    }
    res.render('docs', {layout: 'docs', data: render, id: 'guide', title: 'Guides', subtitle: "Over time I have collected various resources to develop my projects. To share what I've learned, I have written guides that mostly pretain to geo data science!"});
  }

  if (request.indexOf('tutorial') >= 0) {
    for (var i = 0; i < docData.length; i++){
      if (docData[i].tags == 'tutorial'){
        render.push(docData[i])
      }
    }
    res.render('docs', {layout: 'docs', data: render, id: 'tutorial', title: 'Tutorials', subtitle: "Since I learn a lot through following several different tutorials and blogs, I wanted to share my own experiences developing data visualizations!"});
  }
}

function contact(req, res, next){
  res.render('contact', {layout: 'layout', id: 'contact'});
}

function home(req, res, next){
  res.render('home', {layout: 'layout', id: 'home'});
}

// add query functions to app 
module.exports = {
  about: about,
  projects: projects,
  contact: contact,
  blog: blog,
  getData: getData,
  home: home,
  docs: docs
};
