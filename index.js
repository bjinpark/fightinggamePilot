const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 2500
canvas.height = 900

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.6
class Sprite{
    constructor({position, velocity, color = 'green', offset}){
        this.position = position
        this.velocity = velocity
        this.height = 250
        this.width = 100
        this.lastKey

        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 200,
            height: 75
        }
        this.color = color
        this.isAttacking
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //drawing the attack
        //if(this.isAttacking){
            c.fillStyle = 'blue'
            c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        //}
    }

    update() {
        this.draw()
        this.hitbox.position.x = this.position.x + this.hitbox.offset.x
        this.hitbox.position.y = this.position.y
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }
        else{
            this.velocity.y += gravity
        }

        // if(this.position.x + this.width + this.velocity.x >= canvas.width + this.width){
        //     this.velocity.x = 0
        // }
    }

    theattack(){
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}

const player = new Sprite({
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

const enemy = new Sprite({
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

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
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
        console.log('hello');
    }
    if(rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) && 
    enemy.isAttacking){
        enemy.isAttacking = false
        console.log('enemy');
    }

}
animate()

window.addEventListener('keydown', (event) => {
    console.log(event.key)
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
            player.velocity.y = -17.5
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
            enemy.velocity.y = -17.5
            break;
        case 'ArrowDown':
            enemy.isAttacking = true
            break
    }
    console.log(event.key);
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
    console.log(event.key);
})