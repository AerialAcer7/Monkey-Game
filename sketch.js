var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var score;
var ground;
const PLAY = 1;
const END = 0;
var gameState = PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
 createCanvas(600,600); 
  
 monkey = createSprite(50,500,10,10);
 monkey.addAnimation("monkey",monkey_running);
 monkey.scale = 0.12; 
 
 ground = createSprite(300,590,600,5); 
 score = 0;
 
 //creating groups
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
}

function draw() {
 background("white");
 
 if(gameState == PLAY){
  //infinite tower
   ground.velocityX = -5;
   if(ground.x<600){
    ground.x = ground.width/2; 
   }
   
   //monkey jumping
    if(keyDown("space") && monkey.y>450){
     monkey.velocityY = -6; 
    }
  
  //gravity
   monkey.velocityY = monkey.velocityY+0.5;
   
   //monkey collide
    monkey.collide(ground);
   
   //calling banana and obstacle
    spawnBanana();
    spawnObstacles();
   
   console.log(getFrameRate);
   
   //score
    if(frameCount%10 === 0){
      score = score+1;
    }
    text("Survival Time:"+score,500,200);
 }
  
 //end
  if(monkey.isTouching(obstaclesGroup)){
   gameState = END; 
  }
  
  if(gameState == END){
   ground.velocityX = 0; 
   monkey.changeImage("sprite_0.png");
   obstaclesGroup.lifetime = -1;
   FoodGroup.lifetime = -1; 
  }
 drawSprites(); 
}

function spawnBanana(){
 if(World.frameCount%80 === 0){
  banana = createSprite(600,120,10,10);
  banana.addImage("banana",bananaImage);
  banana.velocityX = -4;
  banana.lifetime = 150;
  banana.scale = 0.1; 
  
  banana.y = Math.round(random(450,500));
   
  //group code
   FoodGroup.add(banana);
 } 
}

function spawnObstacles(){
 if(World.frameCount%300 === 0){
  obstacle = createSprite(600,555,10,10);
  obstacle.addImage("obstacle",obstacleImage);
  obstacle.velocityX = -5;
  obstacle.lifetime = 120;  
  obstacle.scale = 0.2; 
  
  //group code
   obstaclesGroup.add(obstacle); 
 } 
}


