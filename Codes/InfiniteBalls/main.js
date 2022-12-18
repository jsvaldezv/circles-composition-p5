let damp;
let pos, vel, acc;
let prt = [];
let N = 25;

function setup()
{
	createCanvas (windowWidth, windowHeight);
	background (145);

	pos = createVector(0, 0);
	vel = createVector(0, 0);
	acc = createVector(0, 0.98);

	damp = 0.99;

	for (let i = 0; i < N; i++)
	{
		let temp = createVector (i*width/N, 100);
		prt.push (new Particle(temp));
	}
}

function draw()
{
	background (0, 185, 157);

	for (let i = 0; i < N; i++)
	{
		prt[i].update();
		prt[i].draw();

		if (prt[i].vel.mag() < 0.5)
		{
			prt[i].pos.set (mouseX, mouseY);
			prt[i].vel.set (mouseX - pmouseX, mouseY - pmouseY);
		}
	}
}

function mouseClicked()
{

}