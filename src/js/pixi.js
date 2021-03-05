import * as PIXI from 'pixi.js'
import { Sprite } from 'pixi.js';
import cloud from '/images/cloud.jpg';
// console.log(PIXI)

let app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight});
document.body.appendChild(app.view);
var image = new PIXI.Sprite.from("../images/2.jpg");
image.width = window.innerWidth / 2;
image.height = window.innerHeight;
app.stage.addChild(image);

let displacementSprite = new PIXI.Sprite.from("../images/cloud.jpg");
let displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;


image.interactive = true;
image.click = () => {
    app.stage.addChild(displacementSprite);
    app.stage.filters = [displacementFilter];
    console.log(displacementSprite.x < 300, displacementSprite.x)
    if (displacementSprite.x < 300) {
        displacementSprite.x += 1;
        displacementSprite.y += 1;
        app.ticker.add(() => {
            displacementSprite.x += 2;
            displacementSprite.y += 2;
        })
    } else {
        displacementSprite.x += 0;
        displacementSprite.y += 0;
        app.ticker.add(() => {
            displacementSprite.x += 0;
            displacementSprite.y += 0;
        })
    }
}


image.mouseout = () => {
    app.stage.removeChild(displacementSprite)
    app.stage.filters = []

}
