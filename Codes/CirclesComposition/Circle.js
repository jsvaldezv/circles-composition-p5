class Circle
{
	constructor (numBalls, radio, initPosX, initPosY, freqMove, rootNote, inverse)
	{
		this.numBalls = numBalls;
		this.pos = [];
		this.ph = [];
		this.php = [];
		this.color = [];
		this.mult = 1;

		for (let i = 0; i < this.numBalls; i++)
		{
			this.pos[i] = createVector (0, 0);
			this.color.push ([0, 0, 0]);
		}

		this.t = millis()/1000;
		this.ctx = initPosX;
		this.ct = createVector (initPosX, initPosY);
		this.rad = radio;
		this.freq = freqMove;
		this.quarter = TWO_PI/4;

		this.setInverse (inverse);

		// Sound //
		this.doPlay;
		this.iM = [];
		this.fMod = [];
		this.rootNote = rootNote;
		this.timeNote = 1/this.numBalls;

		this.synth = new p5.MonoSynth();
		this.delay = new p5.Delay();

		//this.env = new p5.Envelope (0, 0.5, 0.3, 0.0);
		//this.env.setInput (this.synth);
	}

	// Getters
	randomColor() { return random (0, 255); }
	randomVelocity() { return random(0, 1); }

	// Setters
	setInverse (inInverse) 
	{ 
		if (inInverse)
			this.mult = -1
		else
			this.mult = 1
	}

	// General
	checkPhase (index)
	{
		// // First quarter - orange
		if (this.php[index] > (this.quarter * 3))
		{
			this.color[index] = [0, 0, 0];
		}
	
		// // Second quarter - green
		if (this.php[index] >= this.quarter && this.php[index] < this.quarter * 2)
		{
			this.color[index] = [0, 0, 0];
		}
	
		// // Third quarter - blue
		if (this.php[index] >= (this.quarter * 2) && this.php[index] < (this.quarter * 3))
		{
			this.color[index] = [0, 0, 0];
		}

		// Fourth quarter - white
		if (this.php[index] >= this.ph[index])
		{
			this.color[index] = [colorOne, colorTwo, colorThree];
			this.playSound (index);
		}
	}

	// Graphics
	paint()
	{
		this.t = millis()/1000;

		for (let i = 0 ; i < this.numBalls; i++)
		{
			this.php[i] = this.ph[i];
			this.ph[i] = (TWO_PI * this.freq * this.t) + ((TWO_PI/this.numBalls) * i);
	  
			this.pos[i].x = this.ct.x + this.rad * (this.mult * cos (this.ph[i]));
			this.pos[i].y = this.ct.y + this.rad * sin (this.ph[i]);
	  
			stroke (255, 255, 255);
			fill (this.color[i][0], this.color[i][1], this.color[i][2]);
			line (this.ct.x, this.ct.y, this.pos[i].x, this.pos[i].y);
			circle (this.pos[i].x, this.pos[i].y, 15);

			this.ph[i] = this.ph[i] % TWO_PI;
			this.checkPhase (i);
			stroke (255);

			if (i > 0)
			{
				line (this.pos[i].x, this.pos[i].y, this.pos[i-1].x, this.pos[i-1].y);
				line (this.pos[0].x, this.pos[0].y, this.pos[this.numBalls-1].x, this.pos[this.numBalls-1].y);
			}
		}

		//translate (p5.Vector.fromAngle(millis() / 1000, 10));
	}

	// Sound
	prepareSound()
	{
		userStartAudio();
		this.synth.disconnect();
		this.synth.amp(0.1);
		this.delay.process (this.synth, 0.2, .7, 3000);
	}

	playSound (index)
	{
		if (doPlay)
		{
			//this.synth.disconnect();
			this.synth.play (this.rootNote, this.randomVelocity(), 0, this.timeNote);
		}
	}

	stopSound()
	{
		this.synth.disconnect();
	}
}