const interactions = [true, false, true];
const vid = document.querySelector('video');
const start = document.querySelector('.start');
const scam = document.querySelector('.scam');
const noscam = document.querySelector('.noscam');
const explanation = document.querySelector('.explanation');
start.addEventListener('click', function () {
	vid.play();
	start.style.display = 'none';
});
const durations = [21, 40, 63];
function checkTime() {
	for (const d of durations) {
		if (vid.currentTime >= d) {
			vid.pause();
			durations.splice(durations.indexOf(d), 1);
			scam.style.display = 'block';
			noscam.style.display = 'block';
		}
	}
	requestAnimationFrame(checkTime);
}
checkTime();
scam.addEventListener('click', function () {
	if (interactions[0] === true) {
		interactions.shift();
		explanation.textContent = 'Nice work!';
		explanation.style.display = 'block';
		scam.style.display = 'none';
		noscam.style.display = 'none';
		setTimeout(s, 1500);
	} else {
		interactions.shift();
		explanation.textContent = 'Not quite...';
		explanation.style.display = 'block';
		scam.style.display = 'none';
		noscam.style.display = 'none';
		setTimeout(s, 4000);
	}
});
noscam.addEventListener('click', function () {
	if (interactions[0] === false) {
		interactions.shift();
		explanation.textContent = 'Nice work!';
		explanation.style.display = 'block';
		scam.style.display = 'none';
		noscam.style.display = 'none';
		setTimeout(s, 1500);
	} else {
		interactions.shift();
		explanation.textContent = 'Not quite...';
		explanation.style.display = 'block';
		scam.style.display = 'none';
		noscam.style.display = 'none';
		setTimeout(s, 4000);
	}
});
function s() {
	vid.play();
	explanation.style.display = 'none';
}
vid.addEventListener('ended', function () {
	location.href = '../nsfw';
});
