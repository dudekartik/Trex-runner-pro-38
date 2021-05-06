var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver;

function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
 
}

function setup() {
  createCanvas(1200, 500);
  
  trex = createSprite(50,180,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  trex.velocityX = 4
  
  ground = createSprite(600,180,3000,20);
  ground.shapeColor="green";

  gameOver = createSprite(300,50);
  gameOver.addImage(gameOverImg); 
  gameOver.scale = 0.7;
  gameOver.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(255);
  text("Score: "+ score, camera.x+500,30);
  gameOver.x = camera.x
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    camera.x = trex.x;
    camera.y = height/2;
  
    if(keyDown("space")) {
      trex.velocityY = -13;
    }
  
    trex.velocityY = trex.velocityY + 0.6;

    if(trex.x-ground.x>500){
    ground.x=trex.x+500;
    }
    trex.collide(ground);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    
    //set velcity of each game object to 0
    trex.velocityX = 0;
    trex.velocityY = 0;
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var cloud = createSprite(camera.x+1000,120,40,10);
    cloud.y = Math.round(random(40,100));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    
     //assign lifetime to the variable
    cloud.lifetime = 2000;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(camera.x+800,165,10,40);
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 2000;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}