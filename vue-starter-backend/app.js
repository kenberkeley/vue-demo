var path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  autoRoutes = require('express-auto-routes'),
  crossDomain = require('./middlewares/crossDomain'),
  simpleLogger = require('./middlewares/simpleLogger'),
  simpleUserSession = require('./middlewares/simpleUserSession');

var app = express();
app.use(crossDomain);
app.use(simpleLogger);
app.use(simpleUserSession);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// auto routes
var routes = autoRoutes(app);
routes(path.join(__dirname, './controllers'));

// 404
app.use(function(req, res, next) {
  res.status(404);
  next({ _code: 404, _msg: 'Page not found' });
});

// err handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  
  if (err._status) res.status(err._status);

  res.json({
    _code: err._code || 1,
    _msg: err._msg || err
  });
});

app.listen(9000);
