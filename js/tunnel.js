function Tunnel(screenHeight, heightFactor){
    this.tunnelHeight = screenHeight * heightFactor;
    this.decreasingFactor = 0.1;
}

Tunnel.prototype.decreaseTunnelHeight = function(){
    this.tunnelHeight -= this.decreasingFactor;
};


