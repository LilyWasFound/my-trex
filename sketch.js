var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trexImage;
var ground, invisibleGround, groundImage;
var cloud, cloudImage;

var obstaclesGroup, obstaclesImage;

var gameOver, gameOverImage;
var restart,restartImage;

var score;

function preload(){
  trexImage = loadImage("trex.jpg");
  groundImage = loadImage("ground.png");
  cloudImage = loadImage("clouds.png");
  obstaclesImage = loadImage("obstacle.png");
  gameOverImage = loadImage("game over.png");
  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  ground = createSprite(300,180,400,20);
  ground.addImage("ground",groundImage);
  
  trex = createSprite(50,170,20,50);
  trex.addImage(trexImage);
  trex.scale = 0.15;
  
  invisibleGround = createSprite(200,195,400,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(270,100,10,10)
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.3
  gameOver.visible = false;
  
  restart = createSprite(400,100,10,10)
  restart.addImage(restartImage);
  restart.scale = 0.05;
  restart.visible = false;
  
  trex.setCollider("rectangle",0,0,trex.width,trex.height);
  trex.debug = false;
  
  score = 0;
  
  //creating obstacle
  obstaclesGroup = createGroup(); 
}

function draw() {
  
  background(cloudImage);
  
  if(gameState === PLAY){
    
  //displaying score
  text("Score: "+ score, 500,50);
    
    score = score + Math.round(frameCount/60);
    ground.velocityX = -4;
    
    if (ground.x < 200){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y <= 150) {
      trex.velocityY = -10;
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
    }
  }
   else if (gameState === END) {

      ground.velocityX = 0;
      trex.velocityY = 0
     
     gameOver.visible = true;
     restart.visible = true;
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1); 
    obstaclesGroup.setVelocityXEach(0);
   }
 
  //stop trex from falling down
  trex.collide(invisibleGround);

  if(mousePressedOver(restart)) {
     reset(); 
  }
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
  score=0;
}

function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    obstacle = createSprite(600,160,40,10);
    obstacle.addImage(obstaclesImage);
    obstacle.scale = 0.04;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 300;
    
    //adjust the depth
    obstacle.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   obstaclesGroup.add(obstacle);
    }
}
