var trex, trexRunAnimation, trexCollided;
var cload, cloudImage
var ground, groundImage
var invisibleGround
var obstacleImage1, obstacleImage2, obstacleImage3, obstacleImage4, obstacleImage5, obstacleImage6
var obstacleGroup, cloudGroup
var PLAY, END, gameState
var gameOverimage, restartImage
var gameOver, restart
var Score
//pre load, is responsible for loading of images and sounds
function preload() {
  cloudImage = loadImage("cloud.png");
  trexCollided = loadAnimation("trex_collided.png");
  trexRunAnimation = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  groundImage = loadImage("ground2.png")
  obstacleImage1 = loadImage("obstacle1.png")
  obstacleImage2 = loadImage("obstacle2.png")
  obstacleImage3 = loadImage("obstacle3.png")
  obstacleImage4 = loadImage("obstacle4.png")
  obstacleImage5 = loadImage("obstacle5.png")
  obstacleImage6 = loadImage("obstacle6.png")
  gameOverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")
  
}
//setup is used for doing initial things and is executed just one in the beginning of the game
function setup() {
  createCanvas(600, 200);
  trex = createSprite(50, 150, 30, 20);
  trex.addAnimation("running", trexRunAnimation)
  trex.addAnimation("collided", trexCollided)
  ground = createSprite(300, 180, 600, 50)
  ground.addImage(groundImage)
  ground.x = ground.width / 2;
  ground.velocityX = -5
  trex.scale = 0.5
  invisibleGround = createSprite(300, 190, 600, 5)
  invisibleGround.visible = false
  cloudGroup = new Group()
  obstacleGroup = new Group()
  PLAY = 1
  END = 0
  gameState = PLAY
  gameOver = createSprite(300,100,20,20)
  gameOver.addImage(gameOverImage)
  gameOver.scale=0.5
  gameOver.visible=false
  restart=createSprite(300,150,20,20)
  restart.addImage(restartImage) 
  restart.scale=0.5
  restart.visible=false
  score=0
}
//draw is executed for every frame
function draw() {
  background(110);
  trex.collide(invisibleGround);
  if (gameState === PLAY) {
    if (keyDown("space") && trex.y > 164) {
      trex.velocityY = -10
    }
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    spawnClouds()
    spawnObstacles()
    trex.velocityY = trex.velocityY + 0.5
    if(frameCount%3===0){
      score=score+1
    }
    if (trex.isTouching(obstacleGroup)) {
      gameState = END
    }
  } else if (gameState === END) {
    ground.velocityX = 0
    trex.velocityY = 0
    trex.changeAnimation("collided", trexCollided)
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    gameOver.visible=true
    restart.visible=true
    
    if (mousePressedOver(restart)){
      restartGame()
    }
  }

  //console.log(trex.y)
  fill("white")
text("Score :" + score,500,50)


  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 80, 40, 10)
    cloudGroup.add(cloud)
    cloud.addImage(cloudImage)
    cloud.velocityX = -5
    cloud.scale = 0.5
    cloud.y = Math.round(random(80, 120))
    cloud.lifetime = 140
  }
}

function spawnObstacles() {
  if (frameCount % 65 === 0) {
    var obstacle = createSprite(600, 170, 10, 50)
    obstacleGroup.add(obstacle)
    obstacle.velocityX = -5
    obstacle.lifetime = 140
    obstacle.shapeColor = "white"
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacleImage1);
        break
      case 2:
        obstacle.addImage(obstacleImage2);
        break
      case 3:
        obstacle.addImage(obstacleImage3);
        break
      case 4:
        obstacle.addImage(obstacleImage4);
        break
      case 5:
        obstacle.addImage(obstacleImage5);
        break
      case 6:
        obstacle.addImage(obstacleImage6);
        break
      default:
        break
    }
    obstacle.scale = 0.5
  }
}
function restartGame(){
gameState=PLAY
gameOver.visible=false
restart.visible=false
cloudGroup.destroyEach()
obstacleGroup.destroyEach()
trex.changeAnimation("running",trexRunAnimation)
score=0
}