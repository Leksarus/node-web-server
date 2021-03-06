const express = require('express');
const hbs = require('hbs');
const port  = process.env.PORT || 3000;

var app = express();
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to save log.');
		}
	});
	next();
});

/*app.use((req, res, next) => {
	res.render('maintance.hbs');
});*/

// Reads files from static for navigation usage
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home page',
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects',
	});
});

app.get('/bad', (req, res) => {
	res.send({
		error: 'Dup duap'
	})
})

app.listen(port, () => {
	console.log(`Port: ${port}`);
});