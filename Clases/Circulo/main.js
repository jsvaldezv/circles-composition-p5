let freq, t, rad;
let ct, pos, ph, phb, color = [0, 0, 0];
let pos2, ct2, ph2, phb2, color2 = [0, 0, 0];
let colorBall = 0;

class Ball
{
	constructor()
	{
		this.ct = createVector (width/2, height/2);
		this.pos = createVector (0, 0);
		this.ph = 0;
		this.phb = 0;
		this.color = [0, 0, 0];
	}
}

function setup()
{
	createCanvas (windowWidth, windowHeight);
	background (0);

	pos = createVector (0, 0);
	pos2 = createVector (0, 0);
	t = millis()/1000;
	ct = createVector (width/2, height/2);
	ct2 = createVector (width/2, height/2);
	
	rad = 150;
}

function draw()
{
	background (0, 0, 0);

	freq = 0.2;
	t = millis()/1000;
	ph = TWO_PI * t * freq;
	ph2 = TWO_PI * t * freq + TWO_PI/3;

	phb = ph;
	phb2 = ph2;
	validatePhase();

	pos.x = ct.x + rad * cos (ph);
	pos.y = ct.y + rad * sin (ph);

	pos2.x = ct.x + rad * cos (ph2);
	pos2.y = ct.y + rad * sin (ph2);

	stroke (255, 255, 255);

	fill (color[0], color[1], color[2]);

	line (ct.x, ct.y, pos.x, pos.y);
	circle (pos.x, pos.y, 20);

	fill (color2[0], color2[1], color2[2]);

	line (ct2.x, ct2.y, pos2.x, pos2.y);
	circle (pos2.x, pos2.y, 20);
}

function validatePhase()
{
	let twoSeven = TWO_PI/4;

	// First cirlce
	// 0 grados
	if (ph > TWO_PI)
	{
		color = [0, 0, 0]
		ph = ph % TWO_PI;
	}

	// 90 grados
	if (ph > TWO_PI/4)
		color = [243, 59, 0]
		// fill (243, 59, 0);

	// 180 grados
	if (ph > TWO_PI/2)
		color = [224, 0, 243]
		// fill (224, 0, 243);

	// 270 grados
	if (ph > twoSeven * 3)
		color = [243, 114, 0]
		// fill (243, 114, 0);

	// Second cirlce
	// 0 grados
	if (ph2 > TWO_PI)
	{
		color2 = [0, 0, 0]
		// fill (0, 0, 0);
		ph2 = ph2 % TWO_PI;
	}

	// 90 grados
	if (ph2 > TWO_PI/4)
		color2 = [243, 59, 0]
		// fill (243, 59, 0);

	// 180 grados
	if (ph2 > TWO_PI/2)
		color2 = [224, 0, 243]
		fill (224, 0, 243);

	// 270 grados
	if (ph2 > twoSeven * 3)
		color2 = [243, 114, 0]
		fill (243, 114, 0);
}