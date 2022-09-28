class MuCirculo{

  constructor(N, rad, freq, desfase, ctx, cty, note, r, g, b){
    this.posA = [];
    this.phA = [];
    this.note = note;
    this.N = N;
    this.doPlay=false;
    this.desfase=desfase;

    for(let i = 0; i < this.N; i++){
      this.posA[i] = createVector(0,0);
    }

    this.t = millis()/1000;
    this.ct = createVector(ctx, cty);
    this.rad = rad;
    this.freq = freq;
    this.r= r;
    this.g= g;
    this.b= b;
    this.osc = new p5.Oscillator("sine");
    this.osc.freq(note);
    this.env = new p5.Envelope(0.02, 0.5, 0.6, 0.5);
    this.env.setInput(this.osc);

  }


  update(){
  this.t = millis()/1000;

  for(let i = 0; i < this.N; i++){

    let php = this.phA[i];

    this.phA[i] = (TWO_PI*this.freq*this.t + i*TWO_PI/this.N+this.desfase) % TWO_PI;

    this.posA[i].x = this.ct.x + this.rad*cos(this.phA[i]);
    this.posA[i].y = this.ct.y + this.rad*sin(this.phA[i]);

    fill(this.r, this.g, this.b);
    stroke(this.r, this.g, this.b);

    circle(this.posA[i].x, this.posA[i].y, 10);
    line(this.ct.x, this.ct.y, this.posA[i].x, this.posA[i].y);




    if(i > 0){
      line(this.posA[i].x, this.posA[i].y,
      this.posA[i-1].x, this.posA[i-1].y);

    }

    if(php > this.phA[i]){
      if(this.doPlay){
        circle(this.posA[i].x, this.posA[i].y, 50);
        // this.osc.freq(this.note*pow(2,i/this.N));
        this.osc.start();
        this.env.play(this.osc);

      }
    }
  }
  line(this.posA[0].x, this.posA[0].y,
  this.posA[this.N-1].x, this.posA[this.N-1].y);
}

  clicked(){
    this.doPlay = !this.doPlay;
    if(this.doPlay){
      this.osc.amp(this.env);
      // this.osc.freq(220);
      this.osc.start();

      // this.env.setInput(this.osc);

    } else {
      this.osc.stop();

    }
  }
}
