class Sprite {
    constructor({ position, imageSrc, scale = 1, frames = 1, offset = {x: 0, y: 0}}){
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.frames = frames
        this.currFrame = 0
        this.framesPassed = 0
        this.framesHold = 13
        this.offset = offset
    }

    draw() {
        c.drawImage(
            this.image,
            this.currFrame * (this.image.width / this.frames),
            0,
            this.image.width / this.frames,
            this.image.height,
            this.position.x - this.offset.x, this.position.y - this.offset.y, (this.image.width / this.frames) * this.scale, this.image.height * this.scale)
    }

    animation(){
        this.framesPassed++

        if(this.framesPassed % this.framesHold === 0) {    
            if(this.currFrame < this.frames - 1){
                this.currFrame++            
            } else {
                this.currFrame = 0
            }
        }
    }

    update(){
        this.draw()
        this.animation()
    }
}


class Character extends Sprite{
    constructor({position, velocity, color = 'green', imageSrc, scale = 1, frames = 1, offset = {x: 0, y: 0}, sprites}){
        super({
            position, 
            imageSrc, 
            scale, 
            frames, 
            offset,
        })
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
        this.currFrame = 0
        this.framesPassed = 0
        this.framesHold = 13
        this.sprites = sprites

        for(const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src =  sprites[sprite].imageSrc
        }
    }

    /*
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //drawing the attack
        if(this.isAttacking){
            c.fillStyle = 'blue'
            c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        }
    }
*/

    update() {
        this.draw()
        this.animation()
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

    switchS(sprite){
        switch(sprite){
            case 'idle':
                if(this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.frames = this.sprites.idle.frames                    
                }
                break
            case 'run':
                if(this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image
                    this.frames = this.sprites.run.frames
                }
                break
            case 'jump':
                if(this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image
                    this.frames = this.sprites.jump.frames                    
                }
                break
        }
    }

    theattack(){
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }


}



