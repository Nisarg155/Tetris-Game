// writing an js file for tetris game 

document.addEventListener('DOMContentLoaded', () => {
    const width = 10;
    const grid = document.querySelector(".grid");
    let squares = Array.from(document.querySelectorAll(".grid div"));
    let nextSquares = Array.from(document.querySelectorAll(".mini_grid div"));
    const ScoreDisplay = document.getElementById('score')
    const StartBtn = document.getElementById('start')
    let timerID ;

    // tetraminos 
    const ltmno = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]



    const ztmno = [
        [width * 3, width * 3 + 1, width * 2 + 1, width * 2 + 2],
        [0, width, width + 1, width * 2 + 1],
        [width * 3, width * 3 + 1, width * 2 + 1, width * 2 + 2],
        [0, width, width + 1, width * 2 + 1]
    ]

    const ttmno = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const stmno = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const itmno = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]

    

    

    const tetraminos = [ltmno, ztmno, ttmno, stmno, itmno];
    const nexttmnos = [
        [1,5,9,10], //ltmno
        [5,6,10,11], //ztmno
        [5,6,7,10], //ttmno
        [5,6,9,10], //stmno
        [1,5,9,13] //itmno
    ]
    let [tmno, rot] = random_rotation();
    let [nexttmno,nextrot] = random_rotation();
    let nextrotation = nexttmnos[nexttmno];
    console.log(nextSquares);
    function random_pos() {
        return parseInt(Math.random() * 10 % 7);
    }

    function random_rotation() {
        let tmno = parseInt(Math.random() * 10 % 5);
        let rot = parseInt(Math.random() * 10 % 4);
        return [tmno, rot];
    }

    let currentpos = random_pos();

    let rotation = tetraminos[tmno][rot];

    function draw() {
        rotation.forEach(index => {
            squares[currentpos + index].classList.add('tetraminos');
        })
    }

    function draw_next() {
        nextrotation.forEach(index => {
            nextSquares[index].classList.add('tetraminos');
        })
    }

    function undraw_next() {


        nextrotation.forEach(index => {
            nextSquares[index].classList.remove('tetraminos');
        })
    }


    function undraw() {
        rotation.forEach(index => {
            squares[currentpos + index].classList.remove('tetraminos');
        })
    }

    
    document.addEventListener('keyup', control)
    function control(events) {
        if (events.key === "ArrowLeft") {
            moveLeft();
        }
        else if (events.key === "ArrowRight") {
            moveRight();
        }
        else if (events.key === "ArrowUp") {
            rotate();
        }
        else if (events.key === "ArrowDown") {
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
    function rotate() {
        undraw();
        rot = (rot + 1) % 4;

        const isAtLeftEdge = rotation.some(index => (currentpos + index) % width === 0);
        const isAtRightEdge = rotation.some(index => (currentpos + index) % width === width - 1);
        
        if(!isAtLeftEdge && !isAtRightEdge){
            rotation = tetraminos[tmno][rot];
        }  
        else{
            rot = (rot + 3) % 4;
        }
        
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
            [tmno,rot] = [nexttmno,nextrot];
            rotation = tetraminos[tmno][rot];
            draw();
            undraw_next();
            let [newnexttmno,newnextrot] = random_rotation();
            nextrotation = nexttmnos[newnexttmno];
            [nexttmno,nextrot] = [newnexttmno,newnextrot];
            
            draw_next();
            score();
            gameover();
        }
    }


    StartBtn.addEventListener('click',()=>{
        if(timerID){
            clearInterval(timerID);
            timerID = null;
        }
        else{
            draw();
            draw_next();
            timerID = setInterval(moveDown,700);
        }
    })



    function score(){
        let row = [];
        for(let i = 0;i<199;i += width)
        {
            row.splice(0);
            for(let j = 0;j<10 ;j++ )
            {
                row.push(i+j);
            }
    
            if(row.every(index => squares[index].classList.contains('taken')))
            {
                ScoreDisplay.innerHTML = parseInt(ScoreDisplay.innerHTML) + 10;
    
                for(let l = 0;l<10;l++)
                {
                    squares[row[l]].classList.remove('taken');
                    squares[row[l]].classList.remove('tetraminos');
                }
                const newsquares = squares.splice(i,width);
                squares = newsquares.concat(squares);
                squares.forEach(cell => grid.appendChild(cell));
            }
        }
    }

    //gameover
    function gameover(){
        if(rotation.some(index=>squares[currentpos+index].classList.contains('taken'))){
            ScoreDisplay.innerHTML = "Game Over";
            clearInterval(timerID);
        }
    }


}) 
