import game from "./Settings.js";
import Camera from "./Camera.js";

export default class Renderer {
    constructor(viewport) {
        this.renderer = viewport.context;
        this.objects = [];
        this.camera = new Camera;
    }

    draw() {
        this.objects.forEach(object => {
            object.render(this.render.bind(this), this.camera);
        })
    }

    render(
        sprite, 
        position, 
        scale = { x: 1, y: 1 } 
    ) {
        this.renderer.drawImage(
            sprite.data,

            sprite.x, 
            sprite.y, 
            sprite.width, 
            sprite.height,
            
            Math.floor(game.TILESIZE * position.x),
            Math.floor(game.TILESIZE * position.y),
            Math.floor(game.TILESIZE * scale.x), 
            Math.floor(game.TILESIZE * scale.y),
        );
    }
};

const renderBox = (x, y) => {
    const tPos = { x: 16, y: 0, width: 16, height: 16 };
    renderer.drawImage(
        assets.images[0],
        tPos.x, tPos.y, tPos.width, tPos.height, 
        x, y, tileSize, tileSize, 
    );
}