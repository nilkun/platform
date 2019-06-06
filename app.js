import Viewport from "../../shared/engine/Viewport.js"
import AssetsManager from "../../shared/engine/AssetsManager.js"
import Player from "./objects/Player.js";
import enums from "./Enums.js";
import Level from "./Level.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";

const viewport = new Viewport(640, 400);
const renderer = new Renderer(viewport);
const assets = new AssetsManager;

viewport.init();


const doit = (e) => {
    // gravity();
    switch(e.key) {
        case "ArrowUp":
            player.move(enums.UP);
            break;        
        case "ArrowDown":
            player.move(enums.DOWN);
            break;        
        case "ArrowLeft":
            player.move(enums.LEFT);
            break;        
        case "ArrowRight":
            player.move(enums.RIGHT);
            break;
    }
    // player.update()
    viewport.clear();
    renderer.camera.update();
    renderer.draw();

}

window.addEventListener("keydown", (e) => doit(e));

const createTexture = (image) => {
    let texture = document.createElement("canvas");
    texture.width = image.width;
    texture.height = image.height;
    texture.drawImage(image, 0, 0);
}

const loaded = () => {
    player.sprite.data = assets.images[0];
    level.sprite.data = assets.images[0];
    renderer.objects.push(player);
    renderer.objects.push(level);
    renderer.draw();
}

assets.addImg("./tiles.png");
assets.initialize(loaded);

const originalGravity = .002;
const gravity = () => {
    const elapsedTime = 1;
    player.velocity.y += .5 * originalGravity * elapsedTime * elapsedTime;
}

const level = new Level;
const player = new Player;
player.level = level.tile;
renderer.camera.target = player.position;
renderer.camera.update();
