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