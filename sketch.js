//Create variables here
var dog, happyDog, database, FoodS, foodStock;
var dogImg, happydogImg;

function preload()
{
  //load images here
   dogImg= loadImage("images/dogImg.png");
   happydogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database()

  createCanvas(500, 500);
  
  dog = createSprite(250,400,20,20);
  dog.scale = 0.2;
  dog.addImage(dogImg);
  foodStock = database.ref('food');
   foodStock.on("value", readStock);
   
  
}


function draw() {  
  background(46, 139, 87);
   
   if(keyWentDown(UP_ARROW)){
    writeStock(FoodS);
    dog.addImage(happydogImg)
    
   }
  drawSprites();
  fill("red");
  text("food remaining = " + FoodS,50,50);
  text("to feed the dog, press up arrow",130,300);

  //add styles here

}


function writeStock(FoodS){

  if(FoodS > 0 ){

   FoodS = FoodS - 1;

  }
   else if(FoodS <= 0){
  FoodS = 0;
  }

  database.ref('/').set(
  {
    food: FoodS
  }
  );
}

function readStock(data){

FoodS = data.val();


}
