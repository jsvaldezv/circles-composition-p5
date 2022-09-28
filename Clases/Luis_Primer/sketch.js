//Variables

var muCir;
var muCir2;
var muCir3;
var muCir4;
var muCir5;
var muCir6;

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  background(0);

  muCir = new MuCirculo(3, 90, 0.1, 0, 123); //Se llama al constructor
  muCir2 = new MuCirculo(7, 70, 0.2, 4*TWO_PI/18, 185);
  muCir3 = new MuCirculo(2, 240, 0.1, 8*TWO_PI/18, 110);
  muCir4 = new MuCirculo(4, 80, 0.2, 8*TWO_PI/18, 146);
  muCir5 = new MuCirculo(2, 270, 0.1, 8*TWO_PI/18, 246);
  muCir6 = new MuCirculo(7, 685, 0.07, 8*TWO_PI/18, 293);

}

function draw() {
  // put drawing code here
  background(0, 40);

  muCir.update();
  muCir2.update();
  muCir3.update();
  muCir4.update();
  muCir5.update();
  muCir6.update();

}

function mouseClicked(){

  muCir.clicked();
  muCir2.clicked();
  muCir3.clicked();
  muCir4.clicked();
  muCir5.clicked();
  muCir6.clicked();
}
