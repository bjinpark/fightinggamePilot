class Character{
    constructor({position, velocity, color = 'green', offset}){
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 75
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
        this.health = 100
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
        this.hitbox.position.x = this.position.x + this.hitbox.offset.x
        this.hitbox.position.y = this.position.y
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if(this.position.y + this.height + this.velocity.y >= canvas.height - 80){
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


class Sprite {
    constructor({ position, imageSrc }){
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }

    update(){
        this.draw()
    }
}
