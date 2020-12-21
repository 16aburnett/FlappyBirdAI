/*

  Program: Flappy Bird AI
  Author: Amy Burnett
  Date: January 28 2019


*/

class Bot {

    constructor(){

        this.brain = new NeuralNetwork(4,[8],1);

    }

    train(){

        var training_data = [
            {
                inputs: [0.8145,0.225,0.6,1],
                target: [1]
            },
            {
                inputs: [0.8895000000000001,0.3475,0.7225,1],
                target: [1]
            },
            {
                inputs: [0.50,0.435,0.81,0.3],
                target: [0]
            },
            {
                inputs: [0.7895,0.435,0.81,1],
                target: [1]
            },
            {
                inputs: [0.902,0.435,0.81,1],
                target: [1]
            },
            {
                inputs: [0.2484999999999998,0.4775,0.8525,1],
                target: [0]
            },
            {
                inputs: [0.3484999999999998,0.4775,0.8525,1],
                target: [0]
            },
            {
                inputs: [0.70,0.4175,0.7925,1],
                target: [1]
            },
            {
                inputs: [0.50,0.4175,0.7925,1],
                target: [0]
            },
            {
                inputs: [0.35474999999999995,0.0275,0.4025,0.6799999999999995],
                target: [1]
            }
        ];

        for(var i = 0; i < 100; ++i){
            var data = random(training_data);
            this.brain.train(data.inputs, data.target);
        }

    }

    play(){

        this.train();

        // grabbing inputs
        var bird_height = game.bird.position.y;
        bird_height /= height;
        var nextwall_top = game.nextWall.ytop;
        nextwall_top /= height;
        var nextwall_bottom = game.nextWall.ybottom;
        nextwall_bottom /= height;
        var bird_velocity = game.bird.velocity.y;
        bird_velocity /= game.bird.maxSpeed;

        var inputs = [bird_height, nextwall_top, nextwall_bottom, bird_velocity];
        console.log(inputs.toString());

        // determining a decision based on inputs
        var decision = this.brain.feedForward(inputs);

        console.log(decision);

        
        if(decision[0] > 0.5){
            game.flap();
        } 


    }

}