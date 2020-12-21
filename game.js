/*

  Program: Flappy Bird AI
  Author: Amy Burnett
  Date: January 28 2019


*/

class Game{

    constructor(){

        this.bird = new Bird(100,height / 2); 
        this.walls = [];
        this.nextWall;

        this.wall_gap = 150;
        
        // creates 5 walls
        for(var i = 0; i < 5; ++i){
            this.createWall();
        }
        this.nextWall = this.walls[0];

        this.score = 0;

    }

    reset(){

        this.bird = new Bird(100,height / 2); 
        this.walls = [];
        this.nextWall;

        this.wall_gap = 150;
        
        // creates 5 walls
        for(var i = 0; i < 5; ++i){
            this.createWall();
        }
        this.nextWall = this.walls[0];

        this.score = 0;
    }


    // handles all updates of the game
    update(){

        if(!this.bird.hitSomething){
            this.bird.update();
            this.bird.collision(this.walls);
            //this.nextWall.color = "red";
            this.determineNextWall();

            for(var i = 0; i < this.walls.length; ++i){
                this.walls[i].update();
            }

            this.generateWalls();

            // show score
            document.getElementById("score").innerHTML = this.score;

        } else {

            this.reset();

        }


    }

    determineNextWall(){

        // if the bird has passed the previous current wall, then update new nextwall
        if (this.bird.position.x - this.bird.size > this.nextWall.x + this.nextWall.width){
            
            //this.nextWall.color = "lime";
            
            // find current wall to get the next
            for(var i = 0; i < this.walls.length; ++i){
                if(this.walls[i].equals(this.nextWall)){
                    this.nextWall = this.walls[i + 1];
                    this.score++;
                    break;
                }
            }


        }

    }

    // handles wall creation and destruction 
    generateWalls(){

        // remove wall if off screen
        for(var i = 0; i < this.walls.length; ++i){

            // offscreen left 
            if(this.walls[i].x + this.walls[i].width < 0){

                // remove wall
                this.walls.splice(0,1);

                // add a new wall to the end 
                this.createWall();

            } 
            // otherwise, none of the other walls should be offscreen left
            else {

                break;

            }

        }

    }

    createWall(){

        // no walls 
        if(this.walls.length == 0){

            var y = floor(random(height - (this.wall_gap + 20)));
            var wall = new Wall(250, y, y + this.wall_gap);
            this.walls.push(wall);

        }

        // walls exist 
        else {

            var lastwall = this.walls[this.walls.length - 1];

            var y = floor(random(height - (this.wall_gap + 20)));
            var wall = new Wall(lastwall.x + (lastwall.width * 3), y, y + this.wall_gap);
            this.walls.push(wall);

        }

    }

    // tells the bird to jump
    flap(){
        this.bird.jump();
    }

    // Draw the game to the screen
    show(){

        this.bird.show();
        for(var i = 0; i < this.walls.length; ++i){
            this.walls[i].show();
        }

    }

}