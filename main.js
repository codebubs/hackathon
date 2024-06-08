const express = require('express');
const path = require('path');

const app = express();
const endpoints = ['/', '/test'];
for (const endpoint of endpoints) {
	app.get(endpoint, (req, res) => {
		res.sendFile(path.join(__dirname, 'public', endpoint, 'index.html'));
	});
}
// app.get('/src/*', (req, res) => {
// 	res.sendFile(path.join(__dirname, req.url));
// });
app.use(express.static('dist'));

app.listen(8080);
