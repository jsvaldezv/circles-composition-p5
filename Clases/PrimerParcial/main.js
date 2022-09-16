let freq, t, rad;
let increment = 0;

let colorBall = 0;
let numBalls = 15;
let circles = [];

let doPlay = false;

function setup()
{
	createCanvas (windowWidth, windowHeight);

	muCir = new Circle (10, 60, width/4, 0.1);
	muCir_1 = new Circle (6, 80, width/4, 0.07);
	muCir_2 = new Circle (3, 90, width/4, 0.05);
}

function draw()
{
	background (0, 0, 0);

	muCir.paint();
    muCir_1.paint();
    muCir_2.paint();
}

function mouseClicked()
{
	doPlay = !doPlay;

	if (doPlay)
	{
		console.log("Start playing");

		muCir.prepareSound();
		muCir_1.prepareSound();
		muCir_2.prepareSound();
	}

	else
	{
		console.log("Stop playing");

		muCir.stopSound();
		muCir_1.stopSound();
		muCir_2.stopSound();
	}
}