var game = null;
var divObstaclesArray = [];
var keys = {};
var intervalId = null;

var fps = 1000/25; // Frames per Second: 1000ms / value : 1000/25 = 40fps

var secondsBetweenObstacle = 1.2;
var deltaObstaclesFPS = 0;

var obstacleDimension = 0;

function init(){
    var aircraft = new Aircraft($(".air-craft").position().top);
    var tunnel = new Tunnel($(document).height() / 2 - ($(document).height() * 0.8 / 2), $(document).height() * 0.8);
    game = new Game(aircraft, tunnel);
    
    obstacleDimension = $(document).height() * 0.18;
      
    renderInitialTunnel();   
    intervalId = setInterval(render, 1000/fps);
}

function render(){
    checkCollisions();
    game.gameStep();
    checkControls();
    removeOldObstacles();
    checkToAddObstacle();
    renderTunnel();
    renderElements();
    renderScore();
}

function renderScore(){
    $(".distance").html(game.getScoredPoints());
}

function renderElements(){
    
    $(".air-craft").css({"top" : game.aircraft.altitude, "transform" : "rotate(" + game.aircraft.rotation + "deg)"}).toggleClass("air-craft-bg");
    
    divObstaclesArray.forEach(function(thisDiv, index){
        thisDiv.css("right", game.obstacles[index].x);
    });    
}

function renderInitialTunnel(){
    var numOfDivs = 250;
    for (var i = 0; i < numOfDivs; i++){
        $(".way-container").append(createDivElementForTunnel());
    }
}

function createDivElementForTunnel(){
     var height = randomDivHeight(game.tunnel.tunnelHeight - 10, game.tunnel.tunnelHeight);
     var div = $('<div class="way" style="height:'+ height +'px;"></div>');
     return div;
}

function renderTunnel(){
    $('.way-container div:first-child').remove();
    $('.way-container').append(createDivElementForTunnel());
}

function randomDivHeight(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function checkControls(){
    if(keys[32])
        game.aircraft.isFalling = false;
    else
        game.aircraft.isFalling = true;        
}

function checkCollisions(){
    if ($(".bounding-box").collision(".obstacle").length >  0)
        clearInterval(intervalId);
        
     var heightToCheck = $('.way-container div:first-child').height();   
     
     if ($(".air-craft").position().top < ($(document).height()/2 - heightToCheck/2) || $(".air-craft").position().top + 81 > ($(document).height()/2 + heightToCheck/2)) {     
        clearInterval(intervalId);
     }
}

function removeOldObstacles(){
    if (divObstaclesArray[0] && divObstaclesArray[0].position().left < -200){
        divObstaclesArray[0].remove();
        divObstaclesArray.shift();
        game.removeObstacle();   
    }
}

function checkToAddObstacle(){
    if (deltaObstaclesFPS == 0){
        var obstacleObject = game.createObstacle(10);
        game.addObstacle(obstacleObject);
    
        var obstacleContainer = $('<div class="obstacle '+ obstacleObject.name +'" style="top:'+ game.lastObstacle().y +'px; width:'+ obstacleDimension +'px; height:'+ obstacleDimension +'px;"></div>');
    
        divObstaclesArray.push(obstacleContainer);
        $(".wrapper").append(obstacleContainer);
        
        deltaObstaclesFPS = secondsBetweenObstacle*fps;
    } else
        deltaObstaclesFPS--;
}

$(document).ready(function(){
    init();
});

$(document).keydown(function(e){
    keys[e.keyCode] = true;
}).keyup(function(e){
    delete keys[e.keyCode];
});
