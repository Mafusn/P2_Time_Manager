var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var helmet = require('helmet');
var compression = require('compression');

var indexRouter = require('./routes/index');
//var timesheetRouter = require('./routes/timesheet');
//var shiftManagementRouter = require('./routes/shiftManagement')
//var profileRouter = require('./routes/profile');
var loginRouter = require('./routes/login');
//var settingsRouter = require('./routes/settings');
//var messagesRouter = require('./routes/messages');
var employeeRouter = require('./routes/employee')
var managerRouter = require('./routes/manager')

var app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb+srv://planice:utd69nen@planice.e3io9.mongodb.net/planice?retryWrites=true&w=majority';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'kmijhufo34jio6a45k4', resave: false, saveUninitialized: true}));
app.use(helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: ["'self'", 'cdn.jsdelivr.net', 'cdnjs.cloudflare.com/'],
      imgSrc: ["'self'", 'img.icons8.com', 'i.guim.co.uk'],
    }
}));
app.use(compression()); // Compress all routes

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/manager', managerRouter);
app.use('/employee', employeeRouter);

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
