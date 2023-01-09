document.addEventListener('DOMContentLoaded',() =>{
    var grid = document.querySelector('.grid');

    for(var i = 0; i < 900; i++) {
        var newDiv = document.createElement('div');
        grid.appendChild(newDiv);
    }

    const div = document.querySelectorAll('.grid div');
    const score = document.querySelector('.puntuacion');
    const start = document.querySelector('.start');
    const live = document.querySelector('.vidas');

    const Width = 30;
    let snakeIndex 
    let appleIndex 
    let cuerpoSnake 
    let direction
    let scores,lives,speed,intervalTime,interval,stopGame,speedUp = 0.0097

    lives = 3
    scores = 0

    const startGame = () => {

        let selectId = document.getElementById('select')

        if (selectId.value === 'facil' ){
            speedUp = 0.00097
        }
        else if (selectId.value === 'normal' ){
            speedUp = 0.0027
        }
        else if (selectId.value === 'dificil'){
            speedUp = 0.0097
        }


        if(cuerpoSnake){
            cuerpoSnake.forEach(index => div[index].classList.remove('snake'))
            div.forEach(element => element.classList.remove('apple'))
        }

        clearInterval(interval)

        direction = 1
        intervalTime = 250
        cuerpoSnake = [452,451,450]
        snakeIndex = 0
        speed = 0.97
        appleIndex = 0
        stopGame = false

        randomApple(false)

        score.innerText = scores
        live.innerText = lives

        cuerpoSnake.forEach(index => div[index].classList.add('snake'))
        interval = setInterval(moveOut,intervalTime)

    }
    const continuoGame = () => {

        if(cuerpoSnake){
            cuerpoSnake.forEach(index => div[index].classList.remove('snake'))
            div.forEach(element => element.classList.remove('apple'))
        }

        clearInterval(interval)

        direction = 1
        intervalTime = 250
        cuerpoSnake = [452,451,450]
        snakeIndex = 0
        speed = 0.97
        appleIndex = 0
        stopGame = false

        randomApple(false)

        score.innerText = scores
        live.innerText = lives

        cuerpoSnake.forEach(index => div[index].classList.add('snake'))
        interval = setInterval(moveOut,intervalTime)

    }

    const moveOut = () => {
        if (
            (cuerpoSnake[0] + Width >= (Width*Width) && direction == Width) || 
            (cuerpoSnake[0] % Width === 0 && direction == -1) || 
            (cuerpoSnake[0] % Width === Width - 1 < 0 && direction === 1)||
            (cuerpoSnake[0] - Width < 0 && direction === -Width)||
            div[cuerpoSnake[0] + direction].classList.contains('snake')
        ){
            live.innerText = --lives
            div.forEach(element => element.classList.remove('apple'))
        
            if (lives === 0){
                stopGame = true
                scores = 0
                live.innerText = "Game Over"
                lives = 3
                return clearInterval(interval)
            }
            else{
                continuoGame();
                return;
            }
        }
        const tail = cuerpoSnake.pop()
        div[tail].classList.remove('snake')
        cuerpoSnake.unshift(cuerpoSnake[0] + direction)

        if (div[cuerpoSnake[0]].classList.contains('apple') || div[cuerpoSnake[0]].classList.contains('apple2')) {
        
            if (div[cuerpoSnake[0]].classList.contains('apple')){
                div[cuerpoSnake[0]].classList.remove('apple')
                score.textContent = ++scores
            }
            if (div[cuerpoSnake[0]].classList.contains('apple2')) {
                div[cuerpoSnake[0]].classList.remove('apple2')
                score.textContent = scores + 2
            }
            div[tail].classList.add('snake')
            cuerpoSnake.push(tail)
            speed = speed - speedUp
            intervalTime = intervalTime * speed
            randomApple(true)
            clearInterval(interval)

            interval = setInterval(moveOut, intervalTime)
        }
        div[cuerpoSnake[0]].classList.add('snake')
        
    }


    function randomApple(boolean) {

        if((scores % 3 === 0) && boolean)
            for(let index = 0; index < 2; index++){
                do 
                    appleIndex = Math.floor(Math.random() * div.length)
                while (div[appleIndex].classList.contains('snake'))
                if(index == 0){
                    div[appleIndex].classList.add('apple')
                }
                else{
                    div[appleIndex].classList.add('apple2')
                }

                setTimeout(()=>{
                    div[appleIndex].classList.remove('apple2')
                }, 6000);
            }
        
        else {
            do
                appleIndex = Math.floor(Math.random() * div.length)
            while (div[appleIndex].classList.contains('snake'))
            div[appleIndex].classList.add('apple')
        }
    } 

    function control(e){
        div[snakeIndex].classList.remove('snake');

        if(e.keyCode === 39 && direction != -1){
            direction = 1
        }
        else if(e.keyCode === 38 && direction != Width){
            direction = -Width
        }
        else if(e.keyCode === 37 && direction != 1){
            direction = -1
        }
        else if(e.keyCode === 40 && direction != -Width){
            direction = Width
        }
    }

    document.addEventListener('keydown', control)
    start.addEventListener('click', startGame)

    grid.addEventListener('click',() =>{
        if(!stopGame){
            clearInterval(interval)
        }
        else{
            interval = setInterval(moveOut,intervalTime)
        }
        stopGame = !stopGame
    })

})