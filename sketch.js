var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var sound1

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  sound1 = loadSound("spooky.wav");
  
  
}

function setup() {
  createCanvas(600, 600);
  sound1.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(280,100,20,20);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;

    
}

function draw() {
  background(200);
  
  if(tower.y > 400){
      tower.y = 300
    }
  
  if(keyDown("left_Arrow")){
    ghost.x = ghost.x - 3;
  }
  if(keyDown("right_Arrow")){
    ghost.x = ghost.x + 3;
  }
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY + 0.8;

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    text("Game Over",300,300);
  }
    spawnDoors()
    drawSprites()

}
function spawnDoors(){
  if(frameCount % 250 === 0){
    door = createSprite(50,0,35,35);
    door.addImage("door", doorImg);
    door.velocityY = 1;
    door.x = Math.round(random(100,420));  
    door.lifetime = 800;
    doorsGroup.add(door);
  
    climber = createSprite(50,60,35,35);
    climber.addImage("climber", climberImg);
    climber.velocityY = 1;
    climber.x = door.x;
    climber.lifetime = 800;
    climbersGroup.add(climber);

    invisibleBlock = createSprite(50,65);
    invisibleBlock.x = climber.x
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2;
    invisibleBlock.velocityY = 1;
    invisibleBlockGroup.add(invisibleBlock);

    ghost.depth = door.depth + 1;
    
  }
 
  

  }
