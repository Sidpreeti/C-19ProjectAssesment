var backgroundImage,backgroundScene;
var monkey, monkeyRunning;
var ground,foodGroup,stoneGroup;
var bananaImage , obstacleImage;
var score;
function preload(){
  backgroundImage=loadImage("jungle2.jpg");
  monkeyRunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
bananaImage = loadImage("Banana.png");
obstacleImage = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  //Background
  backgroundScene=createSprite(0,0,800,400);
  backgroundScene.addImage("background",backgroundImage);
  backgroundScene.scale=1.75;
  backgroundScene.x=backgroundScene.width/2;
  backgroundScene.velocityX=-4;
  //monkey
  monkey=createSprite(100,350,20,50);
  monkey.addAnimation("monkeyRunning",monkeyRunning);
  monkey.scale = 0.1;
  //ground
  ground = createSprite(400,350,800,10);
  ground.x = ground.width/2;
  ground.velocityX = -5;
  ground.visible = false;
  //create group
  foodGroup = createGroup();
  stoneGroup = createGroup();
  score = 0;
}

function draw() {
    background(0);
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
    if(backgroundScene.x < 0){
       backgroundScene.x = backgroundScene.width/2;
    }  
    if(keyDown("space") && monkey.y>314){
       monkey.velocityY = -15;
    }
    monkey.velocityY = monkey.velocityY +0.8;
    //console.log(monkey.y);
  
    monkey.collide(ground);
    if (foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score = score +2;
      
    }
    switch(score){
        case 10: monkey.scale=0.12;        
                 break;
        case 20: monkey.scale=0.14;
                 break;
        case 30: monkey.scale=0.16;
                 break;
        case 40: monkey.scale=0.18;
                 break;
        default: break;
    }
  
    spawnBanana();
    spawnStone();
  
  
    drawSprites();
    stroke("white");
    textSize(20);
    fill("white");
    text("Score: "+ score, 500,50);
  
}
function spawnBanana() {
 if (frameCount % 120 === 0) {
    var banana = createSprite(800,250,20,20); 
    banana.y = random(160,200);
    banana.addImage("bananaImage",bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -8;
    banana.lifetime = 100;
    
  foodGroup.add(banana);
 }
}
function spawnStone() {
 if (frameCount % 80 === 0) {
    var stone = createSprite(800,360,20,20); 
    stone.y = Math.round(random(300,325));
    stone.addImage("stoneImage",obstacleImage);
    stone.scale = 0.25;
    stone.velocityX = -8;
    stone.lifetime = 100;
    
  stoneGroup.add(stone);
 }
}
