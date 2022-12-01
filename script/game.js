window.addEventListener("DOMContentLoaded",function(){
    generateDiv();
    startGame();
})

function generateDiv(){
    let row=20;
    let col=20;
    let target = document.getElementById("container");

    for(let i=0; i<row; i++){
        for(let j=0; j<col; j++){
            let div = document.createElement('div');
            div.id = "div_"+i+"_"+j;
            div.className = 'gdiv';
            target.append(div);
        }
    }
}

function startGame(){
    var gameEnd = false;
    clearScreen();
    var location = initilize();
    var player = location[0];
    var ball = location[1];
    var defend = location[2];
  
    document.addEventListener('keydown', function(event) {          
        // Set a direction for each code
        switch (event.code) {
            case 'KeyA':            //left
                if(player%20 != 0)
                    player--;
                if(player == ball)
                    ball--;
                defend++;
                break;
            case 'KeyS':
                if(player < 380 )   //down
                    player += 20;
                if(player == ball)
                    ball += 20;
                defend++;
                break;
            case 'KeyD':            //right
                if(player%20 != 19 )
                    player++;
                if(player == ball)
                    ball ++;
                defend++;
                break;
            case 'KeyW':            //up
                if(player > 19 )
                    player -= 20;
                if(player == ball)
                    ball -= 20;
                defend++;
                break;
        }
        if(defend > 371)
            defend = 368;
        location[0]=player;
        location[1]=ball;
        location[2]=defend;
        clearScreen();
        draw(location);
        gameEnd = check(location);
        if(gameEnd){
            clearScreen();
            location[1]=21;
            document.removeEventListener('keydown', function(event) {
            });
        }
    });
}

function clearScreen(){    
    var divs = document.querySelectorAll("div");
    for(let i=0; i<divs.length; i++){
        if(i>379 || i<20 || i%20 == 0 || i%20 == 19){
            if(i>=388 && i<=391)
                divs[i].className = 'bdiv';
            else
                divs[i].className = 'wdiv';
        }
        else
            divs[i].className = 'gdiv';
    }
}

function initilize(){   
    var divs = document.querySelectorAll("div");
    var location = [];
    let player = 29;
    let ball = 49;
    let defend = 369;
    divs[player].className = 'rdiv';
    location.push(player);
    divs[ball].className = 'balldiv';
    location.push(ball);
    divs[defend].className = 'bdiv';
    location.push(defend);
    return location;
}

function draw(location){
    var divs = document.querySelectorAll("div");
    divs[location[0]].className = 'rdiv';
    divs[location[1]].className = 'balldiv';
    divs[location[2]].className = 'bdiv';
}

function check(location){
    var ball = location[1];
    var defend = location[2];

    if ((ball>379 || ball<20 || ball%20 == 0 || ball%20 == 19)){
        if(ball>=388 && ball<=391)
            window.alert("Goal!!! You win. referesh to start a new game");
        else
            window.alert("Out of bounds... referesh to start a new game");
        return true;
    }
    else if(ball == defend){
        window.alert("Defender has the ball. You lose. referesh to start a new game");
        return true;
    }
    else
        return false;
}