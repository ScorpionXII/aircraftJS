function Tunnel(tunnelTop, tunnelHeight){
    this.tunnelTop = tunnelTop;
    this.tunnelHeight = tunnelHeight;
    this.decreasingFactor = 0.9998;
}

Tunnel.prototype.decreaseTunnelHeight = function(){
    this.tunnelTop /= this.decreasingFactor;
    this.tunnelHeight *= this.decreasingFactor;
};


