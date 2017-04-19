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

Game.prototype.createObstacle = function(velocity){
    var yPos = this.generateObstaclePosition(100);
    var obstacle = new Obstacle(-200, yPos, velocity);
    return obstacle;
};

Game.prototype.removeObstacle = function(){
    this.obstacles.shift();
};

Game.prototype.generateObstaclePosition = function(marginFromTunnel){
    return Math.random() * (this.tunnel.tunnelHeight - (2*marginFromTunnel)) + marginFromTunnel + this.tunnel.tunnelTop;
};

Game.prototype.lastObstacle = function(){
    return this.obstacles[this.obstacles.length-1];  
};

Game.prototype.firstObstacle = function(){
    return this.obstacles[0];  
};




