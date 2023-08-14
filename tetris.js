// writing an js file for tetris game 

document.addEventListener('DOMContentLoaded',() => {
    const width = 10;
    const gird = document.querySelector(".grid");
    let squares  = Array.from(document.querySelectorAll(".grid div"));
    const ScoreDisplay = document.getElementById('score')
    const StartBtn = document.getElementById('start')

    // tetraminos 
    const ltmno = [
        [1,width+1,width*2 + 1 , 2],
        [width,width+1,width+2,width*2+2],
        [1,width+1,width*2+1,width*2],
        [width,width*2,width*2+1,width*2+2]
    ]

    const ztmno = [
        [width*3,width*3+1,width*2+1,width*2+2],
        [0,width,width+1,width*2+1],
        [width*3,width*3+1,width*2+1,width*2+2],
        [0,width,width+1,width*2+1]
    ]

    const ttmno = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]

    const stmno =[
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]

    const itmno = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const tetraminos = [ltmno,ztmno,ttmno,stmno,itmno];
    let tmno ;
    let rot;
    function random_pos( )
    {
        return parseInt(Math.random()*10%7);
    }

    function random_rotation()
    {
        tmno = parseInt(Math.random()*10%5);
        rot = parseInt(Math.random()*10%4);
        return tetraminos[tmno][rot];
    }

    let  currentpos = random_pos(); 
    
    let rotation = random_rotation();
    
    function draw()
    {
        rotation.forEach(index =>{
            squares[currentpos + index].classList.add('tetraminos');
        })
    }


    function undraw()
    {
        rotation.forEach(index =>{
            squares[currentpos+index].classList.remove('tetraminos');
        })
    }
    
    let timerID = setInterval(moveDown,500); 
    document.addEventListener('keyup',control)
    function control(events)
    {
        if(events.key === "ArrowLeft")
        {
            moveLeft();
        }
        else if(events.key === "ArrowRight")
        {
            moveRight();
        }
        else if(events.key === "ArrowUp")
        {
            rotate();
        }
        else if(events.key === "ArrowDown")
        {
            moveDown();
        }
    
    }
    
    function moveDown() {
        undraw();
        const nextPosition = currentpos + width;
        if (!isCollision(nextPosition)) {
            currentpos = nextPosition;
        }
        draw();
        freez();
    }

    function moveRight() {
        undraw();
        const isAtRightEdge = rotation.some(index => (currentpos + index) % width === width - 1);
        if (!isAtRightEdge) {
            currentpos += 1;  
        }
        if (rotation.some(index => squares[currentpos + index].classList.contains('taken'))) {
            currentpos -= 1;

        }
        draw();
    }
    


    function moveLeft() {
        undraw();
        const isAtLeftEdge = rotation.some(index => (currentpos + index) % width === 0);
        if (!isAtLeftEdge) {
            currentpos -= 1;
        }   
        if (rotation.some(index => squares[currentpos + index].classList.contains('taken'))) {
            currentpos += 1;
        }
        draw();
    }

    function rotate(){
        undraw();
        
        const isAtLeftEdge = rotation.some(index => (currentpos + index) % width === 0);
        const isAtRightEdge = rotation.some(index => (currentpos + index) % width === width - 1);
        if(!isAtLeftEdge  && !isAtRightEdge)
        {
            rot = (rot+1)%4;
        }

        rotation = tetraminos[tmno][rot];
        if(rotation.some(index => squares[currentpos + index].classList.contains('taken')))
        {
            rot = (rot+3)%4;
            rotation = tetraminos[tmno][rot];
        }
        draw();
    }

    function isCollision(position) {
        return rotation.some(index =>
            squares[position + index].classList.contains('taken') 
        );
    }
    

    function freez() {
        if (rotation.some(index =>
            squares[currentpos + index + width].classList.contains('taken') 
        )) {
            rotation.forEach(index => {
                squares[currentpos + index].classList.add('taken');
            })
    
            currentpos = random_pos();
            rotation = random_rotation();
            draw();
        }
    }
    
}) 