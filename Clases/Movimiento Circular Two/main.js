let pos, i, ph, t, freq;
let ct, rad;
let aC = [];
let N = 20;
let M = 20;

function setup()
{
	createCanvas (windowWidth, windowHeight);
	background (0);

	pos = createVector (0, 0);
	ct = createVector (width/2, height/2);

	ph = 0;
	rad = 150;

	for (let j = 0; j < M; j++)
	{
		aC[j] = [];

		for (let i = 0; i < N; i++)
			aC[j][i] = createVector ( (width/(2 * N)) + (i * width/N) , (height/(2 * M)) + (j * height/M) )
	}
}

function draw()
{
	background (0);

	freq = 0.2;
	t = millis()/1000;
	ph = TWO_PI * t * freq;

	for (let j = 0; j < M; j++)
	{
		for (let i = 0; i < N; i++)
		{
			pos.x = aC[j][i].x + rad * cos (noise(t*0.25, j*0.075, i*0.075)*TWO_PI);
			pos.y = aC[j][i].y + rad * sin (noise(t*0.25, j*0.075, i*0.075)*TWO_PI);
	
			fill (255);
			circle (pos.x, pos.y, 10);
			stroke (noise(t*0.25, j*0.075, i*0.075)*255, 
					noise(t*0.25, j*0.075, i*0.075)*random(0, 255),
					noise(t*0.25, j*0.075, i*0.075)*random(0, 255));
			line (aC[j][i].x, aC[j][i].y, pos.x, pos.y);
		}
	}
}