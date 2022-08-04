var Bee;
var BeeImg;
var CookieImg, VenenoImg, VenenoGroup, CookieGroup;
var score = 0;
var gameState = "serve"
var Button1,Button1Img, Button1SpanishImg
var lenguage = "english"
var lenguageBG;
var SpanishButton;
var EnglishButton;
var SpanishImg;
var EnglishImg;
var PlayEsIMG, PlayEnIMG, Play;
function preload(){
  BeeImg = loadImage("Bee.png")
  CookieImg = loadImage("Cookie.png")
  VenenoImg = loadImage("Veneno.png")
  Button1Img = loadImage("RestartButton.png")
  Button1SpanishImg = loadImage("RestartSpanishButton.png")
  EnglishImg = loadImage("English.png")
  SpanishImg = loadImage("Español.png")
  PlayEnIMG = loadImage("PlayEn.png")
  PlayEsIMG = loadImage("PlayEs.png")
} 
function setup() {
  createCanvas(800,400);
  lenguageBG = createSprite(400,200, 210,110)
  Play = createSprite(400,230)
  Play.scale = 0.1
  SpanishButton = createSprite(350, 180, 60,30)
  SpanishButton.shapeColor = "red"
  SpanishButton.addImage(SpanishImg)
  SpanishButton.scale = 0.1
  EnglishButton = createSprite(450, 180, 60,30)
  EnglishButton.shapeColor = "blue"
  EnglishButton.addImage(EnglishImg)
  EnglishButton.scale = 0.1
  Bee = createSprite(600,200);
  Bee.addImage(BeeImg)
  Bee.scale = 0.5
  Bee.debug = true
  Bee.setCollider("rectangle",20,1,200,120)
  CookieGroup = createGroup();
  VenenoGroup = createGroup();
  Button1 = createSprite(400,250)
  Button1.scale = 0.3
  Button1.visible = false
}

function draw() {
  console.log(gameState+" y el lenguaje es "+lenguage)
  background(255);  
  if(gameState=="serve"){
    if(lenguage=="english"){
      Play.addImage(PlayEnIMG)
    }
    else if(lenguage == "español"){
      Play.addImage(PlayEsIMG)
    }
    Bee.visible = false
    if(mousePressedOver(SpanishButton)){
      lenguage = "español"
    }
    else if(mousePressedOver(EnglishButton)){
      lenguage = "english"
    }
    else if(mousePressedOver(Play)){
      gameState = "Play"
    }
  }
  if(gameState === "Play"){
    Bee.visible = true
    if(lenguage == "english"){
      Button1.addImage(Button1Img)
    }
    else if(lenguage == "español"){
      Button1.addImage(Button1SpanishImg)
    }
    EnglishButton.visible = false
    SpanishButton.visible = false
    Play.visible = false
    lenguageBG.visible = false
    if(keyDown(UP_ARROW)){
      Bee.position.y = Bee.position.y - 5
    }
    if(keyDown(DOWN_ARROW)){
      Bee.position.y = Bee.position.y + 5
    }
    if(Bee.collide(CookieGroup)){
      CookieGroup.destroyEach();
      score += 1
      console.log(score)
    }
    if(Bee.collide(VenenoGroup)){
      gameState = "gameOver"
    }
    SpawnCookies();
    SpawnObstacles();
  }
  if(gameState === "gameOver"){
    if(mousePressedOver(Button1)){
      reset();
    }
    Button1.visible = true
  }
  textSize(50)
  text(score+" Puntos",400,50)
  Bee.position.x = 600
  drawSprites();
}

function SpawnCookies(){
  if(frameCount %100 == 0){
   var Cookie = createSprite(1,Math.round(random(1,400)))
   Cookie.addImage(CookieImg)
   Cookie.scale = 0.1
   Cookie.velocityX = 5
   CookieGroup.add(Cookie)
  }
}
  function SpawnObstacles(){
    if(frameCount %110 == 0){
     var Veneno = createSprite(1,Math.round(random(1,400)))
     Veneno.addImage(VenenoImg)
     Veneno.scale = 0.01
     Veneno.velocityX = 5
     VenenoGroup.add(Veneno)
    }
}
function reset(){
  window.location.reload();
}
