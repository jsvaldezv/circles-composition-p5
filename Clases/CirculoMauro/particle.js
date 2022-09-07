class Particle
{
	constructor()
	{
		this.pos = createVector (width/2, 0);
		this.vel = createVector (0, 0);
		this.acc = createVector (0, 0.98);
		this.damp = 0.99;
	}

	update()
	{
		this.vel.add (this.acc);
		this.vel.mult (this.damp);
		this.pos.add (this.vel);
		this.bounce();
	}

	draw()
	{
		fill (255);
		stroke (0);
		circle (this.pos.x, this.pos.y, 20);
	}

	bounce()
	{
		if (this.pos.y > height)
		{
			this.pos.y = height;
			this.vel.y *= -1;
		}
	
		if (this.pos.y < 0)
		{
			this.pos.y = 0;
			this.vel.y *= -1;
		}
	
		if (this.pos.x > width)
		{
			this.pos.x = width;
			this.vel.x *= -1;
		}
	
		if (this.pos.x < 0)
		{
			this.pos.x = 0;
			this.vel.x *= -1;
		}
	}

	clickedMouse()
	{
		this.vel.set(random(-10, 10), random(-10, 10));
		this.pos.set (mouseX, mouseY);
	}
}