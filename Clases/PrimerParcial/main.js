let circles = [];
let numCircles = 5;
let doPlay = false;

let C = ["C4", "E4", "G4", "B4", "D5", "F5"];
let G = ["G3", "B3", "D4", "F#4", "A4", "C5"];
let F = ["F4", "A4", "C4", "E5", "G5", "Bb5"];

let chords = [C, G, F];

function setup()
{
	createCanvas (windowWidth, windowHeight);

	let x = (width/numCircles * 0.5);
	let y = (height/numCircles * 0.5);

	for (let i = 0; i < numCircles; i++)
	{
		let circle = []
		let chordToUse = chords[randomInt(0, chords.length)];
		
		let posY = random(0, 1);

		for (let j = 0; j < randomInt(1, 5); j++)
		{
			let radio = randomInt(10, 200);
			circle.push (new Circle (randomInt(2, 10), 
									 radio,
									 x, 
									 height * posY - (radio/2),
									 0.1,
									 chordToUse[randomInt(0, chordToUse.length)],
									 randomBool()));
		}

		x += width/numCircles;
		y += height/numCircles;

		circles.push (circle);
	}

	//muCir.setInverse (true);
}

function draw()
{
	background (0, 0, 0);

	for (let i = 0; i < numCircles; i++)
	{
		for (let j = 0; j < circles[i].length; j++)
		{
			circles[i][j].paint();
		}
	}
}

function mouseClicked()
{
	doPlay = !doPlay;

	if (doPlay)
	{
		console.log("Start playing");

		for (let i = 0; i < numCircles; i++)
		{
			for (let j = 0; j < circles[i].length; j++)
			{
				circles[i][j].prepareSound();
			}
		}
	}

	else
	{
		console.log("Stop playing");

		for (let i = 0; i < numCircles; i++)
		{
			for (let j = 0; j < circles[i].length; j++)
			{
				circles[i][j].stopSound();
			}
		}
	}
}

function randomInt (lowLimit, highLimit)
{
	return parseInt (random (lowLimit, highLimit));
}

function randomBool()
{
	return Math.random() < 0.5;
}