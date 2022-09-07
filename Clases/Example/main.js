var pos;
var ph, freq, t, rad, ct;
var px, py;
var r, g, b, incR, incG, incB;
var carr, modu;
var doPlay;


function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  background(128);
  pos = createVector(0, 0);
  t = millis()/1000;
  ct = createVector(width/2, height/2);
  rad = 150;
  freq=0.75;
  px = 0;
  r = 45;
  g = 80;
  b = 200;
  incR = 2;
  incG = 1;
  incB = 0.5;
  doPlay =false;
  carr = new p5.Oscillator('sine');
  modu = new p5.Oscillator('sine');

}

function draw() {
  // put drawing code here
  background(156,5);

  t = millis()/1000;
  ph = TWO_PI*freq*t;
  py = height/2+150*cos(TWO_PI*5*px/width);
  ct.set(px, py);
  pos.x = ct.x + rad*cos(ph);
  pos.y = ct.y + rad*sin(ph);
  //fill(255);
  //circle(pos.x, pos.y, 25);
  stroke(r,g,b);
  line(ct.x, ct.y, pos.x, pos.y);
  px++;
  px = px%width;

  if(doPlay){
    let fm = map(py, height/2-150, height/2+150, 55, 110);
    modu.freq(fm);
    //carr.freq(mouseY);
  }

  r += incR;
  g += incG;
  b += incB;

  if(r > 255 || r < 0){
    incR *= -1;
  }
  if(g > 255 || g < 0){
    incG *= -1;
  }
  if(b > 255 || b < 0){
    incB *= -1;
  }

}

function mouseClicked(){
  doPlay = !doPlay;
  if(doPlay){
    modu.freq(110);
    modu.amp(50); // esto es DeltaF

    carr.amp(0.5);
    modu.disconnect();
    carr.freq(modu);
    modu.start()
    carr.start();

  } else {
    modu.stop();
    carr.stop();
  }

}
