import game from "./Settings.js";

class Sprite {
    constructor(x, y, w, h, data) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.data = data;
    }
}

export default class Level {
    constructor() {
        this.tile = [
            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ], 
            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
            [ 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, ],
            [ 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, ],
            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ], 
        ];
        this.width = 16;
        this.height = 8;
        this.sprite = new Sprite(16, 0, 16, 16, 0);
    }

    getTile(x, y) {
        if(x < this.width && y < this.height && x >= 0 && y >= 0) {
            return this.tile[Math.floor(y)][Math.floor(x)];
        }
        return 0;
    }


    render(callback, camera) {
        for(let row = 0; row < game.ROWS + 1; row++) {
            for(let col = 0; col < game.COLUMNS + 1; col++) {             
                switch(this.getTile(
                    col + camera.offset.x,
                    row + camera.offset.y, 
                )) {
                    case 0:
                        break;
                    case 1: 
                        callback(
                            this.sprite,
                            { x: col - camera.offset.x%1, y: row  - camera.offset.y%1 }
                        );
                        // renderBox(  
                        //     Math.floor( tileSize * (col - (camera.offset.x%1))),

                        //     Math.floor( tileSize * row - (camera.offset.y%1) * tileSize )
                        // )
                        // renderer.fill();
                        break;
                } 
            }
        } 
    }   
}
