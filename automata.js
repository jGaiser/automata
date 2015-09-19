var automata = (function(){
  var canvas = document.getElementById('viewport'),
      ctx = canvas.getContext('2d');
      
  function Cell(x, y, w){
    this.x = x;
    this.y = y; 
    this.w = w;

    this.draw = function(){
        
    }
  }

  function resizeCanvas(){
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerWidth);  
  }
      
  
    
  function init(){
    resizeCanvas();  
  }

  init();
  
})()
