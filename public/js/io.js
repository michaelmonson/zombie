"use strict";

$(document).ready(function(){

  socket = io.connect();
  
  
  $(function() {
    var e = $("body");
  
    var speedX = 0 
      , speedY = 0;
  
    e.bind('keyup', function(e) {
      switch (e.which) {
        case 37: speedX = 0; break; // left
        case 38: speedY = 0; break; // up
        case 39: speedX = 0; break; // right
        case 40: speedY = 0; break; // down
      }   
      emit();
    }); 
  
    e.bind('keydown', function(e) {
      switch (e.which) {
        case 37: speedX =  1; break; // left
        case 38: speedY =  1; break; // up
        case 39: speedX = -1; break; // right
        case 40: speedY = -1; break; // down
      }   
      emit();
    }); 
  
    function emit() {
      socket.io.emit({x: speedX, y: speedY});
    }

  });
  
  
});