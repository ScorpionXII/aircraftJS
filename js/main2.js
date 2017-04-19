var terminalVelocity = 10;
var topSpeed = 10;
var friction = 0.8;
var gravity = 4.0;
var speed = 1;
var acceleration = 0.80;

var widthFactor = 0.9995;
var divHeight = 0;

var TimeID = 0;

var y = 0;

var keys = {};

$(document).ready(function(){
    divHeight = $(document).height() * 0.8;
    createDIVs();
    TimeID = setInterval(updatePath, 20);
    
    y = $(".air-craft").position().top;
    
    
     $(document).keydown(function(event){
        keys[event.which] = true;
    }).keyup(function(event){
        delete keys[event.which];
    });
    
});

function updatePath(){
    $(".air-craft").toggleClass("air-craft-bg");
    $(".obstacle").css({left:"-=5"});
    checkControls();
    physicsEmulation();
    checkCollisions();
    $('.way-container div:first-child').remove();
    $('.way-container').append(createOneDiv());
}

function createDIVs() {
    for (var i=0; i< 250; i++){
        var height = Math.floor(Math.random() * (divHeight - (divHeight-10))) + divHeight - 10;
        
        var div = $('<div>');
        div.addClass("way");
        div.css("height", height);
        
        $(".way-container").append(div);
    }
}

function createOneDiv(){
     divHeight *= widthFactor;
     var height = Math.floor(Math.random() * (divHeight - (divHeight-10))) + divHeight - 10;
     var div = $('<div>');
     div.addClass("way");
     div.css("height", height);
     return div;
}

function physicsEmulation(){
    y += speed;
    $(".air-craft").css({top:y});
}

function checkControls(){
    if (keys[32]) {
         speed -= acceleration;
            if (speed < -topSpeed) 
                speed = -topSpeed;
    } else {
        speed = (speed + gravity) * friction;
        if(speed > terminalVelocity) 
            speed = terminalVelocity;
    }
}

function checkCollisions(){
     if ($(".bounding-box").collision(".obstacle").length >  0)
        clearInterval(TimeID);
        
     var tunnelHeight = $('.way-container div:first-child').height();   
     
     if ($(".air-craft").position().top < ($(document).height()/2 - tunnelHeight/2) || $(".air-craft").position().top + 81 > ($(document).height()/2 + tunnelHeight/2)) {
        
        console.log($(document).height());
        console.log($(document).height() - divHeight);
        console.log($(".bounding-box").position().top);
        
        clearInterval(TimeID);
     }
       
}
     
