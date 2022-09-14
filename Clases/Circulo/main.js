let freq, t, rad;
let increment = 0;
let colorBall = 0;

let numCirles = 10;
let numBalls = 3;
let circles = [];

let doPlay = false;

function setup()
{
	createCanvas (windowWidth, windowHeight);
	background (0);

	increment = TWO_PI / numCirles;
	t = millis()/1000;
	rad = 150;
	freq = 0.25;

	let xDephase = 0;
	let yDephase = 0;
	let moveIncrement = 0;

	for (let i = 0; i < numCirles; i++)
	{
		circles.push (new Circle (numBalls, xDephase, yDephase, moveIncrement));

		xDephase += 30;
		yDephase += 30;
		moveIncrement += 20;
	}
}

function draw()
{
	background (0, 0, 0);
	t = millis()/1000;

	for (let i = 0; i < numCirles; i++)
		circles[i].paint(t);
}

function mouseClicked()
{
	doPlay = !doPlay;

	if (doPlay)
	{
		console.log("Start playing");

		for (let i = 0; i < numCirles; i++)
			circles[i].prepareSound();
	}

	else
	{
		console.log("Stop playing");

		for (let i = 0; i < numCirles; i++)
			circles[i].stopSound();
	}
}