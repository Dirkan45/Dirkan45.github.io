window.addEventListener("DOMContentLoaded",function(){
    generateDiv();
    startGame();
})
//generate divs for the board
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
    //event listener for user pressing the key
    document.addEventListener('keydown', function(event) {          
        // Set a direction for each code
        switch (event.code) {
            case 'KeyA':            //left
                if(player%20 != 0)
                    player--;
                if(player == ball)  
                    ball--;         //kick ball left
                defend++;
                break;
            case 'KeyS':
                if(player < 380 )   //down
                    player += 20;
                if(player == ball)
                    ball += 20;     //kick ball down
                defend++;
                break;
            case 'KeyD':            //right
                if(player%20 != 19 )
                    player++;
                if(player == ball)
                    ball ++;        //kick ball right
                defend++;
                break;
            case 'KeyW':            //up
                if(player > 19 )
                    player -= 20;
                if(player == ball)
                    ball -= 20;     //kick ball UP
                defend++;
                break;
        }
        if(defend > 371)            //defender at the right end of the goal
            defend = 368;           //shif the defender to the left
        location[0]=player;
        location[1]=ball;
        location[2]=defend;
        clearScreen();
        draw(location);
        gameEnd = check(location);
        if(gameEnd){
            clearScreen();
            document.removeEventListener('keydown', function(event) {
            });
        }
    });
}
//clear screen to display ground, boundary, and goal only
function clearScreen(){    
    var divs = document.querySelectorAll("div");
    for(let i=0; i<divs.length; i++){
        if(i>379 || i<20 || i%20 == 0 || i%20 == 19){   //boundary
            if(i>=388 && i<=391)                        //goal
                divs[i].className = 'bdiv';
            else
                divs[i].className = 'wdiv';
        }
        else                                             //ground
            divs[i].className = 'gdiv';
    }
}
//initilize postion for player, ball, and defender
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
//display updated postion of player, ball, and defender
function draw(location){
    var divs = document.querySelectorAll("div");
    divs[location[0]].className = 'rdiv';
    divs[location[1]].className = 'balldiv';
    divs[location[2]].className = 'bdiv';
}
//check if the game is end
function check(location){
    var ball = location[1];
    var defend = location[2];

    if ((ball>379 || ball<20 || ball%20 == 0 || ball%20 == 19)){            //on the boundary
        if(ball>=388 && ball<=391)                                          //at the goal
            window.alert("Goal!!! You win. referesh to start a new game");
        else
            window.alert("Out of bounds... referesh to start a new game");
        return true;
    }
    else if(ball == defend){                                                   //defender has the ball
        window.alert("Defender has the ball. You lose. referesh to start a new game");
        return true;
    }
    else
        return false;
}