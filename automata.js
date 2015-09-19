var automata = (function(){
  var canvas = document.getElementById('viewport'),
      ctx = canvas.getContext('2d');
      
  function Cell(x, y, w){
    this.x = x;
    this.y = y; 
    this.w = w;
    this.color = 'rgb(30,30,30)';

    this.draw = function(){
      ctx.save();
      
      ctx.strokeStyle = this.color;
      ctx.beginPath();
      ctx.rect(this.x, this.y, w, w);
      ctx.stroke();
      ctx.restore();    
    }
  }
  
  function resizeCanvas(){
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);  
  }
 
  function testIt(){
    var newCell = new Cell(50, 50, 50);
    newCell.draw();  
    console.log(newCell);
  } 
    
  function init(){
    resizeCanvas();  
    testIt();
    var newCell = new Cell();
    newCell.draw();  
  }

  init();
  
})()
