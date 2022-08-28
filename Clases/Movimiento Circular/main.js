let pos;
let ph, freq, t, ct, rad, px;
let r, g, b, incR, incG, incB;

let carr, modu;
let doPlay;

let iM;
let fMod;

function setup()
{
	createCanvas (windowWidth, windowHeight);
	background (0);

	pos = createVector (0, 0);
	t = millis()/1000;
	ct = createVector (width/2, height/2);

	rad = 150;
	freq = 0.1;
	px = 0;
	r = 45;
	g = 80;
	b = 200;

	incR = 1;
	incG = 2;
	incB = 0.5;

	doPlay = false;
	carr = new p5.Oscillator("sine");
	modu = new p5.Oscillator("sine");
}

function draw()
{
	//background (0);

	t = millis()/1000;
	ph = TWO_PI * freq * t;
	ct.set(px, height/2 + 150 * cos(px/width * TWO_PI));
	pos.x = ct.x + rad * cos(ph);
	pos.y = ct.y + rad * sin(ph);

	//fill (255);
	//circle (pos.x, pos.y, 20);
	stroke (r,g,b);
	line (ct.x, ct.y, pos.x, pos.y);

	px++;
	px = px%width;

	if (doPlay) 
	{
		iM = mouseX;
		fMod = mouseY;

		modu.freq(mouseX);
		carr.freq(mouseY);
	}

	r += incR;
	g += incG;
	b += incB;

	if (r > 255 || r < 0)
		incR *= -1;

	if (g > 255 || g < 0)
		incG *= -1;
	
	if (b > 255 || b < 0)
		incB *= -1;
}

function mouseClicked()
{
	doPlay = !doPlay;

	if (doPlay)
	{
		modu.freq (110);
		modu.amp (iM * fMod); // dF

		carr.amp (0.5);
		modu.disconnect();
		carr.freq (modu);
		modu.start();
		carr.start();
	}

	else
	{
		modu.stop();
		carr.stop();
	}
}