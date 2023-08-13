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

    function random_pos( )
    {
        return parseInt(Math.random()*10%7);
    }

    function random_rotation()
    {
        return tetraminos[parseInt(Math.random()*10%5)][parseInt(Math.random()*10%4)];
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
    
    let timerID = setInterval(moveDown,200); 
    document.addEventListener('keyup',control)
    function control(events)
    {
        if(events.key === "ArrowLeft")
        {
            moveLeft();
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
    


    function moveLeft()
    {
        undraw();
        const con1 = rotation.some(index => {
            (index + currentpos)%width === 0
        })

        let con2 = rotation.some(index => {
            squares[index + currentpos ].classList.contains('taken');
        })

        if(!con1)
        {
            console.log('corner');
        }
        
    
        if(con2)
        {
            console.log('taken');
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