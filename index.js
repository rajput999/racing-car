const score = document.querySelector('.score');
const startscreen = document.querySelector('.startscreen');
const gameArea = document.querySelector('.gameArea');

document.addEventListener('keydown' , keyDown);
document.addEventListener('keyup' ,keyUp);
startscreen.addEventListener('click' , start);

let keys = {ArrowUp : false ,ArrowDown : false ,ArrowLeft : false , ArrowRight : false};
let player ={speed : 3};

function keyDown(e){
    e.preventDefault();
    // console.log(e.key);
    keys[e.key]= true;
    // alert('hii');
    // console.log(keys)
};

function keyUp(e){
    e.preventDefault();
    // console.log(e.key);
    // keys[e.key]= false;
    // console.log(keys);
    keys = {ArrowUp : false ,ArrowDown : false ,ArrowLeft : false , ArrowRight : false};
};

function movelines(){
    let roadline = document.querySelectorAll('.roadline');
    // console.log("move");
    roadline.forEach(function(item){
        if(item.y>=750){
            item.y=-150;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

function endgame(){
    player.start=false;
    startscreen.classList.remove('hide');
    
}

function movecar(car){
    let badcar = document.querySelectorAll('.badcar');
    badcar.forEach(function(item){

        if(collide(car , item)){
            endgame();

        }
        if(item.y>=750){
            item.y=-150;
            item.style.left = Math.floor(Math.random()*300)+"px";
        }
        
        item.y +=2*player.speed ;
        item.style.top = item.y + "px";
        
    })
}

function collide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    if(!((aRect.bottom<bRect.top) || (aRect.top>bRect.bottom) || 
    (aRect.right<bRect.left) || (aRect.left>bRect.right))){
    return true;
    }
}

function gameplay(){
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();


    if(player.start){
        movelines();
        movecar(car);

        if(keys.ArrowUp && player.y > (road.y + 60)){player.y -= player.speed +2};
        if(keys.ArrowDown && player.y < (road.height -90)){player.y += player.speed +2};
        if(keys.ArrowLeft && player.x > 0){player.x -= player.speed+2};
        if(keys.ArrowRight && player.x < (road.width - 50 )){player.x += player.speed+2};

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        
        // player.roadline += player.speed;
        // roadline.style.top =player.roadline + "px";
        console.log(player.score++);
        requestAnimationFrame(gameplay);
        // console.log("clicked");
        player.score++;
        score.innerText="Score : " + Math.floor(player.score/10);
    }
}

function start(){
    startscreen.classList.add('hide');
    gameArea.innerHTML="";

    player.start =true;
    player.score = 0;
    requestAnimationFrame(gameplay);

    let car = document.createElement('div');
    car.setAttribute('class','car');
    // car.innerText="hii";
    gameArea.appendChild(car);

    for(i=0;i<6;i++){
    let roadline =document.createElement('div');
    roadline.setAttribute('class','roadline');
    roadline.y=i*150;
    roadline.style.top = (roadline.y)+ "px";
    gameArea.appendChild(roadline);
    }

    for(i=0;i<3;i++){
        let badcar =document.createElement('div');
        badcar.setAttribute('class','badcar');
        badcar.y=-i*300;
        badcar.style.top = (badcar.y)+ "px";
        badcar.style.left = Math.floor(Math.random()*300)+"px";
        gameArea.appendChild(badcar);
    };

    // player.roadline = roadline.offsetTop;
    player.x = car.offsetLeft;
    player.y =car.offsetTop;
}
