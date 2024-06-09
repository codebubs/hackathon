const messages = [
	{
		scam: true,
		message: [
			'Hello I am adewale Okonkwo the hair to the throne of Africa..',
			'Hello. Nice to meet you!',
			'please lets be Friends?',
			'Sure!',
			'You are very Nice person!,so Please help once? I need some money because I am lost in somewhere',
			'Oh no, how much?',
			'I need 2000 american money!!! Plese send fast I am scaredd',
			"Are you not royalty? Why can't you ask someone to help you?",
			'no connection please send i will be gone if you dont help me so help me'
		],
		explanation: {
			correct:
				'Nice work! This one was pretty obvious. The scammer was clearly only talking to you to get money from you.',
			incorrect:
				'This is an obvious scam. The scammer is trying to get you to send them money. If you want, you can review the lessons by clicking on the red dot on the top right corner.'
		}
	},
	{
		scam: false,
		message: [
			"Hey! I'm new to this app!",
			"Hi, nice to meet you! What's your name?",
			"I'm not comfortable with sharing that, sorry.",
			'So, what do you do for fun?',
			'I like to play video games. You?',
			'Oh, not much. I like reading books and going outside.',
			'You have any pets?',
			"No, I don't.",
			"Oh, ok. I don't have any either. Tell me more about yourself!"
		],
		explanation: {
			correct:
				"Nice work! Here, the person you are talking to isn't repeatedly asking you for money or sensitive information like your age, address, etc.",
			incorrect:
				'Even though this person is asking for your name and hobbies, they aren\'t encroaching on your privacy to the extent that you should consider them a scammer. You can use wording like "I\'m not comfortable sharing that" to keep your information private and make a new online friend.'
		}
	},
	{
		scam: true,
		message: [
			'Hullo! I noticed we were in the same group!',
			"Oh, haha! What's your name?",
			"I'm Sergei Ivanov. You?",
			"I don't want to share it, sorry.",
			"Oh, come on, I told you mine! Why don't you tell me it?",
			'Ok fine. My name is Luca.',
			'Cool name! Anyways, you seem like a nice guy, what do you do for a living.',
			"Um, I'm a student. I live off of a loan.",
			'Oh, ok.',
			"You're in luck! I've come up with a business opportunity!",
			"Eh, I'm not really interested.",
			'Dude, come on. You need the money.'
		],
		explanation: {
			correct:
				"Great! This person is trying to convince you to lend him money, which he most likely won't return.",
			incorrect:
				"Try again! This person is evidently trying to convince you to lend him money, which he most likely won't return."
		},
		offset: true
	},
	{
		scam: false,
		message: [
			'Hey, can you help me with a problem?',
			'Who is this? ',
			"Oh, I'm from the study server. I saw that you were very experienced and I thought that you could help me with my issue.",
			'Oh ok, I can help!',
			'Thanks. Basically, I have this issue, and it says I need to reference this book. Do you know how I can find this book?',
			'You can buy it online for $50.',
			"Aw man, I don't have that kinda money! Without this, I might fail!! If you can, do you think you could help me? If you do, I promise I'll pay you back! YOu don't have to, but I'd really appreciate if you helped."
		],
		explanation: {
			correct:
				"Great! This person isn't being overly assertive or forceful, so you can assume innocence.",
			incorrect:
				"Try again! This person isn't being overly assertive or forceful, so you can assume innocence."
		}
	}
].sort(() => (Math.random() > 0.5 ? 1 : -1));
const chat = document.querySelector('.chat');
let current = 0;
const block = document.querySelector('.block');
const dont = document.querySelector('.dont');
const next = document.querySelector('.next');
const retry = document.querySelector('.retry');
const complete = document.querySelector('.complete');
const nextfull = document.querySelector('.nextfull');
const completefull = document.querySelector('.completefull');
function build() {
	resetButtons();
	block.style.display = 'block';
	dont.style.display = 'block';
	chat.innerHTML = '';
	for (const [i, m] of messages[current].message.entries()) {
		if ((i + Number(!!messages[current].offset)) % 2 === 0) {
			chat.innerHTML +=
				'<div class="flex gap-3"><div class="profileimage" style="background-color:' +
				colors[current] +
				'"></div><div><div class="mb-1">' +
				usernames[current] +
				'</div><div>' +
				m +
				'</div>';
		} else {
			chat.innerHTML +=
				'<div class="flex gap-3"><div class="profileimage" style="background-color:rgb(255,255,255)"></div><div><div class="mb-1">You</div><div>' +
				m +
				'</div>';
		}
	}
}
function resetButtons() {
	for (const b of [
		block,
		dont,
		next,
		retry,
		complete,
		nextfull,
		completefull
	]) {
		b.style.display = 'none';
	}
}
function answer(c) {
	resetButtons();
	if (c === messages[current].scam) {
		chat.innerHTML = messages[current].explanation.correct;
		if (current >= messages.length - 1) {
			completefull.style.display = 'block';
		} else {
			nextfull.style.display = 'block';
		}
	} else {
		chat.innerHTML = messages[current].explanation.incorrect;
		retry.style.display = 'block';
		if (current >= messages.length - 1) {
			complete.style.display = 'block';
		} else {
			next.style.display = 'block';
		}
	}
}
function doNext() {
	current++;
	build();
	for (const [i, c] of [...document.querySelectorAll('.card')].entries()) {
		if (i === current) {
			c.classList.add('light');
		} else c.classList.remove('light');
	}
}
block.addEventListener('click', () => answer(true));
dont.addEventListener('click', () => answer(false));
retry.addEventListener('click', build);
next.addEventListener('click', doNext);
nextfull.addEventListener('click', doNext);
complete.addEventListener('click', function () {
	location.href = '../gaming';
});
completefull.addEventListener('click', function () {
	location.href = '../gaming';
});
build();
