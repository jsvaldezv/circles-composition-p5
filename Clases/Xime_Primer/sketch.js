var muCir, muCir2, muCir3, muCir4, muCir5, muCir6, muCir7, muCir8, muCir9, muCir10, muCir11,muCir12,muCir13;



function setup() {
  createCanvas(windowWidth, windowHeight);

  muCir = new MuCirculo(1, 150, 0.1,0, width/7, height/2, 262, 142, 68, 173);

  muCir2 = new MuCirculo(2, 50, 0.1,0, width*.85,height/2, 330,   234, 242, 248 );
  muCir3 = new MuCirculo(3, 85, 0.1,0, width*.85, height/2, 392,   93, 173, 226 );
  muCir4 = new MuCirculo(4, 120, 0.1,TWO_PI/8, width*.85,height/2, 262,   41, 128, 185 );
  muCir8 = new MuCirculo(8, 150, 0.1,TWO_PI/8, width*.85, height/2, 392,   36, 113, 163  );

  muCir5 = new MuCirculo(4, 250, 0.1,TWO_PI/4, width/2,height/2, 330, 205, 97, 85 );
  muCir6 = new MuCirculo(4, 220, 0.1,TWO_PI/8, width/2,height/2, 392,  192, 57, 43 );
  muCir7 = new MuCirculo(8, 270, 0.1,TWO_PI/16, width/2,height/2, 262,  192, 57, 43 );


}

function draw() {
  // put drawing code here
  background(0, 15);

  muCir.update();
  muCir2.update();
  muCir3.update();
  muCir4.update();
  muCir5.update();
  muCir6.update();
  muCir7.update();
  muCir8.update();

}

function mouseClicked(){
  muCir.clicked();
  muCir2.clicked();
  muCir3.clicked();
  muCir4.clicked();
  muCir5.clicked();
  muCir6.clicked();
  muCir7.clicked();
  muCir8.clicked();

}
