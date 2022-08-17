var pos;
var ph, freq, t, amp, ct;

function setup()
{
	createCanvas (windowWidth, windowHeight);
	background (0);

	pos = createVector (0, 0);
	t = millis()/1000;
	ct = createVector (width/2, height/2);
	amp = 300;
	freq = 0.1;
}

function draw()
{
	background (0);

	t = millis()/1000;
	ph = TWO_PI * freq * t;
	pos.x = ct.x + amp * cos(ph);
	pos.y = ct.y + amp * sin(ph);

	fill (255);
	circle (pos.x, pos.y, 20);
	stroke (255)
	line (ct.x, ct.y, pos.x, pos.y);
}