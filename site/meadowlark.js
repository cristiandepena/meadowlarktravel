let express = require('express');
let app = express();
let fortuneCookies = require('./lib/fortune');

// Set up handlebars view engine
let handlebars = require('express-handlebars')
    .create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

// Static Files middleware
app.use(express.static(__dirname + '/public'));


// Test middleware
app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

// main
app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {

    res.render('about', { fortune: fortuneCookies.getFortune() });
});

// 404 catch all handler
app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

// 500 catch all handler
app.use(function(req, res) {
    res.type('text/plain');
    req.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), () => {
    console.log('Express started on htpp://localhost:' + app.get('port') + ';');

});