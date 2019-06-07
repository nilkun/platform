import enums from "../Enums.js";
import Vector from "../../shared/engine/Vector.js";
 'use strict'
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
        // this.sprite = new Sprite(8, 0, 8, 16, 0);

        this.sprite = new Sprite(0, 16, 8, 16, 0);

        this.level; // Pointer to current level layout
        this.speed = .3;
        this.gravity = 1.2;
        this.isJumping = true;
        this.isWalking = enums.NO;
        this.currentFrame = 0;
        this.isFacing = enums.RIGHT;
    }
    render(callback, camera) {
        const pos = new Vector(this.position.x - camera.offset.x, this.position.y - camera.offset.y)
        callback(this.sprite, pos, this.scale, true);
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
        if(this.isWalking) {
            this.currentFrame = (this.currentFrame + delta) % 4;        
            this.sprite.x = Math.floor(this.currentFrame) * 8; // = new Sprite(0, 16, 8, 16, 0); 
            if(this.isFacing === enums.LEFT) this.sprite.x += 32;       
        }
        else if(this.isJumping) {                   
            this.sprite.x = 0;
            if(this.isFacing === enums.LEFT) this.sprite.x += 32;       
        }

    }

    jump() {
        if(!this.isJumping) {
            this.velocity.y = -2.5;
            this.isJumping = true;
        }
    }

    setWalking() {
        if(this.isJumping || this.velocity.x === 0) this.isWalking = enums.FALSE;
        else if(this.velocity > 0) {
            this.isWalking = enums.RIGHT;
        }
        else this.isWalking = enums.LEFT;
    }

    update(delta) {
        
        this.setFrame(delta);
        this.setWalking();
        
        // There is always gravity
        this.velocity.y += this.gravity * delta;

        const tentativeX = this.position.x + this.velocity.x * delta;
        const tentativeY = this.position.y + this.velocity.y * delta;

        if(this.velocity.x < 0) {
            if(this.isNotLegal(tentativeX, this.position.y)) {
                this.position.x = Math.floor(this.position.x);
                this.velocity.x = 0; // bouncy 
                this.isWalking = false;
            }
            else {
                this.position.x = tentativeX;
            }            
        }
        else if(this.velocity.x > 0) {
            if(this.isNotLegal(tentativeX, this.position.y)) {
                this.position.x = Math.ceil(this.position.x) - this.scale.x - .001;
                this.velocity.x = 0; // bouncy 
                this.isWalking = false;
            }
            else {
                this.position.x = tentativeX;
            }  
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
                if(this.velocity.x === -this.speed) {
                    this.velocity.x = 0;
                }
                else {
                    this.velocity.x = -this.speed;
                    this.isFacing = enums.LEFT;
                }
                break;            
            case enums.RIGHT:
                if(this.velocity.x === this.speed) {
                    this.velocity.x = 0;
                }
                else {
                    this.velocity.x = this.speed;
                    this.isFacing = enums.RIGHT;
                }
                break;
        }
    }
}
