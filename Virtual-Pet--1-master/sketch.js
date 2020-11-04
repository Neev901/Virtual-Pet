//Create variables here
var dog_sprite, dog, happyDog, DB, foodS;

const database = firebase.database();
const foodStock = database.ref('Food/');

function preload()
{
  //load images here
  dog = loadImage("./Dog.png")
  happyDog = loadImage("./happydog.png")
}

function setup() {
	createCanvas(500, 500);
  dog_sprite = createSprite(250,250,50,50);
  dog_sprite.addImage("normal_dog", dog);
  dog_sprite.addImage("Happy_dog", happyDog);
  dog_sprite.visible = true;
  dog_sprite.scale = 0.3;
  foodStock.on('value', readStock);
  foodS = 5;
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    foodS = foodS - 1;
    writeStock(foodS);
    dog_sprite.changeImage("Happy_dog", happyDog);
  }

  drawSprites();
  //add styles here
  fill("white"); 
  textSize(20);
  text("Click Up Arrow to feed Bailey milk", 10, 50);
  text("Milk Bottles Left: " + foodS, 300, 450);
  fill("Red");
  textSize(40);
  stroke(100); 
  text("Bailey", 195, 395)
}

function writeStock(value){
   foodStock.update({
     Item_value : value
   })
}


function readStock(data){
  dog_sprite = data.val();
}