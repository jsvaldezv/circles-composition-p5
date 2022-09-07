let freq, t, rad;
let increment = 0;
let colorBall = 0;
let numBalls = 15;
let circles = [];
let doPlay = false;

class Ball
{
	constructor(inWidth, inHeight, inDephase)
	{
		// Paint
		this.ct = createVector (inWidth/2, inHeight/2);
		this.pos = createVector (0, 0);
		this.ph = 0;
		this.phb = 0;
		this.color = [0, 0, 0];
		this.dephase = inDephase;

		// Sound
		this.played = false;
		this.env = new p5.Envelope (0, 0.7, 0.3, 0.1);
		this.osc = new p5.Oscillator ("triangle");
		this.osc.freq (300);
		this.osc.amp (this.env);
	}

	setFreq (inFreq) { this.osc.freq (inFreq); }
}

function setup()
{
	createCanvas (windowWidth, windowHeight);
	background (0);

	increment = TWO_PI / numBalls;
	t = millis()/1000;
	rad = 150;
	freq = 0.1;
	let dephase = 0;

	for (let i = 0; i < numBalls; i++)
	{
		circles.push (new Ball(width, height, dephase));
		dephase += increment;
	}
}

function draw()
{
	background (0, 0, 0);

	t = millis()/1000;

	for (let i = 0; i < numBalls; i++)
	{
		circles[i].ph = TWO_PI * t * freq + circles[i].dephase;
		circles[i].phb = circles[i].ph;
	
		circles[i].pos.x = circles[i].ct.x + rad * cos (circles[i].ph);
		circles[i].pos.y = circles[i].ct.y + rad * sin (circles[i].ph);
	
		stroke (255, 255, 255);
	
		fill (circles[i].color[0], circles[i].color[1], circles[i].color[2]);
		line (circles[i].ct.x, circles[i].ct.y, circles[i].pos.x, circles[i].pos.y);
		circle (circles[i].pos.x, circles[i].pos.y, 20);

		validatePhase(i);
	}
}

function validatePhase (index)
{
	let twoSeven = TWO_PI/4;

	if (circles[index].ph > TWO_PI)
	{
		circles[index].color = [0, 0, 0];
		circles[index].ph = circles[index].ph % TWO_PI;
		circles[index].played = false;
	}

	if (circles[index].ph > TWO_PI/4)
	{
		circles[index].color = [243, 59, 0];
		circles[index].played = true;
	}

	if (circles[index].ph > TWO_PI/2)
	{
		circles[index].color = [224, 0, 243];
	}

	if (circles[index].ph > twoSeven * 3)
	{
		circles[index].color = [243, 114, 0];			

		if (doPlay)
		{
			circles[index].osc.start();
			//circles[index].env.play (circles[index].osc);
		}
	}
}

function mouseClicked()
{
	doPlay = !doPlay;

	if (doPlay)
	{
		console.log("Start playing");
		// for (let i = 0; i < numBalls; i++)
		// {
		// 	circles[i].env.play();
		// }
	}

	else
	{
		console.log("Stop playing");
		// for (let i = 0; i < numBalls; i++)
		// {
		// 	circles[i].osc.stop();
		// }
	}
}