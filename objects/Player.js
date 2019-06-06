import enums from "../Enums.js";
import Vector from "../../../shared/engine/Vector.js";


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
        this.velocity = new Vector(0.1, 0.1);
        this.sprite = new Sprite(8, 0, 8, 16, 0);
        this.level; // Pointer to current level layout
    }
    render(callback) {
        callback(this.sprite, this.position, this.scale);
    }
    // render(renderer, offset, tileSize) {
    //     renderer.drawImage(
    //         this.sprite,
    //         8, 0, 8, 16,
    //         tileSize * (this.position.x), // - offset.x), 
    //         tileSize * (this.position.y), // - offset.y), 
    //         tileSize * this.scale.x, 
    //         tileSize * this.scale.y,
    //     );
    // }

    // render(renderer, offset, tileSize) {
    //     const object = this;
    //     renderer.drawImage(
    //         object.sprite.data,
    //         object.sprite.x, object.sprite.y, object.sprite.width, object.sprite.height,
            
    //         tileSize * (this.position.x), // - offset.x), 
    //         tileSize * (this.position.y), // - offset.y), 
    //         tileSize * object.scale.x, 
    //         tileSize * object.scale.y,
    //     );
    // }

    isNotLegal() {
        // if(this.level[Math.floor(object.position.y)][Math.floor(object.position.x)] === 1
        //     || this.level[Math.floor(object.position.y + object.size.y)][Math.floor(object.position.x)] === 1
        //     || this.level[Math.floor(object.position.y)][Math.floor(object.position.x + object.size.x)] === 1
        //     || this.level[Math.floor(object.position.y + object.size.y)][Math.floor(object.position.x + object.size.x)] === 1
        // ) return false;
        // return true;
        console.log(Math.floor(this.position.y))
        return (this.level[Math.floor(this.position.y)][Math.floor(this.position.x)]
            || this.level[Math.floor(this.position.y + this.scale.y)][Math.floor(this.position.x)]
            || this.level[Math.floor(this.position.y)][Math.floor(this.position.x + this.scale.x)]
            || this.level[Math.floor(this.position.y + this.scale.y)][Math.floor(this.position.x + this.scale.x)]
        )
    }

    update(gravity) {
        this.position.y += .1;
        if(this.isNotLegal()) this.position.y -= .1;
    }

    move(direction) {
        switch(direction) {
            case enums.UP:
                this.position.y -= this.velocity.y;
                if(this.isNotLegal()) this.position.y = Math.ceil(this.position.y);
                break;            
            case enums.DOWN:
                this.position.y += this.velocity.y;
                break;            
            case enums.LEFT:
                this.position.x -= this.velocity.x;
                if(this.isNotLegal()) this.position.x = Math.ceil(this.position.x);
                break;            
            case enums.RIGHT:
                this.position.x += this.velocity.x;
                if(this.isNotLegal()) this.position.x = Math.ceil(this.position.x) - this.scale.x - .001;
                break;
        }
        if(this.isNotLegal()) this.position.y = Math.ceil(this.position.y) - this.scale.y - .001;

    }
}
