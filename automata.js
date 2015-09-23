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
      curCell,
      curNeighborCells,
      //iterators
      i,
      n;

  function Cell(x, y, w){
    this.x = x;
    this.y = y; 
    this.w = w;
    this.coordinates = {};
    this.neighborCells = {};
    this.candidatePower = [];
    this.power = 0.0;
    this.color = 'rgb(30,30,30)';
    this.fillColor = 'rgba(50, 100, 150, ' + this.power + ')'; 

    this.draw = function(){
      ctx.save();
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
      activeCells.push(this);
    }

    this.step = function(){  
      this.power -= 0.10;   
      this.fillColor = 'rgba(50, 100, 150, ' + this.power + ')'; 

      if(this.power < 0){
        activeCells.splice(activeCells.indexOf(this), 1);   
      }else{
        this.draw();
      }
    }

    cellArray.push(this);
  }

  function buildGrid(){
    var newCell;
    var tempArray = [];
    cellWidth = cellWidth   || canvas.getAttribute('width') / cellSize; 
    gridWidth = gridWidth   || canvas.getAttribute('width') / cellWidth;
    gridHeight = gridHeight || canvas.getAttribute('height') / cellWidth; 
    
    for(i = 0; i <= gridWidth; i++){
      tempArray.push([]);
      for(n = 0; n <= gridHeight; n++){ 
        tempArray[i].push([]);

        newCell = new Cell(cellWidth * i, cellWidth * n, cellWidth);
        newCell.coords = {col: i, row: n};
        tempArray[i][n] = newCell;

        if(i > 0){
          tempArray[i - 1][n].neighborCells.r = newCell;  
          newCell.neighborCells.l = tempArray[i - 1][n];
        }

        if(n > 0){
          tempArray[i][n - 1].neighborCells.b = newCell;
          newCell.neighborCells.t = tempArray[i][n - 1];  
        }
      }
    }

    for(i = 0; i < cellArray.length; i++){
       
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
   
    for(n = activeCells.length - 1; n >= 0; n--){
      activeCells[n].step();
    }
    
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
