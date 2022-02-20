import { Vector } from './vector.js';
import { Sequence } from './spritesheet.js';

let animationFrameRate = 0.15;
let smokeAnimationSequence = new Sequence('0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44', true, animationFrameRate);

let smokeParticleOptions = {
    texture: '../assets/smoke.png', //object for spritesheets, string for static image, or array of strings of images
    animation: true,
    animationObject: {
        framePosition: new Vector(0, 0),
        frameSize: new Vector(256, 256),
        numRows: 7,
        numCols: 7,
        sequence: smokeAnimationSequence,
    },
    isLiving: true,
    loop: true,
    size: [
        { x: 50, y: 50 },
        { x: 60, y: 60 },
        { x: 40, y: 40 },
        { x: 80, y: 80 },
        { x: 75, y: 75 },
    ], //function, vector, array of vectors
    angle: 0,
    angleVelocity: [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2], //array, integer, function
    velocity: function (a, p, d, s) {
        let x;
        x = Math.sin(degrees_to_radians(a) / 40);
        return { x: x, y: -1 };
    }, //function, vector, array of vectors
    position: new Vector(), //function, vector, array of vectors
    clipString: '',
    blendStrength: 50, //opacity of innerdiv
    lifespan: [7, 7.25, 8.5, 8.75, 9, 9.5], //int, array, function
    parentElement: 'divworld',
    emitterLabel: 'smoke',
    emitterID: '',
    particleID: '',
    zindex: 2,
    gravity: 0, //int, array, function
    transforms: {
        opacity: { time: { start: 0.1, end: 1 }, values: { start: 0.5, end: 0 } },
        size: { time: { start: 1, end: 3 }, values: { start: 0.2, end: 1 } },
    }, // "param": {time: {start: 0 end: 0}},{values: {start: 0, end: 0}};
};

let fireParticleoptions = {
    texture: '../assets/fire.png', //object for spritesheets, string for static image, or array of strings of images
    animation: false,
    isLiving: true,
    loop: true,
    size: [
        { x: 25, y: 25 },
        { x: 15, y: 15 },
        { x: 20, y: 20 },
        { x: 10, y: 10 },
    ], //function, vector, array of vectors
    angle: 0,
    angleVelocity: [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2], //array, integer, function
    velocity: function (a, p, d, s) {
        let x;
        x = Math.sin(degrees_to_radians(a) / 6);
        return { x: x, y: -1 };
    }, //function, vector, array of vectors
    position: new Vector(), //function, vector, array of vectors
    clipString: '',
    blendStrength: 50, //opacity of innerdiv
    lifespan: [1, 1.25, 1.5, 1.75, 2, 2.5], //int, array, function
    parentElement: 'divworld',
    emitterLabel: 'fire',
    emitterID: '',
    particleID: '',
    zindex: 1,
    gravity: 0, //int, array, function
    transforms: {
        opacity: { time: { start: 0.7, end: 1 }, values: { start: 0.8, end: 0 } },
        size: { time: { start: 0.5, end: 1 }, values: { start: 1, end: 0.2 } },
    }, // "param": {time: {start: 0 end: 0}},{values: {start: 0, end: 0}};
};

export let smokeEmitter = {
    emitterLabel: 'smoke',
    emitterID: '',
    numParticles: 400,
    burstCount: 1,
    emittingLocation: {},
    loop: true,
    enable: false,
    shape: 'rectangle', // circle, rectangle
    region: 'area', //area|edge
    size: { x: 30, y: 25 },
    position: new Vector(550, 450),
    emitRate: 0.5,
    particleOnCreate() {},
    particleOnDestroy() {},
    initialVelocityTransform() {},
    particleOptions: smokeParticleOptions,
    texture: '../assets/greensquare.png',
    parentElement: 'divworld',
    zindex: 1,
};

export let fireEmitter = {
    emitterID: '',
    emitterLabel: 'fire',
    numParticles: 50,
    burstCount: 1,
    emittingLocation: {},
    loop: true,
    enable: false,
    shape: 'rectangle', // circle, rectangle
    region: 'area', //area|edge
    size: { x: 49, y: 25 },
    position: new Vector(565, 570),
    emitRate: 0.2,
    particleOnCreate() {},
    particleOnDestroy() {},
    initialVelocityTransform() {},
    particleOptions: fireParticleoptions,
    texture: '../assets/greensquare.png',
    parentElement: 'divworld',
    zindex: 1,
};

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}
