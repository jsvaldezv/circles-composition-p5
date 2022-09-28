let a = false;
let s = false;
let d = false;
let f = false;


function setup() {
  // put setup code here

  //2 conjuntos de mínimo 3 círculos por conjunto
  //Visualización chula
  createCanvas(windowWidth,windowHeight);
  let two_thirds = 2 * (width/3);
  //primer conjunto
  muCir = new MuCirculo(12,60,width/4,0.03);
  muCir_1 = new MuCirculo(6,80,width/4,0.07);
  muCir_2 = new MuCirculo(3,90,width/4,0.05);
  //segundo conjunto
  muCir2 = new MuCirculo(8,40,width/2,0.4);
  muCir2_1 = new MuCirculo(4,50,width/2,0.09);
  muCir2_2 = new MuCirculo(2,60,width/2,0.06);

  //tercer conjunto
  muCir3 = new MuCirculo(10,100,width/2+width/4,0.1);
  muCir3_1 = new MuCirculo(5,120,width/2+width/4,0.2);
  muCir3_2 = new MuCirculo(6,130,width/2+width/4,0.09);

  //sample triggers
  kick_trig = new Trigger(12,60,width/4,height/2 + height/4,0.06,0);
  snr_trig = new Trigger(12,60,width/2+width/4,height/2 + height/4,0.03,1);
  ah_trig = new Trigger(3,60,width/4,height/2 - height/4,0.06,2);
  zap_trig = new Trigger(7,60,width/2+width/4,height/2 - height/4,0.06,3);
}

function draw() {
  // put drawing code here
  background(0,40);
  textSize(20);
  fill(0, 102, 153);
  text('press a,s,d or f to interact', width/2, 90);
  textAlign(CENTER);

  if(a){
    muCir.update();
    muCir_1.update();
    muCir_2.update();
  }

  if(s){
    muCir2.update();
    muCir2_1.update();
    muCir2_2.update();
  }

  if(d){
    muCir3.update();
    muCir3_1.update();
    muCir3_2.update();
  }
  if(f){
    kick_trig.update();
    snr_trig.update();
    ah_trig.update();
    zap_trig.update();
  }

}

function mouseClicked(){

  muCir.clicked();

}

function keyTyped(){
  if (key === 'a') {
    a = !a;

  } else if (key === 's') {
    s = !s;

  } else if (key === 'd') {
    d = !d;

  } else if (key === 'f') {
    f = !f;

  }
}
