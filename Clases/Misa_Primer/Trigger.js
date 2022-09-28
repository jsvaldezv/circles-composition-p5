class Trigger {

  constructor(n,rad,ctx,cty,freq,sound){
    this.doPlay;
    this.sound = sound;
    this.sample;
    this.posA = [];
    this.phA = [];
    this.phA_p = [];
    this.t1 = 0.1; // attack time in seconds
    this.l1 = 0.5; // attack level 0.0 to 1.0
    this.t2 = 0.8; // decay time in seconds
    this.l2 = 0.4; // decay level  0.0 to 1.0
    this.n = n;
    this.r = 3;
    this.g = 123;
    this.b = 12;
    this.delay = new p5.Delay();

    this.attackTime = 0.01;
    this.decayTime = 0.2;
    this.susPercent = 0.1;
    this.releaseTime = 1;

    for (let i = 0; i < n; i++){
      this.posA[i] = createVector(0,0);
    }

    this.t = millis()/1000;
    this.ctx = ctx;
    this.ct = createVector(ctx,cty);
    this.rad = rad;
    this.freq = freq;

    if (this.sound == 0) {
      this.sample = loadSound('media/kik.mp3');
    } else if (this.sound == 1){
      this.sample = loadSound('media/snr.mp3');
    } else if (this.sound == 2){
      this.sample = loadSound('media/ah.mp3');
    } else if (this.sound == 3){
      this.sample = loadSound('media/zap.mp3');
    }

    this.env = new p5.Envelope(this.t1, this.l1, this.t2, this.l2);
    this.env2 = new p5.Envelope();
    this.comp = new p5.Compressor();
  }
  //------------------------------------------------

  update(){
    this.t = millis()/1000;
    // background(0);
    for (let i = 0 ; i < this.n; i++){

      this.phA_p[i] = this.phA[i];
      this.phA[i] = (TWO_PI*this.freq*this.t+((TWO_PI/this.n)*i));

      this.posA[i].x = this.ct.x + this.rad*cos(this.phA[i]);
      this.posA[i].y = this.ct.y + this.rad*sin(this.phA[i]);

      stroke(255);
      fill(this.r,this.g,this.b);
      ellipse(this.posA[i].x,this.posA[i].y,15);
      line(this.ct.x,this.ct.y,this.posA[i].x,this.posA[i].y);
      stroke(200);
      line(0,height/2,width,height/2);

      this.phA[i] = this.phA[i]%TWO_PI;

      if(i > 0){
        stroke(200);
        line(this.posA[i].x,this.posA[i].y,this.posA[i-1].x,this.posA[i-1].y);
      }

      if (this.phA_p[i] > this.phA[i] ){
        this.r = random(0,255);
        this.g = random(0,255);
        this.b = random(0,255);

        this.sample.play();


        this.delay.process(this.sample, 0.12, .3, 2300);
        this.comp.process(this.sample, .03, 30, 12  , -24, .9);

      } else {
        this.sample.stop(0.5);
      }

    }

    stroke(255);
    line(this.posA[0].x,this.posA[0].y,this.posA[this.n-1].x,this.posA[this.n-1].y);

  }

  clicked(){
    this.doPlay =! this.doPlay;
    if (this.doPlay){
      userStartAudio();
    } else{
      stop();
    }
  }
  }
