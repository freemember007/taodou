/**
 * Module dependencies.
 */
var util = require('util');
var express = require('express')
	, RedisStore = require('connect-redis')(express)
	, routes = require('./routes');
var app = module.exports = express();


// Task
var grab = require('./grab.js');
//grab.start();
var cronJob = require('cron').CronJob;
var job = new cronJob({
	cronTime: '00 */10 * * * *',
	onTick: function(){util.log('job start...'); grab.start()},
	start: false, //立即开始，但基本上要碰运气。先手动开始吧。。。
	timeZone: 'Asia/Chongqing'
});
job.start();

// Configuration
app.configure(function(){
	// app.set("view options", {layout: false});
	// app.set('views', __dirname + '/views');
	// app.set('view engine', 'ejs');
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({ 
		secret: 'keyboard cat',
		store: new RedisStore
	}));
	app.use(require('stylus').middleware({ src: __dirname + '/public' }));
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});


// Routes
app.get('/', routes.index);
app.post('/api/reg', routes.reg);
app.post('/api/login', routes.login);
app.get('/api/logout', routes.logout);
app.get('/api/Goods/:type?/:name?', routes.Goods);
app.post('/api/Goods', routes.Goods);
app.get('/api/deals', routes.deals);

app.listen(process.env.VCAP_APP_PORT || 3000, function(){
	console.log("Express server listening on port %d in %s mode", 'app.address().port', app.settings.env);
});


