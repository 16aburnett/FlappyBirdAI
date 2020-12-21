/*

  Program: Flappy Bird AI
  Author: Amy Burnett
  Date: January 28 2019


*/

var game;
var bot;

function setup() {
    createCanvas(400, 400);
    translate(0,0);

    game = new Game();
    bot = new Bot();

}

function draw() {

    background(100,150,255);
    game.update();
    game.show();
    bot.play();

}

function keyPressed(){

    // Space bar
    if(keyCode == 32){
        game.flap();
    }
    // 'R' key
    else if (keyCode == 82){
        game.reset();
    }

}