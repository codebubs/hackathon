const express = require('express');
const path = require('path');
const fs = require('fs');
const { URL } = require('url');
const { PDFDocument } = require('pdf-lib');

const app = express();
const templates = ['nav', '/training/sections'].map((e) => [
	path.basename(e),
	fs.readFileSync(path.join(__dirname, 'html', e + '.html'), 'utf8')
]);

function applyTemplates(s) {
	for (const [k, v] of templates) {
		s = s.replaceAll('{{' + k + '}}', v);
	}
	return s;
}
function strToByteArray(str) {
	var myBuffer = [];
	var buffer = Buffer.from(str);
	for (var i = 0; i < buffer.length; i++) {
		myBuffer.push(buffer[i]);
	}
	return myBuffer;
}
app.get('/', (req, res) => {
	res.send(
		applyTemplates(
			fs.readFileSync(path.join(__dirname, 'html/index.html'), 'utf-8')
		)
	);
});
app.get('/stegatificate/create', (req, res) => {
	res.send(
		applyTemplates(
			fs.readFileSync(
				path.join(__dirname, 'html/stegatificate/index.html'),
				'utf-8'
			)
		)
	);
});
app.get('/stegatificate', async (req, res) => {
	const url = new URL(path.join('https://steganerds.fr', req.url));
	if (!url.searchParams.get('name')) res.status(400).send('400 Bad Request');
	res.setHeader('Content-Type', 'application/pdf');
	const pdfDoc = await PDFDocument.load(fs.readFileSync('stegatificate.pdf'));
	const page = pdfDoc.getPage(0);
	const { _, height } = page.getSize();
	const textContent = await page.getTextContent();

	const textItems = textContent.items.map((item) => ({
		str: item.str,
		x: item.transform[4],
		y: item.transform[5],
		size: item.transform[3]
	}));

	textItems.forEach((item) => {
		if (item.str.includes('Insert Name Here')) {
			const replacedText = item.str.replace(
				'Insert Name Here',
				url.searchParams.get('name')
			);
			page.drawText(replacedText, {
				x: item.x,
				y: height - item.y,
				size: item.size
			});
		}
	});
	const modifiedPdfBytes = await pdfDoc.save();
	res.send(Buffer.from(modifiedPdfBytes));
	// res.send(
	// 	Buffer.from(
	// 		fs
	// 			.readFileSync(path.join(__dirname, '/stegatificate.pdf'))
	// 			.toString('utf-8')
	// 			.replaceAll('Insert Name Here', url.searchParams.get('name')),
	// 		'utf-8'
	// 	)
	// );
});
app.get('/training/**/', (req, res) => {
	const url = new URL(path.join('https://steganerds.fr', req.url));
	url.search = '';
	const n = path.basename(url.href);
	for (const endpoint of [
		'/training/intro*',
		'/training/mental*',
		'/training/gaming*',
		'/training/nsfw*'
	]) {
		const newUrl = new URL(url);
		if (!isNaN(+n)) {
			newUrl.pathname =
				'/' + url.pathname.split('/').filter(Boolean).slice(0, -1).join('/');
		}
		if (newUrl.pathname === endpoint.replaceAll('*', '')) {
			res.send(
				applyTemplates(
					fs.readFileSync(
						path.join(
							__dirname,
							'html',
							endpoint.replaceAll('*', ''),
							(isNaN(+n) ? 'index' : 'p' + n) + '.html'
						),
						'utf-8'
					)
				)
			);
			return;
		}
	}
	res.status(404).send('404 Not Found');
});
app.get('/training', (req, res) => res.redirect('/training/intro'));
app.use(express.static('dist'), express.static('./public'));

app.listen(8080);
