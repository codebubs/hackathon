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
			if (d.length === 0) location.href = './4';
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
// vid.play();
// const chat = document.querySelector('.chat');
// let current = 0;
// const block = document.querySelector('.block');
// const dont = document.querySelector('.dont');
// const next = document.querySelector('.next');
// const retry = document.querySelector('.retry');
// const complete = document.querySelector('.complete');
// const nextfull = document.querySelector('.nextfull');
// const completefull = document.querySelector('.completefull');
// function build() {
// 	resetButtons();
// 	block.style.display = 'block';
// 	dont.style.display = 'block';
// 	chat.innerHTML = '';
// 	for (const [i, m] of messages[current].message.entries()) {
// 		if ((i + Number(!!messages[current].offset)) % 2 === 0) {
// 			chat.innerHTML +=
// 				'<div class="flex gap-3"><div class="profileimage" style="background-color:' +
// 				colors[current] +
// 				'"></div><div><div class="mb-1">' +
// 				usernames[current] +
// 				'</div><div>' +
// 				m +
// 				'</div>';
// 		} else {
// 			chat.innerHTML +=
// 				'<div class="flex gap-3"><div class="profileimage" style="background-color:rgb(255,255,255)"></div><div><div class="mb-1">You</div><div>' +
// 				m +
// 				'</div>';
// 		}
// 	}
// }
// function resetButtons() {
// 	for (const b of [
// 		block,
// 		dont,
// 		next,
// 		retry,
// 		complete,
// 		nextfull,
// 		completefull
// 	]) {
// 		b.style.display = 'none';
// 	}
// }
// function answer(c) {
// 	resetButtons();
// 	if (c === messages[current].scam) {
// 		chat.innerHTML = messages[current].explanation.correct;
// 		if (current >= messages.length - 1) {
// 			completefull.style.display = 'block';
// 		} else {
// 			nextfull.style.display = 'block';
// 		}
// 	} else {
// 		chat.innerHTML = messages[current].explanation.incorrect;
// 		retry.style.display = 'block';
// 		if (current >= messages.length - 1) {
// 			complete.style.display = 'block';
// 		} else {
// 			next.style.display = 'block';
// 		}
// 	}
// }
// function doNext() {
// 	current++;
// 	build();
// 	for (const [i, c] of [...document.querySelectorAll('.card')].entries()) {
// 		if (i === current) {
// 			c.classList.add('light');
// 		} else c.classList.remove('light');
// 	}
// }
// block.addEventListener('click', () => answer(true));
// dont.addEventListener('click', () => answer(false));
// retry.addEventListener('click', build);
// next.addEventListener('click', doNext);
// nextfull.addEventListener('click', doNext);
// complete.addEventListener('click', function () {
// 	location.href = '../gaming';
// });
// completefull.addEventListener('click', function () {
// 	location.href = '../gaming';
// });
// build();
