const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.6

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const player = new Character({
    position: {
    x: 0,
    y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    offset: {
        x: 0,
        y: 0
    }
}) 

const enemy = new Character({
    position: {
    x: 500,
    y: 200,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    color : 'red',
    offset: {
        x: -100,
        y: 0
    }
}) 

console.log(player);

const keys = {
    a : {
        pressed: false
    },
    d : {
        pressed: false
    },
    w : {
        pressed: false
    },
    ArrowRight : {
        pressed: false
    },
    ArrowLeft : {
        pressed: false
    },
    ArrowUp : {
        pressed: false
    },
}

function rectangularCollision({rectangle1, rectangle2}){
    return(
        rectangle1.hitbox.position.x + rectangle1.hitbox.width >= rectangle2.position.x && 
        rectangle1.hitbox.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.hitbox.position.y + rectangle1.hitbox.height >= rectangle2.position.y && 
        rectangle1.hitbox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function determineWinner({player, enemy}){
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if(player.health === enemy.health){
        document.querySelector('#displayText').innerHTML = 'Tie'
    }   
    else if(player.health> enemy.health){
        document.querySelector('#displayText').innerHTML = 'Player 1 wins'
    }   
    else if(player.health < enemy.health){
        document.querySelector('#displayText').innerHTML = 'Player 2 wins' 
    }
}

let timer = 60
let timerId
function decreasetimer(){
    if(timer > 0) {
        timerId = setTimeout(decreasetimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if(timer === 0){ 
        determineWinner({player, enemy, timerId})
    }
}
decreasetimer()

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //player moves
    if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5
    } else if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5
    }

    //enemy moves
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -5
    } else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 5
    }

    //does attack hit?
    if(rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) && 
    player.isAttacking){
        player.isAttacking = false
        enemy.health -=20
        document.querySelector('#enemyhealth').style.width = enemy.health + '%'
    }
    if(rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) && 
    enemy.isAttacking){
        enemy.isAttacking = false
        player.health -=20
        document.querySelector('#playerhealth').style.width = player.health + '%'
    }

    if(enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId})
    }

}
animate()

window.addEventListener('keydown', (event) => {
    //console.log(event.key)
    switch(event.key){
        //player keydown
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break;
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break;
        case 'w':
            player.velocity.y = -13
            break;
        case 'f':
            player.theattack()
            break

        //enemy keyup
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break;
        case 'ArrowUp':
            enemy.velocity.y = -13
            break;
        case 'ArrowDown':
            enemy.isAttacking = true
            break
    }
    //console.log(event.key);
}) 
window.addEventListener('keyup', (event) => {
    switch(event.key){
        //player keyup
        case 'd':
            keys.d.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break; 
        case 'w':
            keys.w.pressed = false
            break;
        //enemy keyup
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;
    }
    //console.log(event.key);
})