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
        if(x < this.height && y < this.height) {
            // console.log("rendering:" , y, x);
            return this.tile[Math.floor(y)][Math.floor(x)];
        }
        console.log("OOB: ", x, y);
        return 0;
    }


    render(callback, camera) {
        let tile;
        for(let row = 0; row < game.ROWS; row++) {
            for(let col = 0; col < game.COLUMNS; col++) {             
                switch(tile = this.getTile(
                    row + camera.offset.x, 
                    col + camera.offset.y
                )) {
                    case 0:
                        break;
                    case 1: 
                        callback(
                            this.sprite,
                            { x: row, y: col }
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
