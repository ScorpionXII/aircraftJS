var game = null;
var divObstaclesArray = [];
var keys = {};
var intervalId = null;

var fps = 40; // Frames per Second

var secondsBetweenObstacle = 1;
var obstaclesTimeDelta = 0; //Calculated at checkToAddObstacle() related with time to deploy obstacle 

var obstacleDimension = 0; //Initialized at init()

var documentHeight = 0;

function startMenuLoop(){
    if (keys[32]) {
        clearInterval(intervalId);
        initGame();
        $("#start-menu").hide();
    }
    $(".start-image").toggleClass('start-image-bg');
}

function initGame(){
    documentHeight = $(document).height();
    
    var aircraft = new Aircraft($("#air-craft").position().top);
    var tunnel = new Tunnel(documentHeight, 0.8);
    game = new Game(aircraft, tunnel);
    
    obstacleDimension = documentHeight * 0.20;
      
    renderInitialTunnel();   
    intervalId = setInterval(render, 1000/fps);
}

function render(){
    if (!keys[8]){
        game.gameStep();
        checkControls();
        removeOldObstacles();
        checkToAddObstacle();
        renderTunnel();
        renderElements();
        renderScore();
        checkCollisions();
    }
}

function renderScore(){
    $("#distance").html(game.getScoredPoints());
    $("#distance").html(game.tunnel.tunnelTop);
    //$(".ppp").css("top", documentHeight/2 + game.tunnel.tunnelHeight/2);
}

function renderElements(){
    
    $("#air-craft").css({"top" : game.aircraft.altitude, "transform" : "rotate(" + game.aircraft.rotation + "deg)"}).toggleClass("air-craft-bg");
    
    divObstaclesArray.forEach(function(thisDiv, index){
        thisDiv.css("right", game.obstacles[index].x);
    });    
}

function renderInitialTunnel(){
    var numOfDivs = 250;
    for (var i = 0; i < numOfDivs; i++){
        $("#way-container").append(createDivElementForTunnel());
    }
}

function createDivElementForTunnel(){
     var height = randomDivHeight(game.tunnel.tunnelHeight - 10, game.tunnel.tunnelHeight);
     var div = $('<div class="way" style="height:'+ height +'px;"></div>');
     return div;
}

function renderTunnel(){
    $('#way-container div:first-child').remove();
    $('#way-container').append(createDivElementForTunnel());
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
    if ($("#bounding-box").collision(".obstacle").length >  0) {
        $("#boom").css({ "visibility":"visible" });
        clearInterval(intervalId);
    }
             
     var heightToCheck = $('#way-container div:first-child').height();   
     
     if ($("#air-craft").position().top < (documentHeight/2 - heightToCheck/2) - 10 || $("#air-craft").position().top + 81 > (documentHeight/2 + heightToCheck/2)) {     
        $("#boom").css({ "visibility":"visible" });
        clearInterval(intervalId);        
     }
}

function removeOldObstacles(){
    if (divObstaclesArray[0] && divObstaclesArray[0].position().left < -obstacleDimension){
        divObstaclesArray[0].remove();
        divObstaclesArray.shift();
        game.removeObstacle();   
    }
}

function checkToAddObstacle(){
    if (obstaclesTimeDelta <= 0){
        var obstacleObject = game.createObstacle(obstacleDimension, 10, documentHeight);
        game.addObstacle(obstacleObject);
    
        var obstacleContainer = $('<div class="obstacle '+ obstacleObject.name +'" style="top:'+ game.lastObstacle().y +'px; width:'+ obstacleDimension +'px; height:'+ obstacleDimension +'px;"></div>');
    
        divObstaclesArray.push(obstacleContainer);
        $("#game-wrapper").append(obstacleContainer);
        
        obstaclesTimeDelta = secondsBetweenObstacle*1000/fps + obstacleDimension/5;
    } else
        obstaclesTimeDelta--;
}

$(document).ready(function(){
    intervalId = setInterval(startMenuLoop, 1000/(fps/2));
});

$(document).keydown(function(e){
    keys[e.keyCode] = true;
}).keyup(function(e){
    delete keys[e.keyCode];
});