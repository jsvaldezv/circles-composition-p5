class Circle
{
	constructor (inNumBalls, xDephase, yDephase, inMoveIncrement)
	{
		this.numBalls = inNumBalls;
		this.circles = [];

		let dephase = 0;
		let firstNote = 60;
		let increment = TWO_PI / this.numBalls;

		for (let i = 0; i < this.numBalls; i++)
		{
			this.circles.push (new Ball (width, height, dephase, xDephase, yDephase, inMoveIncrement));
			dephase += increment;

			this.circles[i].osc.freq (midiToFreq (firstNote+i));
			this.circles[i].oscTwo.freq (midiToFreq (firstNote+ (i + 3)));
		}
	}

	paint(t)
	{
		for (let i = 0; i < this.numBalls; i++)
			this.circles[i].paint(t);
	}

	prepareSound()
	{
		for (let i = 0; i < this.numBalls; i++)
			this.circles[i].prepareSound();
	}

	stopSound()
	{
		for (let i = 0; i < this.numBalls; i++)
			this.circles[i].stopSound();
	}
}