const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const nav = fs.readFileSync(path.join(__dirname, 'public/nav.html'), 'utf8');
app.get('/', (req, res) => {
	res.send(
		fs
			.readFileSync(path.join(__dirname, 'public/index.html'), 'utf-8')
			.replaceAll('{{nav}}', nav)
	);
});
for (const endpoint of ['/training/intro*', '/training/phishing*']) {
	app.get(endpoint, (req, res) => {
		const n = +path.basename(req.url);
		res.send(
			fs
				.readFileSync(
					path.join(
						__dirname,
						'public',
						endpoint.replaceAll('*', ''),
						(isNaN(n) ? 'index' : 'p' + n) + '.html'
					),
					'utf-8'
				)
				.replaceAll('{{nav}}', nav)
		);
	});
}
app.get('/training', (req, res) => res.redirect('/training/intro'));
app.use(express.static('dist'));
app.use(express.static('./public/font'));

app.listen(8080);
