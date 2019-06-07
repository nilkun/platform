import Viewport from "../shared/engine/Viewport.js"
import AssetsManager from "../shared/engine/AssetsManager.js"
import Player from "./objects/Player.js";
import enums from "./Enums.js";
import Level from "./Level.js";
import Renderer from "./Renderer.js";

const doit = (e) => {
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
        case " ":
            player.jump();
            break;
    }
}

const startGame = () => {
    player.sprite.data = assets.images[0];
    level.sprite.data = assets.images[0];
    renderer.objects.push(player);
    renderer.objects.push(level);
    window.requestAnimationFrame(gameLoop);
    renderer.draw();
}

const getDelta = () => {
    previousTime = currentTime;
    currentTime = Date.now();
    delta = .01 * (currentTime - previousTime);
}
const gameLoop = () => {
    getDelta();
    player.update(delta)
    viewport.clear();
    renderer.camera.update();
    renderer.draw();
    window.requestAnimationFrame(gameLoop);
}

const viewport = new Viewport(640, 400);
const renderer = new Renderer(viewport);
const assets = new AssetsManager;
const level = new Level;
const player = new Player;
let delta = 0;
let previousTime = Date.now();
let currentTime = Date.now();

window.addEventListener("keydown", (e) => doit(e));

player.level = level.tile;
renderer.camera.target = player.position;
renderer.camera.update();

viewport.init();
assets.addImg("./tiles.png");

assets.initialize(startGame);

