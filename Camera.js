import Vector from "../shared/engine/Vector.js";

export default class Camera {
    constructor() {
        this.topLeft = new Vector;
        this.target = new Vector(4, 6);
        this.screenSize = new Vector(640, 480);
        this.offset;
        const tileSize = 64;
        this.tilesPerScreen = new Vector(640 / tileSize, 400 / tileSize);
    }
    set(target) {
        this.target = target;
    }

    update() {
        this.offset = new Vector(this.target.x - this.tilesPerScreen.x / 2, this.target.y - this.tilesPerScreen.y / 2 );
        if(this.offset.x < 0) this.offset.x = 0;
        if(this.offset.y < 0) this.offset.y = 0;
    } 
}



class Sprite {
    constructor() {
        this.data;
        this.width;
        this.height;
        this.x;
        this.y;
    }
}