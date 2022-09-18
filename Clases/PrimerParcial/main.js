let circles = [];
let numCircles = 0;
let doPlay = false;

let C = ["C4", "E4", "G4", "B4", "D5", "F5"];
let G = ["G3", "B3", "D4", "F#4", "A4", "C5"];
let F = ["F4", "A4", "C4", "E5", "G5", "Bb5"];

let chords = [C, G, F];

let colorOne, colorTwo, colorThree;
let incrementOne = 1, incrementTwo = 1, incrementThree = 1;
let limitOne, limitTwo;

function setup()
{
	createCanvas (windowWidth, windowHeight);
	strokeWeight(1);

	numCircles = randomInt(1, 10);

	updateForms();
	setInterval(updateForms, 10000);
}

function draw()
{
	background (0, 0, 0);
	checkColors();

	//drawingContext.shadowBlur = 5;
	//drawingContext.shadowColor = color(255, 255, 255);

	let gradient = drawingContext.createLinearGradient (width/2-200, height/2-200, width/2+200, height/2+200);
	gradient.addColorStop (0, color (limitOne, colorOne, colorTwo, colorThree));
	gradient.addColorStop (0, color (limitTwo, colorOne, colorTwo, colorThree));
	drawingContext.strokeStyle = gradient;

	for (let i = 0; i < numCircles; i++)
	{
		for (let j = 0; j < circles[i].length; j++)
		{
			circles[i][j].paint();
		}
	}
}

function checkColors()
{
	colorOne += incrementOne;
	colorTwo += incrementTwo;
	colorThree += incrementThree;

	if (colorOne >= 255 || colorOne <= 50)
		incrementOne *= -1;

	if (colorTwo >= 255 || colorTwo <= 50)
		incrementTwo *= -1;

	if (colorThree >= 255 || colorThree <= 50)
		incrementThree *= -1;
}

function updateForms()
{
	numCircles = randomInt(1, 10);
	circles = [];

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
									 height * posY,
									 0.1,
									 chordToUse[randomInt(0, chordToUse.length)],
									 randomBool()));
		}

		x += width/numCircles;
		y += height/numCircles;

		circles.push (circle);
	}

	colorOne = randomInt (0, 255);
	colorTwo = randomInt (0, 255);
	colorThree = randomInt (0, 255);
	limitOne = random (0, 1);
	limitTwo = random (0, 1);

	for (let i = 0; i < numCircles; i++)
	{
		for (let j = 0; j < circles[i].length; j++)
		{
			circles[i][j].stopSound();
		}
	}

	checkAudioStatus();
}

function mouseClicked()
{
	doPlay = !doPlay;
	checkAudioStatus();
}

function checkAudioStatus()
{
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