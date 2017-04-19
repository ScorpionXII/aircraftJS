function Obstacle(positionX, positionY, velocity) {
    this.availableNames = ["js", "sass", "css", "html5"];
    this.name = this.pickRandomName();
    this.x = positionX;
    this.y = positionY;
    this.velocity = velocity;
}

Obstacle.prototype.move = function(){
    this.x += this.velocity;
};

Obstacle.prototype.pickRandomName = function(){
     return this.availableNames[Math.floor(Math.random()*this.availableNames.length)];
};
