const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var bgImg, bgIMG, bgIMG2, diverAnimation, sharkImg, titleIMG, bg;
var diver1, beginningGreeting, sparklesGIF, treasure1;
var gameState = 0;
var wall1, wall2, wall3;
var playerLives=5;


function preload() {
  bgIMG2 = loadImage("images/riverIMG.png");
  sharkImg = loadImage("images/sharkImg.png");
  titleImg = loadImage("images/titleIMG.png");
  sparklesGIF = createImg("images/infinitesparkles.gif");
  sparklesGIF2 = createImg("images/infinitesparkles.gif");
}


function setup() {
  engine = Engine.create();
  world = engine.world;
  createCanvas(800,400);

 diver1 = new Diver(190, 200, 250, 150);

 beginningGreeting = new Instructions();

 treasure1 = new Treasure(6010,335,3,5);

 wall1 = new Wall(640, 285, 10, 100);
 wall2 = new Wall(1195, 160, 200, 10);
 wall3 = new Wall(1290, 106, 10, 100);

}


function draw() {
  if (gameState===1) {
    background("white");
    bg = image(bgIMG2, -325, -1, 7000, 400);  

    wall1.display();
    wall2.display();
    wall3.display();
    treasure1.display();
    
    textSize(24);
    text("lives left: "+playerLives, 501,35)
    text("lives left: "+playerLives, 500,35);

    if (playerLives === 0) {
      gameState=2;
    }
    if (diver1.body.position.x>5950 && diver1.body.position.y>170) {
      gameState=3;
    }

  } else if (gameState===0){
    background("lightblue");
  } else if (gameState===2) {
    background("red");
    strokeWeight(2);
    stroke("white");
    fill(rgb(230, 79, 65));
    textSize(24);
    text(":/ you lost! reload to play again! :/", 200, 200);
  } else if (gameState===3) {
    camera.position.x=400;
    background("green");
    strokeWeight(1.5);
    stroke("white");
    textSize(24);
    fill(rgb(69, 229, 66));
    text(":) good job! you won with "+playerLives+" lives left! :)", 185, 190);
    text(":) reload to play again! :)", 220, 227);
  }

  if (gameState===0) {
    image(titleImg, 50, 13, 700, 100);
    sparklesGIF.position(425,255);
    sparklesGIF.size(40,40);
    sparklesGIF2.position(485,230);
    sparklesGIF2.size(40,40);
  } else if (gameState===3) {
    sparklesGIF.position(0,0);
    sparklesGIF.size(200,200);
    sparklesGIF2.position(600,200);
    sparklesGIF2.size(350,350);
  } else {
    sparklesGIF.size(0,0);
    sparklesGIF2.size(0,0);
  }

  if (keyDown("RIGHT") && diver1.body.position.x <= 6010 && gameState===1 || keyDown("d") && gameState===1 && diver1.body.position.x <= 6010) {
    camera.position.x = camera.position.x+50;
  }
  if (keyDown("LEFT") && diver1.body.position.x >= 140 && gameState===1 || keyDown("a") && diver1.body.position.x >= 140 && gameState===1) {
    camera.position.x = camera.position.x-10;
  }

  beginningGreeting.display();
  diver1.display();

  detectCollision1(diver1,wall1);
  detectCollision1(diver1,wall3);
  detectCollision2(diver1,wall2);

  // console.log("x: "+diver1.body.position.x+",  y: "+diver1.body.position.y); 

  drawSprites();
}

function detectCollision1(bodyA, bodyB) {
	var xdistance=bodyA.body.position.x-bodyB.body.position.x;
  var ydistance=bodyA.body.position.y-bodyB.body.position.y;
	if (xdistance <= 150 && xdistance>=-145 && ydistance <= 90 && ydistance>=-85) {
		Matter.Body.setPosition(diver1.body, {x:150,y:200});
    camera.position.x=400;
    playerLives = playerLives-1;
	} 
}

function detectCollision2(bodyA, bodyB) {
	var xdistance=bodyA.body.position.x-bodyB.body.position.x;
  var ydistance=bodyA.body.position.y-bodyB.body.position.y;
	if (xdistance <=225 && xdistance>=-230 && ydistance <= 50 && ydistance>=-45) {
		Matter.Body.setPosition(diver1.body, {x:150,y:200});
    camera.position.x=400;
    playerLives = playerLives-1;
	} 
}
