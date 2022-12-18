let r = 9;
let px, py;
let accX = 0;
let accY = 0.98;

let velX, velY;
let fric;
let pos, vel, acc;

let ballSize = 15;

let sound;
let noSound = true;

function preload()
{
	soundFormats ("mp3");
	sound = loadSound("./bounce.mp3");
}

function setup()
{
	createCanvas (windowWidth, windowHeight);

	px = (width / 2) - (ballSize / 2);
	py = (height / 2) - (ballSize / 2);
	velX = random (-10, 10);
	velY = random (-10, 10);

	pos = createVector (px, py);
	vel = createVector (velX, velY);
	acc = createVector (accX, accY);
	fric = createVector (0.99, 0.99);
}

function draw()
{
	background (0, 185, 157);
	fill (255);
	circle (pos.x, pos.y, ballSize);

	vel.add (acc);
	vel.mult(fric)
	pos.add (vel);

	if (pos.y > height)
	{
		pos.y = height;
		vel.y *= -1;

		if (!noSound)
		{
			sound.setVolume (map(vel.mag(), 0.5, 25, 0, 1));
			sound.play();
		}
	}

	if (pos.y < 0)
	{
		pos.y = 0;
		vel.y *= -1;

		if (!noSound)
		{
			sound.setVolume (map(vel.mag(), 0.5, 25, 0, 1));
			sound.play();
		}
	}

	if (pos.x > width)
	{
		pos.x = width;
		vel.x *= -1;

		if (!noSound)
		{
			sound.setVolume (map(vel.mag(), 0.5, 25, 0, 1));
			sound.play();
		}
	}

	if (pos.x < 0)
	{
		pos.x = 0;
		vel.x *= -1;

		if (!noSound)
		{
			sound.setVolume (map(vel.mag(), 0.5, 25, 0, 1));
			sound.play();
		}
	}
}

function mouseClicked()
{
	noSound = !noSound;
}