import Viewport from "../../shared/engine/Viewport.js"
import AssetsManager from "../../shared/engine/AssetsManager.js"
import Player from "./objects/Player.js";
import enums from "./Enums.js";



const platform = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    [ 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, ],
    [ 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ], 
];
console.log(platform);
const renderTile = (x, y, position) => {

}
// let Tile = {
//     x,
//     y,
// }

const viewport = new Viewport(640, 400);
viewport.init();

// const camera = 
const tileSize = 64;
const rows = (400 / tileSize) + 1;
const columns = (640 / tileSize) + 1;
const renderer = viewport.context;

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


class Camera {
    constructor() {
        this.topLeft = new Vector;
        this.target = new Vector(4, 6);
        this.screenSize = new Vector(640, 480);
        this.offset;
        // this.update();

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
        console.log(this.offset.x, this.offset.y)

        // this.tilesPerScreen.x * (this.target.x - this.tilesPerScreen.x / 2), 
        // this.tilesPerScreen.y * (this.target.y - this.tilesPerScreen.y / 2)
    }
}

const isLegal = (object) => {
    if(    platform[Math.floor(object.position.y)][Math.floor(object.position.x)] === 1
                || platform[Math.floor(object.position.y + object.size.y)][Math.floor(object.position.x)] === 1
                || platform[Math.floor(object.position.y)][Math.floor(object.position.x + object.size.x)] === 1
                || platform[Math.floor(object.position.y + object.size.y)][Math.floor(object.position.x + object.size.x)] === 1



        // || platform[Math.floor(object.position.y + object.size.y - .001)][Math.floor(object.position.x)] === 1
        // || platform[Math.floor(object.position.y)][Math.floor(object.position.x + object.size.x - .001)] === 1
        // || platform[Math.floor(object.position.y + object.size.y - .001)][Math.floor(object.position.x + object.size.x - .001)] === 1
    ) return false;
    return true;
}

// class Player {
//     constructor() {
//         this.position = new Vector(7, 5);
//         this.size = new Vector(0.4, 0.8);
//         this.velocity = new Vector(0.1, 0.1);
//     }
//     render(renderer, offset, scale) {
//         // renderer.fillStyle = "green";
//         // renderer.fillRect(
//         //     tileSize * (this.position.x - offset.x), 
//         //     tileSize * (this.position.y - offset.y), 
//         //     tileSize * this.size.x, 
//         //     tileSize * this.size.y);
//         renderer.drawImage(
//             assets.images[0],
//             8, 0, 8, 16,
//             tileSize * (this.position.x - offset.x), tileSize * (this.position.y - offset.y), tileSize * this.size.x, tileSize * this.size.y,
//             // tPos.x, tPos.y, tPos.width, tPos.height, 
//             // 0, 0, tPos.width, tPos.height, 
//         );

//     }
//     move(direction) {
//         switch(direction) {
//             case UP:
//                 this.position.y -= this.velocity.y;
//                 if(!isLegal(this)) this.position.y = Math.ceil(this.position.y);
//                 break;            
//             case DOWN:
//                 this.position.y += this.velocity.y;
//                 // if(!isLegal(this)) this.position.y = Math.floor(this.position.y) - 0.001;
//                 // if(!isLegal(this)) this.position.y = Math.ceil(this.position.y) - this.size.y - .001;
//                 break;            
//             case LEFT:
//                 this.position.x -= this.velocity.x;
//                 if(!isLegal(this)) this.position.x = Math.ceil(this.position.x);
//                 break;            
//             case RIGHT:
//                 this.position.x += this.velocity.x;                
//                 // if(!isLegal(this)) this.position.x = Math.floor(this.position.x) + this.size.x - 0.001;;
//                 if(!isLegal(this)) this.position.x = Math.ceil(this.position.x) - this.size.x - .001;
//                 break;
//         }
//         if(!isLegal(this)) this.position.y = Math.ceil(this.position.y) - this.size.y - .001;

//     }
// }



const assets = new AssetsManager;

const doit = (e) => {
    gravity();
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
    viewport.clear();
    renderer.beginPath()
    camera.update();
    renderWorld();
    player.render(renderer, camera.offset, tileSize);

}

window.addEventListener("keydown", (e) => doit(e));
const createTexture = (image) => {
    let texture = document.createElement("canvas");
    texture.width = image.width;
    texture.height = image.height;
    texture.drawImage(image, 0, 0);
}

const loaded = () => {
    // console.log("GELLO");
    // const texture = createTexture(assets.images[0]);
    // renderer.drawImage(texture, 0, 0)
    // renderer.drawImage(assets.images[0], 0, 0);
    // renderer.drawImage(assets.images[0], 0, 0, 128, 128);
    const xPos = { x: 8, y: 0, width: 8, height: 16 };
    const tPos = { x: 16, y: 0, width: 16, height: 16 };
    // renderer.drawImage(
    //     assets.images[0],
    //     tPos.x, tPos.y, tPos.width, tPos.height, 
    //     x, y, width, height
    // );
    player.sprite = assets.images[0];
    // renderer.drawImage(
    //     assets.images[0],
    //     tPos.x, tPos.y, tPos.width, tPos.height, 
    //     0, 0, tPos.width, tPos.height, 
    // );
}


assets.addImg("./tiles.png");
assets.initialize(loaded);

const originalGravity = .2;
const gravity = () => {
    const elapsedTime = 10;
    player.velocity.y += .5 * originalGravity * elapsedTime * elapsedTime;
}

const renderBox = (x, y) => {
    const tPos = { x: 16, y: 0, width: 16, height: 16 };
    renderer.drawImage(
        assets.images[0],
        tPos.x, tPos.y, tPos.width, tPos.height, 
        x, y, tileSize, tileSize, 
    );
}
console.log(rows, columns)
const renderWorld = () => {
    renderer.fillStyle = "pink";
    for(let row = 0; row < rows; row++) {
        for(let col = 0; col < columns; col++) {
            if(col + camera.offset.x < 16 && row + camera.offset.y < 8) {
               
                switch(platform[Math.floor(row + camera.offset.y)][Math.floor(col + camera.offset.x)]) {
                    case 0:
                        break;
                    case 1: 
                        renderBox(  
                            Math.floor( tileSize * col - (camera.offset.x%1) * tileSize ),
                            Math.floor( tileSize * row - (camera.offset.y%1) * tileSize )
                        )
                        // renderer.rect(
                        //     tileSize * col - (camera.offset.x%1) * tileSize,
                        //     tileSize * row - (camera.offset.y%1) * tileSize,
                        //     // col * tileSize - camera.offset.x * tileSize, 
                        //     // row * tileSize - camera.offset.y * tileSize, 
                        //     tileSize, 
                        //     tileSize);
                        renderer.fill();
                        break;
                }   
            }
        }
    }    
}


const camera = new Camera;
camera.topLeft = new Vector(0, 0)

const player = new Player;
camera.target = player.position;

camera.update();
renderWorld();
player.render(renderer, camera.offset, 1);

// const pixelSize = 24;
// context.font = pixelSize +"px serif";
// const width = context.measureText("text").width;
// const height = pixelSize * 3 / 4;
// context.fillText("Text", 200 - width, 200 + height);
// context.fillStyle = "black"
// context.fillRect(200, 200, 1, 1);
// console.log(viewport.canvas);

