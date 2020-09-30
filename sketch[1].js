var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running,monkey_collided;


var bananaGroup, bananaImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6,obstacle1, obstacle2, obstacle3, obstacle4;

var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
 monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  
  
  
  
  bananaImage = loadImage("banana.png");
  
  obstacle1 = loadImage("stone.png");
  
  
}

function setup() {
  createCanvas(400, 400);
  
  monkey= createSprite(50,180,20,50);
  
  monkey.addAnimation("running", monkey_running);
  
  monkey.scale = 0.2;
  
  ground = createSprite(20,380,400,20);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && monkey.y >= 150) {
      monkey.velocityY = -12;
    
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  

    
    
      ground.x = ground.width/2;
    
  
    
    spawnBanana();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
      
    }
  }
  else if (gameState === END) {
   
    
 
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    if(keyDown("space")&& (monkey.collide(obstacle1))){
      reset();
    }
  }
 monkey.setCollider("rectangle", 0,225,75, 75);
  if(monkey.collide(ground)){
  
    monkey.velocityX=0
  }
  
 if(monkey.isTouching(bananaGroup)){
  bananaGroup.destroyEach()
 }
  
  
  
  
  
  
  
  
  
  
  drawSprites();
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(380,230,10,40);
    
    banana.addImage(bananaImage);
    banana.scale = 0.1;
   banana.velocityX = -(6 + 3*score/100);
    
    
    banana.lifetime = 200;
    
  
    
  
    bananaGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(380,360,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    obstacle.addImage(obstacle1)
       obstacle.scale = 0.18;
    obstacle.lifetime = 300;
  
    obstaclesGroup.add(obstacle);      
    }
}

function reset(){
gameState = PLAY
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
}