import enums from "../Enums.js";
import Vector from "../../shared/engine/Vector.js";

class Sprite {
    constructor(x, y, w, h, data) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.data = data;
    }
}

export default class Player {
    constructor() {
        this.position = new Vector(7, 5);
        this.scale = new Vector(0.4, 0.8);
        this.velocity = new Vector(0, 0);
        this.sprite = new Sprite(8, 0, 8, 16, 0);

        this.sprite = new Sprite(0, 16, 8, 16, 0);
        this.level; // Pointer to current level layout
        this.speed = .3;
        this.gravity = 1.2;
        this.isJumping = true;
        this.currentFrame = 0;
    }
    render(callback, camera) {
        const pos = new Vector(this.position.x - camera.offset.x, this.position.y - camera.offset.y)
        callback(this.sprite, pos, this.scale);
    }

    isNotLegal(x, y) {
        // console.log(x, y)
        return (this.level[Math.floor(y)][Math.floor(x)]
            || this.level[Math.floor(y + this.scale.y)][Math.floor(x)]
            || this.level[Math.floor(y)][Math.floor(x + this.scale.x)]
            || this.level[Math.floor(y + this.scale.y)][Math.floor(x + this.scale.x)]
        )
    }
    setFrame(delta) {
        this.currentFrame = (this.currentFrame + delta) % 4;
        // console.log(this.currentFrame)
        this.sprite.x = Math.floor(this.currentFrame) * 8; // = new Sprite(0, 16, 8, 16, 0);
    }

    jump() {
        if(!this.isJumping) {
            this.velocity.y = -2.5;
            this.isJumping = true;
        }
    }

    update(delta) {
        
        this.setFrame(delta);
        
        // There is always gravity
        this.velocity.y += this.gravity * delta;

        const tentativeX = this.position.x + this.velocity.x * delta;
        const tentativeY = this.position.y + this.velocity.y * delta;

        if(this.velocity.x < 0) {
            if(this.isNotLegal(tentativeX, this.position.y)) {
                this.position.x = Math.floor(this.position.x);
                this.velocity.x = 0; // bouncy 
            }
            else {
                this.position.x = tentativeX;
            }            
        }
        else if(this.velocity.x > 0) {
            this.position.x = 
                this.isNotLegal(tentativeX, this.position.y)
                ? Math.ceil(this.position.x) - this.scale.x - .001
                : tentativeX;
        }

        if(this.velocity.y < 0) {
            this.position.y =
                this.isNotLegal(this.position.x, tentativeY)
                ? Math.floor(this.position.y)
                : tentativeY;
        }
        if(this.velocity.y > 0) {
            if(this.isNotLegal(this.position.x, tentativeY)) {
                this.position.y = Math.ceil(this.position.y) - this.scale.y - .001
                this.velocity.y = 0;
                this.isJumping = false;
            }
            else{
                this.position.y = tentativeY;
            }
        }
    }

    move(direction) {
        switch(direction) {
            case enums.UP:
                this.velocity.y = this.velocity.y === -this.speed ? 0 : -this.speed;
                break;            
            case enums.DOWN:
                this.velocity.y = this.velocity.y === this.speed ? 0 : this.speed;
                break;            
            case enums.LEFT:
                this.velocity.x = this.velocity.x === -this.speed ? 0 : -this.speed;
                break;            
            case enums.RIGHT:
                this.velocity.x = this.velocity.x === this.speed ? 0 : this.speed;
                break;
        }
    }
}
