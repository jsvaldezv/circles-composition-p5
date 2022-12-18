let pos;
let ph, freq, t, ct, rad;
let px, py;
let r, g, b;
let incR, incG, incB;

let carr, modu;
let delay;
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

	incR = 2;
	incG = 1;
	incB = 0.5;
	doPlay = false;

	carr = new p5.Oscillator("sine");
	modu = new p5.Oscillator("sine");
	delay = new p5.Delay();
}

function draw()
{
	t = millis()/1000;
	ph = TWO_PI * freq * t;
	py = height/2 + 150 * cos (TWO_PI*5*px/width);

	ct.set (px, py);
	pos.x = ct.x + rad * cos(ph);
	pos.y = ct.y + rad * sin(ph);

	stroke (r,g,b);
	line (ct.x, ct.y, pos.x, pos.y);

	px++;
	px = px % width;

	if (doPlay) 
	{
		iM = map (py, height/2+150, height/2-150, 0, 100);
		fMod = map (px, width/2+150, width/2-150, 0, 100);

		modu.freq (iM);
		modu.amp (iM * fMod);
		carr.amp (map (py, height/2+150, height/2-150, 0, 100));
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
		modu.amp (50); // esto es DeltaF
	
		carr.amp (map (py, height/2+150, height/2-150, 0, 100));
		modu.disconnect();
		
		carr.freq (modu);
		modu.start()
		carr.start();

		delay.process (carr, 0.2, .7, 3000);
	}

	else
	{
		modu.stop();
		carr.stop();
	}
}