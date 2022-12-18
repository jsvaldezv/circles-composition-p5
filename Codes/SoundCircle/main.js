let freq, t, rad;
let increment = 0;

let colorBall = 0;
let numBalls = 15;
let circles = [];

let doPlay = false;

function setup()
{
	createCanvas (windowWidth, windowHeight);
	background (0);

	increment = TWO_PI / numBalls;
	t = millis()/1000;
	rad = 150;
	freq = 0.25;

	let dephase = 0;
	let firstNote = 60;

	for (let i = 0; i < numBalls; i++)
	{
		circles.push (new Ball (width, height, dephase));
		dephase += increment;

		circles[i].osc.freq (midiToFreq(firstNote+i));
		circles[i].oscTwo.freq (midiToFreq(firstNote+ (i + 3)));
	}
}

function draw()
{
	background (0, 0, 0);

	t = millis()/1000;

	for (let i = 0; i < numBalls; i++)
		circles[i].paint(t);
}

function mouseClicked()
{
	doPlay = !doPlay;

	if (doPlay)
	{
		console.log("Start playing");

		for (let i = 0; i < numBalls; i++)
			circles[i].prepareSound();
	}

	else
	{
		console.log("Stop playing");

		for (let i = 0; i < numBalls; i++)
			circles[i].stopSound();
	}
}