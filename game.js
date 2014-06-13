(function(root){
    var Asteroids = root.Asteroids = (root.Asteroids || {});
    
    var Game = Asteroids.Game = function(ctx) {
        this.ctx = ctx;
        this.asteroids = [];
        this.ship = new Asteroids.Ship([Game.DIM_X/2,Game.DIM_Y/2], [0,0]);
        this.currentInterval;
    }
    
    Game.DIM_X = 300;
    Game.DIM_Y = 200;
    Game.FPS = 300;
    
    Game.prototype.addAsteroids = function(numAsteroids) {
        for(var x = 0; x < numAsteroids; x++){
            this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y))
        }
    }
    
    Game.prototype.draw = function() {
        this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

        for(var i = 0; i < this.asteroids.length; i++){
            this.asteroids[i].draw(this.ctx);
        }
        this.ship.draw(this.ctx);
    }
    
    Game.prototype.move = function() {
        for(var i = 0; i < this.asteroids.length; i++){
            this.asteroids[i].move();
        }
        this.ship.move();
    }
    
    Game.prototype.step = function() {
        this.move();
        this.draw();
        this.checkCollisions();
    }
    
    Game.prototype.start = function() {
        
        this.addAsteroids(10);
        this.currentInterval = setInterval(this.step.bind(this), Game.FPS);
    }
    
    Game.prototype.stop = function() {
        alert("GAME OVER!");
        clearInterval(this.currentInterval);
    }
    
    Game.prototype.checkCollisions = function() {
        for(var i=0; i< this.asteroids.length; i++){
            if(this.ship.isCollidedWith(this.asteroids[i])){
                this.stop();
            }
        }
    }
})(this);

console.log("game.js loaded")
