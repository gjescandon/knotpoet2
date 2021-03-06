var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const PORT = process.env.PORT || 5000
var debug = require('debug')('knothearpoet:init');


var aboutRouter = require('./routes/about');
var albumRouter = require('./routes/album');
var antlersRouter = require('./routes/antlers');
var chorderRouter = require('./routes/chorder');
var indexRouter = require('./routes/index');
var linksRouter = require('./routes/linktree');
var usersRouter = require('./routes/users');

var app = express();
var POET = require('poet');
//var monkey = require('monkebutty');

var poet = POET(app, {
  postsPerPage: 3,
  posts: './posts/',
  metaFormat: 'json',
  routes: {
    '/myposts/:post': 'post',
    '/pagination/:page': 'page',
    '/mytags/:tag': 'tag',
    '/mycategories/:category': 'category'
  }
});

console.info(' console info app js');


poet.init().then(function(){
  //initialized
  
  console.info(' console info poet init');
  console.log('post count: ' + poet.helpers.getPostCount());
  var posts = poet.helpers.getPosts(0, 3);
  console.log('post 0: ' + posts.length);
  posts.forEach(post => {
    console.log(post.url);
  });

  console.log('page count: ' + poet.helpers.getPageCount()); 
  
  var modePosts = poet.helpers.postsWithTag('modes');
  modePosts.forEach(tag => {
    console.log(tag.title);
  })
  

  var tPost = poet.helpers.getPost("knot-instagram");
  console.log("hello here" + tPost.title);

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', albumRouter);
app.use('/about', aboutRouter);
app.use('/album', albumRouter);
app.use('/antlers', antlersRouter);
app.use('/chorder', chorderRouter);
app.use('/linktree', linksRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
