const submit = document.querySelector('.submit');
const answers = {
	1: '3',
	2: '2',
	3: '4'
};
function getQuestionValue(name) {
	const e = document.querySelector('input[name="' + name + '"]:checked');
	return e && e.value;
}
submit.addEventListener('click', function () {
	let score = 0;
	for (let i = 1; i <= 3; i++) {
		const v = getQuestionValue(i);
		if (!v) {
			return;
		} else if (v === answers[i]) {
			score++;
		}
	}
	location.href = './4?score=' + score;
});
