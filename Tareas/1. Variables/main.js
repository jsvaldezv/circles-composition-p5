let x = 0; 
let y = 0;
let xMin;
let yMin;
let increment = 20;

function setup()
{
	createCanvas (windowWidth, windowHeight);
	background (135);

	xMin = windowWidth;
	yMin = windowHeight;
}

function draw()
{
	stroke(255);

	line (0, y, x, windowHeight);
	x += increment;
	y += increment;

	line (windowWidth, yMin, xMin, 0);
	xMin -= increment;
	yMin -= increment;
}