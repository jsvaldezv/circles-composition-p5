let damp;
let pos, vel, acc;
let prt;

function setup()
{
	createCanvas (windowWidth, windowHeight);
	background (145);

	pos = createVector(0, 0);
	vel = createVector(0, 0);
	acc = createVector(0, 0.98);

	damp = 0.99;

	prt = new Particle();
}

function draw()
{
	background (145);

	prt.update();
	prt.draw();
}

function mouseClicked()
{
	prt.clickedMouse();
}