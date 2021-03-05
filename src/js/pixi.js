import * as PIXI from 'pixi.js'
import { Sprite } from 'pixi.js';
import cloud from '/images/cloud.jpg';
import ripple from '/images/ripple.png';
import two from '/images/2.jpg';

//DEFINE APPLICATION
const canvas = document.getElementById('mycanvas');
// const app = new PIXI.Application({
//     view: canvas, width: window.innerWidth, height: window.innerHeight
// })

// //DEFINE THE IMAGE
// // const texture = PIXI.Texture.from('../images/2.jpg');
// // const img = new PIXI.Sprite(texture);
// var img = new PIXI.Sprite.from("../images/2.jpg");
// //IMG PROPERTIES
// img.width = 320; img.height = 400;
// img.x = app.renderer.width / 2;
// img.y = app.renderer.height / 2;
// img.anchor.x = 0.5; img.anchor.y = 0.5;

// //ADD TO STAGE
// app.stage.addChild(img);

// //RUN ANIMATION
// // app.ticker.add(animate)
// function animate() {
//     img.rotation +=0.1
// }


// let w = window.innerWidth;
// let h = window.innerHeight;

// //DEFINE APPLICATION & STAGE
// const renderer = new PIXI.Renderer({
//    resolution: window.devicePixelRatio, autoDensity: true, view: canvas, width: w, height: h,
// })
// const stage = new PIXI.Container();

// //RESIZE FUNCTION
// window.addEventListener('resize', resize);
// function resize() {
//     w = window.innerWidth;
//     h = window.innerHeight;
//     renderer.resize(w, h)
// }

// //DEFINE THE IMG 
// var img = new PIXI.Sprite.from("../images/2.jpg");
// //IMG PROPERTIES
// img.width = 320; img.height = 400;
// //DUE TO RESIZE POSITIONING IS INSIDE ANIMATE FUNCITON
// img.anchor.x = 0.5; img.anchor.y = 0.5;

// //ADD TO STAGE
// stage.addChild(img);

// //RUN ANIMATION
// const ticker = new PIXI.Ticker();
// ticker.add(animate);
// ticker.start();
// function animate() {
//     // img.rotation += 0.1;
//     img.x = renderer.screen.width / 2;
//     img.y = renderer.screen.height / 2;
//     renderer.render(stage)
// }



// let w = window.innerWidth;
// let h = window.innerHeight;

// //DEFINE APPLICATION & STAGE
// const renderer = new PIXI.Renderer({
//    resolution: window.devicePixelRatio, autoDensity: true, view: canvas, width: w, height: h,
// })
// const stage = new PIXI.Container();

// //RESIZE FUNCTION
// window.addEventListener('resize', resize);
// function resize() {
//     w = window.innerWidth;
//     h = window.innerHeight;
//     renderer.resize(w, h)
// }

// //DEFINE THE IMG 
// var img = new PIXI.Sprite.from("../images/2.jpg");
// //IMG PROPERTIES
// img.width = 320; img.height = 400;
// //DUE TO RESIZE POSITIONING IS INSIDE ANIMATE FUNCITON
// img.anchor.x = 0.5; img.anchor.y = 0.5;

// //ADD TO STAGE
// stage.addChild(img);

// let filterMine = new PIXI.Sprite.from('../images/cloud.jpg');
// let dFilter = new PIXI.filters.DisplacementFilter(filterMine)
// filterMine.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
// stage.addChild(filterMine)
// stage.filters = [dFilter]


// //RUN ANIMATION
// const ticker = new PIXI.Ticker();
// ticker.add(animate);
// ticker.start();
// function animate() {
//     // img.rotation += 0.1;
//     filterMine.x += 2;
//     filterMine.scale.x = 6;
//     img.x = renderer.screen.width / 2;
//     img.y = renderer.screen.height / 2;
//     renderer.render(stage)
// }



var app = new PIXI.Application(window.innerWidth, window.innerHeight);
document.body.appendChild(app.view);

app.stage.interactive = true;
var posX, displacementSprite, displacementFilter, bg, vx, vy, posY;
var container = new PIXI.Container();
app.stage.addChild(container);

// setup()
PIXI.Loader.shared
    .add('ripple', '../images/ripple.png')
    .add('two', '../images/2.jpg')
    .load((loader, resources) => {setup(loader, resources)});
function setup(loader, resources) {
    posX = app.renderer.width / 2;
    posY = app.renderer.height / 2;
    displacementSprite = new PIXI.Sprite(resources.ripple.texture);
    //console.log(displacementSprite)
    displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
    displacementSprite.anchor.set(0.5);
    displacementSprite.x = app.renderer.width / 2;
    displacementSprite.y = app.renderer.height / 2;
    vx = displacementSprite.x;
    vy = displacementSprite.y;

    app.stage.addChild(displacementSprite);
    //console.log(app.stage)
    container.filters = [displacementFilter];
    displacementFilter.scale.x = 0.5;
    displacementFilter.scale.y = 0.5;

    let bg = new PIXI.Sprite(resources.two.texture);
    bg.width = app.renderer.width;
    bg.height = app.renderer.height;
    container.addChild(bg);
    app.stage.on('mousemove', onPointerMove).on('touchmove', onPointerMove);
    loop();  
}


function onPointerMove(eventData) {
    posX = eventData.data.global.x;
    posY = eventData.data.global.y;
    console.log(eventData.data.global.y)
}


function map(n, start1, stop1, start2, stop2) {
    var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    return newval;
};

function loop() {
    console.log(vx, posX, displacementSprite.x)
    requestAnimationFrame(loop);
    vx += (posX - displacementSprite.x) * 0.045;
    displacementSprite.x = vx;
    var disp = Math.floor(posX - displacementSprite.x);
    if (disp < 0) disp = -disp;
    var fs = map(disp, 0, 500, 0, 120);
    disp = map(disp, 0, 500, 0.1, 0.6);
    displacementSprite.scale.x = disp;
    displacementFilter.scale.x = fs;
    
}


