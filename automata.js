var automata = (function(){
  var canvas = document.getElementById('viewport'),
      ctx = canvas.getContext('2d'),
      cellSize = 50,     
      cellArray = [],
      mouse = {x:0, y:0},
      //iterators
      i,
      n;

  function Cell(x, y, w){
    this.x = x;
    this.y = y; 
    this.w = w;
    this.power = 0.7;
    this.color = 'rgb(30,30,30)';
    this.fillColor = 'rgba(50, 100, 150, ' + this.power + ')'; 
    console.log(this.fillColor);

    this.draw = function(){
      ctx.save();
      ctx.lineWidth = 1; 
      ctx.strokeStyle = this.color;
      ctx.fillStyle = this.fillColor;
      ctx.beginPath();
      ctx.rect(this.x, this.y, w, w);
      ctx.stroke();

      if(this.power > 0){
        ctx.fillRect(this.x, this.y, w, w);
      }
    
      ctx.restore();    
    }

    cellArray.push(this);
  }

  function buildGrid(){
    var cellWidth = canvas.getAttribute('width') / cellSize, 
        gridWidth = canvas.getAttribute('width') / cellWidth,
        gridHeight = canvas.getAttribute('height') / cellWidth; 
    
    for(i = 0; i <= gridWidth; i++){
      for(n = 0; n <= gridHeight; n++){ 
        new Cell(cellWidth * i, cellWidth * n, cellWidth);
      }
    }

    for(i = 0; i < cellArray.length; i++){
      cellArray[i].draw(); 
    } 
    console.log(cellArray);
  }
  
  function resizeCanvas(){
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);  
  }

  function addEventListeners(){
    document.onmousemove = function(e){
      mouse.x = e.pageX;
      mouse.y = e.pageY; 
      console.log(mouse);
    }  
  }
 
  function testIt(){
    buildGrid();
  } 
    
  function init(){
    resizeCanvas();  
    addEventListeners;
    testIt();
  }

  init();
  
})()
