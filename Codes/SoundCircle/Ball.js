class Ball
{
	constructor (inWidth, inHeight, inDephase)
	{
		// Paint
		this.ct = createVector (inWidth/2, inHeight/2);
		this.pos = createVector (0, 0);
		this.ph = 0;
		this.phb = 0;
		this.color = [0, 0, 0];
		this.dephase = inDephase;

		// Sound
		this.played = false;
		this.env = new p5.Envelope (0, 0.5, 0.3, 0.0);

		this.osc = new p5.Oscillator ("triangle");
		this.osc.freq (300);
		this.osc.amp (this.env);

		this.oscTwo = new p5.Oscillator ("sine");
		this.oscTwo.freq (300);
		this.oscTwo.amp (this.env);

		this.env.setInput (this.osc);
		this.env.setInput (this.oscTwo);
	}

	prepareSound()
	{
		this.osc.start();
		this.oscTwo.start();
	}

	stopSound()
	{
		this.osc.stop();
		this.oscTwo.stop();
	}

	checkPhase()
	{
		let quarter = TWO_PI/4;

		// First quarter
		if (this.phb > (quarter * 3))
		{
			// orange
			this.color = [234, 110, 0];
		}
	
		// Second quarter
		if (this.phb >= quarter && this.phb < quarter * 2)
		{
			// green
			this.color = [53, 234, 0];		
		}
	
		// Third quarter
		if (this.phb >= (quarter * 2) && this.phb < (quarter * 3))
		{
			// blue
			this.color = [0, 53, 234];
		}
	
		// Fourth quarter
		if (this.phb >= this.ph)
		{
			// white
			this.color = [255, 255, 255];
	
			if (doPlay)
			{
				this.prepareSound();
				this.env.play (this.osc);
			}
		}
	}

	paint(inT)
	{
		this.phb = this.ph;
		this.ph = TWO_PI * inT * freq + this.dephase;

		this.pos.x = this.ct.x + rad * cos (this.ph);
		this.pos.y = this.ct.y + rad * sin (this.ph);

		stroke (255, 255, 255);

		fill (this.color[0], this.color[1], this.color[2]);
		line (this.ct.x, this.ct.y, this.pos.x, this.pos.y);
		circle (this.pos.x, this.pos.y, 20);

		this.ph = this.ph % TWO_PI;
		this.checkPhase();
	}

	setFreq (inFreq) { this.osc.freq (inFreq); }

	setPlayed (inState) { this.played = inState; }

	getPlayed() { return this.played; }
}