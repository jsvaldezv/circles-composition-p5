class Circle
{
	constructor (n, rad, ctx, freq)
	{
		this.n = n;
		this.pos = [];
		this.ph = [];
		this.php = [];
		this.color = [];

		for (let i = 0; i < n; i++)
		{
			this.pos[i] = createVector (0, 0);
			this.color.push([0, 0, 0]);
		}

		this.t = millis()/1000;
		this.ctx = ctx;
		this.ct = createVector (ctx, height/2);
		this.rad = rad;
		this.freq = freq;
		this.quarter = TWO_PI/4;

		// Sound //
		this.doPlay;

		this.attackTime = 0.01;
		this.decayTime = 0.2;
		this.susPercent = 0.1;
		this.releaseTime = 1;

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

	// Getters
	randomColor() { return random (0, 255); }

	// Setters


	// General
	checkPhase (index)
	{
		// // First quarter - orange
		if (this.php[index] > (this.quarter * 3))
			this.color[index] = [234, 110, 0];
	
		// // Second quarter - green
		if (this.php[index] >= this.quarter && this.php[index] < this.quarter * 2)
			this.color[index] = [53, 234, 0];
	
		// // Third quarter - blue
		if (this.php[index] >= (this.quarter * 2) && this.php[index] < (this.quarter * 3))
			this.color[index] = [0, 53, 234];

		// Fourth quarter - white
		if (this.php[index] >= this.ph[index])
		{
			this.color[index] = [255, 255, 255];
			this.playSound();
		}
	}

	// Graphics
	paint()
	{
		this.t = millis()/1000;

		for (let i = 0 ; i < this.n; i++)
		{
			this.php[i] = this.ph[i];
			this.ph[i] = (TWO_PI * this.freq * this.t) + ((TWO_PI/this.n) * i);
	  
			this.pos[i].x = this.ct.x + this.rad * cos (this.ph[i]);
			this.pos[i].y = this.ct.y + this.rad * sin (this.ph[i]);
	  
			stroke (255, 255, 255);
			fill (this.color[i][0], this.color[i][1], this.color[i][2]);
			line (this.ct.x, this.ct.y, this.pos[i].x, this.pos[i].y);
			//ellipse (this.pos[i].x, this.pos[i].y, 15);
			circle (this.pos[i].x, this.pos[i].y, 15);
			//stroke (200);

			this.ph[i] = this.ph[i] % TWO_PI;
			this.checkPhase(i);
			stroke (255);

			if (i > 0)
			{
				line (this.pos[i].x, this.pos[i].y, this.pos[i-1].x, this.pos[i-1].y);
				line (this.pos[0].x, this.pos[0].y, this.pos[this.n-1].x, this.pos[this.n-1].y);
			}
		}
	}

	// Sound
	prepareSound()
	{
		this.osc.start();
	}

	playSound()
	{
		if (doPlay)
		{
			this.prepareSound();
			this.env.play (this.osc);
		}
	}

	stopSound()
	{
		this.osc.stop();
		this.oscTwo.stop();
	}
}