let freq, t, rad;
let increment = 0;
let colorBall = 0;
let numBalls = 10;
let circles = [];
let doPlay = false;

let notes = []
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
		this.env = new p5.Envelope (0, 0.5, 0.3, 0.0);
		this.osc = new p5.Oscillator ("triangle");
		this.osc.freq (300);
		this.osc.amp (this.env);

		this.env.setInput (this.osc);
	}

	setFreq (inFreq) { this.osc.freq (inFreq); }

	setPlayed (inState) { this.played = inState; }

	getPlayed() { return this.played; }
}

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
		circles.push (new Ball(width, height, dephase));
		dephase += increment;

		circles[i].osc.freq(midiToFreq(firstNote+i));
	}
}

function draw()
{
	background (0, 0, 0);

	t = millis()/1000;

	for (let i = 0; i < numBalls; i++)
	{
		circles[i].phb = circles[i].ph;
		circles[i].ph = TWO_PI * t * freq + circles[i].dephase;
	
		circles[i].pos.x = circles[i].ct.x + rad * cos (circles[i].ph);
		circles[i].pos.y = circles[i].ct.y + rad * sin (circles[i].ph);
	
		stroke (255, 255, 255);
	
		fill (circles[i].color[0], circles[i].color[1], circles[i].color[2]);
		line (circles[i].ct.x, circles[i].ct.y, circles[i].pos.x, circles[i].pos.y);
		circle (circles[i].pos.x, circles[i].pos.y, 20);

		circles[i].ph = circles[i].ph % TWO_PI;
		validatePhase(i);
	}
}

function validatePhase (index)
{
	let quarter = TWO_PI/4;

	// First quarter
	if (circles[index].phb >= 0 && circles[index].phb < quarter)
	{
		// orange
		circles[index].color = [234, 110, 0];
	}

	// Second quarter
	if (circles[index].phb >= quarter && circles[index].phb < quarter * 2)
	{
		// green
		circles[index].color = [53, 234, 0];		
	}

	// Third quarter
	if (circles[index].phb >= (quarter * 2) && circles[index].phb < (quarter * 3))
	{
		// blue
		circles[index].color = [0, 53, 234];
	}

	// Fourth quarter
	if (circles[index].phb >= circles[index].ph)
	{
		circles[index].color = [255, 255, 255];

		if (doPlay)
		{
			circles[index].osc.start();
			circles[index].env.play (circles[index].osc);
		}
	}
}

function mouseClicked()
{
	doPlay = !doPlay;

	if (doPlay)
	{
		console.log("Start playing");

		for (let i = 0; i < numBalls; i++)
		{
			//circles[i].osc.start();
			// circles[i].env.play();
		}
	}

	else
	{
		console.log("Stop playing");

		for (let i = 0; i < numBalls; i++)
		{
			circles[i].osc.stop();
		}
	}
}