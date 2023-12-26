const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 2500
canvas.height = 900

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.6
class Sprite{
    constructor({position, velocity, color = 'green'}){
        this.position = position
        this.velocity = velocity
        this.height = 250
        this.width = 100
        this.lastKey

        this.hitbox = {
            position: this.position,
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
        if(this.isAttacking){
            c.fillStyle = 'blue'
            c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        }
    }

    update() {
        this.draw()
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
    color : 'red'
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
    if(player.hitbox.position.x + player.hitbox.width >= enemy.position.x && player.hitbox.position.x <= enemy.position.x + enemy.width && player.hitbox.position.y + player.hitbox.height >= enemy.position.y && player.hitbox.position.y <= enemy.position.y + enemy.height && player.isAttacking){
        player.isAttacking = false
        console.log('hello');
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