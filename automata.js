var automata = (function(){
  var canvas = document.getElementById('viewport'),
      ctx = canvas.getContext('2d'),
      canvasWidth,
      canvasHeight,
      cellSize = 50,     
      cellArray = [],
      activeCells = [],
      mouse = {x:0, y:0},
      cellWidth,
      gridWidth,
      gridHeight,
      //iterators
      i,
      n;

  function Cell(x, y, w){
    this.x = x;
    this.y = y; 
    this.w = w;
    this.power = 0.0;
    this.color = 'rgb(30,30,30)';
    this.fillColor = 'rgba(50, 100, 150, ' + this.power + ')'; 

    this.draw = function(){
      ctx.save();
      ctx.lineWidth = 1; 
      ctx.strokeStyle = this.color;
      ctx.fillStyle = this.fillColor;
      ctx.beginPath();
      ctx.rect(this.x, this.y, w, w);
//      ctx.stroke();

      if(this.power > 0){
        ctx.fillRect(this.x, this.y, w, w);
      }
    
      ctx.restore();    
    }

    this.hoverHandler = function(){
      this.power = 1;  
      this.fillColor = 'rgba(50, 100, 150, ' + this.power + ')'; 
      
      if(activeCells.indexOf(this) == -1){
        activeCells.push(this);
      }
    }

    this.step = function(){
      this.power -= 0.10;   
      this.fillColor = 'rgba(50, 100, 150, ' + this.power + ')'; 

      if(this.power < 0){
        activeCells.splice(activeCells.indexOf(this), 1);   
      }
    }

    cellArray.push(this);
  }

  function buildGrid(){
    cellWidth = cellWidth   || canvas.getAttribute('width') / cellSize; 
    gridWidth = gridWidth   || canvas.getAttribute('width') / cellWidth;
    gridHeight = gridHeight || canvas.getAttribute('height') / cellWidth; 
    
    for(i = 0; i <= gridWidth; i++){
      for(n = 0; n <= gridHeight; n++){ 
        new Cell(cellWidth * i, cellWidth * n, cellWidth);
      }
    }

    for(i = 0; i < cellArray.length; i++){
      cellArray[i].draw(); 
    } 
  }
  
  function resizeCanvas(){
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);  
  }

  
  function mouseMoveHandler(e){
    mouse.x = e.pageX - canvas.offsetLeft;
    mouse.y = e.pageY - canvas.offsetTop;
    for(i = 0; i < cellArray.length; i++){
      if(cellArray[i].x < mouse.x && cellArray[i].x + cellWidth > mouse.x){
        if(cellArray[i].y < mouse.y && cellArray[i].y + cellWidth > mouse.y){
          cellArray[i].hoverHandler();  
        }  
      } 
    }
  } 
  
  function step(){
    ctx.clearRect(0,0, canvasWidth, canvasHeight);  
    for(i = 0; i < cellArray.length; i++){
      cellArray[i].draw(); 
    }
    
    for(n=0; n < activeCells.length; n++){
      activeCells[n].step();
    }
    
    console.log(activeCells);
    requestAnimationFrame(step);
  }

  function addEventListeners(){
    document.onmousemove = function(e){
      mouseMoveHandler(e);
    }  
  }
 
  function testIt(){
    buildGrid();
  } 
    
  function init(){
    resizeCanvas();  
    addEventListeners();
    testIt();
    window.requestAnimationFrame(step);
  }

  init();
  
})()
