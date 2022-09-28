class MuCirculo{

  constructor(N, rad, freq, desfase, note){

    //Variables

    //MuCirculo 1
    this.posA = [];
    this.phA = [];

    //MuCirculo 2
    this.posB = [];
    this.phB = [];

    this.note = note;
    this.N = N;
    this.doPlay = false;
    this.desfase = desfase;

    //MuCirculo
    for(let i = 0; i < this.N; i++){
      this.posA[i] = createVector(0,0);
    }
    this.t = millis()/1000;
    this.ct = createVector(width/4, height/2);
    this.rad = rad;
    this.freq = freq;
    this.osc = new p5.Oscillator("sine");
    this.osc.freq(note);
    this.env = new p5.Envelope(0.02, 0.5, 0.7, 0.0);
    this.env.setInput(this.osc);

    //MuCirculo 2
    for(let j = 0; j < this.N; j++){
      this.posB[j] = createVector(0,0);
    }
    this.t2 = millis()/1000;
    this.ct2 = createVector(width/1.35, height/2);
    this.rad2 = rad;
    this.freq2 = freq;
    this.osc = new p5.Oscillator("sine");
    this.osc.freq(note);
    this.env = new p5.Envelope(0.02, 0.5, 0.7, 0.0);
    this.env.setInput(this.osc);

}

update(){

  this.t = millis()/1000;

  //MuCirculo
  for(let i = 0; i < this.N; i++){

    let php = this.phA[i];

    this.phA[i] = (TWO_PI*this.freq*this.t + i *TWO_PI/this.N + this.desfase) % TWO_PI;

    this.posA[i].x = this.ct.x + this.rad*cos(this.phA[i]);
    this.posA[i].y = this.ct.y + this.rad*sin(this.phA[i]);

    fill('#F8AADD');
    stroke('#9FDDED');
    circle(this.posA[i].x, this.posA[i].y, 10);
    line(this.ct.x, this.ct.y, this.posA[i].x, this.posA[i].y);

    if(i > 0){
      line(this.posA[i].x, this.posA[i].y,
      this.posA[i-1].x, this.posA[i-1].y);
    }

    if(php > this.phA[i]){
      if(this.doPlay){
        circle(this.posA[i].x, this.posA[i].y, 70); //circulo cuando toca
        //background(random(0,255));
        //this.osc.freq(130*pow(2,i/this.N));
        this.osc.start();
        this.env.play(this.osc);
      }
    }
  }
  line(this.posA[0].x, this.posA[0].y,
  this.posA[this.N-1].x, this.posA[this.N-1].y);

  //MuCirculo 2
  for(let j = 0; j < this.N; j++){
    let php = this.phB[j];

    this.phB[j] = (TWO_PI*this.freq*this.t + j *TWO_PI/this.N + this.desfase) % TWO_PI;

    this.posB[j].x = this.ct2.x + this.rad*cos(this.phB[j]);
    this.posB[j].y = this.ct2.y + this.rad*sin(this.phB[j]);

    fill('#9FDDED');
    stroke('#F8AADD');
    circle(this.posB[j].x, this.posB[j].y, 10);
    line(this.ct2.x, this.ct2.y, this.posB[j].x, this.posB[j].y);

    if(j > 0){
      line(this.posB[j].x, this.posB[j].y,
      this.posB[j-1].x, this.posB[j-1].y);
    }

    if(php > this.phB[j]){
      if(this.doPlay){
        circle(this.posB[j].x, this.posB[j].y, 70); //circulo cuando toca
        //background(random(0,255));
        //this.osc.freq(130*pow(2,j/this.N));
        this.osc.start();
        this.env.play(this.osc);
      }
    }
  }
  line(this.posB[0].x, this.posB[0].y,
  this.posB[this.N-1].x, this.posB[this.N-1].y);

}

clicked(){

  this.doPlay = !this.doPlay;
  if(this.doPlay){
    this.osc.amp(this.env);
    //this.osc.freq(130);
    this.osc.start();
    //this.env.setInput(this.osc);

  } else {
    this.osc.stop();

  }
}

}
