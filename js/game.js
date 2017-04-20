function Game(aircraftObj, tunnelObj){
    this.aircraft = aircraftObj;
    this.tunnel = tunnelObj;
    this.obstacles = [];
    this.gameCycles = 0;
    this.isRunning = true;
}

Game.prototype.gameStep = function(){
    this.aircraft.move();
    this.aircraft.increaseTraveledDistace(0.5);
    this.tunnel.decreaseTunnelHeight();
    this.moveObstacles();
    this.gameCycles++;
};


Game.prototype.getScoredPoints = function(){
    return this.aircraft.traveledDistance.toFixed(0);
};

Game.prototype.moveObstacles = function(){
    this.obstacles.forEach(function(obj){
        obj.move();
    });
};

Game.prototype.addObstacle = function(obstacleObj){
    this.obstacles.push(obstacleObj);
};

Game.prototype.createObstacle = function(dimension, velocity, screenHeight){
    var yPos = this.generateObstaclePosition(dimension, screenHeight);
    var obstacle = new Obstacle(-dimension, yPos, velocity);
    return obstacle;
};

Game.prototype.removeObstacle = function(){
    this.obstacles.shift();
};

Game.prototype.generateObstaclePosition = function(dimension, screenHeight){
    return Math.random() * ((screenHeight/2 + this.tunnel.tunnelHeight/2 - dimension) - (screenHeight/2 - this.tunnel.tunnelHeight/2)) + (screenHeight/2 - this.tunnel.tunnelHeight/2);
};

Game.prototype.lastObstacle = function(){
    return this.obstacles[this.obstacles.length-1];  
};

Game.prototype.firstObstacle = function(){
    return this.obstacles[0];  
};

Game.prototype.debug = function(){
    console.log("Tunnel Height :" + this.tunnel.tunnelHeight);
    console.log("Min: " + this.tunnel.tunnelTop);
    console.log("Max: " + 1*(this.tunnel.tunnelHeight - dimension));
};



