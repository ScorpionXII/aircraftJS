function Aircraft(initialAltitude){
    this.altitude = initialAltitude;
    this.terminalVelocity = 10;
    this.topSpeed = 10;
    this.friction = 0.8;
    this.gravity = 4.0;
    this.acceleration = 0.8;
    this.speed = 1;
    this.rotation = 0;
    this.traveledDistance = 0;
    this.isFalling = true;
}

Aircraft.prototype.move = function(){
    if(this.isFalling)
        this.freeFall();
    else
        this.accelerate();
    
    this.altitude += this.speed;
    this.rotation = this.speed;
};

Aircraft.prototype.accelerate = function() {
    if (this.speed < -this.topSpeed)
        this.speed = -this.topSpeed;
    else
        this.speed -= this.acceleration;
};

Aircraft.prototype.freeFall = function(){
    if (this.speed > this.terminalVelocity)
        this.speed = this.terminalVelocity;
    else
        this.speed = (this.speed + this.gravity) * this.friction;
};

Aircraft.prototype.increaseTraveledDistace = function(amount){
    this.traveledDistance += amount;
};

