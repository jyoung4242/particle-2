import { Vector } from './ParticleSystem.js';

let snowParticleOptions = {
    texture: ['../assets/snowflake1.png', '../assets/snowflake2.png', '../assets/snowflake3.png'], //object for spritesheets, string for static image, or array of strings of images
    animation: false,
    isLiving: true,
    loop: true,
    size: [
        { x: 25, y: 25 },
        { x: 15, y: 15 },
        { x: 20, y: 20 },
        { x: 10, y: 10 },
        { x: 30, y: 30 },
    ], //function, vector, array of vectors
    angle: 0,
    angleVelocity: [-1, -0.5, -0.25, 0, 0.25, 0.5, 1], //array, number, function
    velocity: function (a, p, d, s) {
        let x, y;
        let arry = {
            10: 0.35,
            15: 0.4,
            20: 0.5,
            25: 0.6,
            30: 0.7,
        };
        y = arry[s.x];
        x = Math.sin(degrees_to_radians(a)) / 2;
        return { x: x, y: y };
    }, //function, vector, array of vectors
    position: new Vector(), //function, vector, array of vectors
    clipString: '',
    blendStrength: 100, //opacity of innerdiv
    lifespan: 32, //int, array, function
    parentElement: 'divworld',
    emitterLabel: 'snowfall',
    zindex: 2,
    gravity: 0, //int, array, function
    transforms: {}, // "param": {time: {start: 0 end: 0}},{values: {start: 0, end: 0}};
};

export let snowEmitterOptions = {
    emitterLabel: 'snowfall',
    numParticles: 600,
    burstCount: 1,
    emittingLocation: new Vector(50, 50),
    loop: true,
    enable: false,
    shape: 'rectangle', // circle, rectangle
    region: 'area', //area|edge
    size: { x: '100%', y: 5 },
    position: new Vector(0, 0),
    emitRate: 50,
    particleOnCreate() {},
    particleOnDestroy() {},
    initialVelocityTransform() {},
    particleOptions: snowParticleOptions,
    texture: {},
    parentElement: 'divworld',
    zindex: 1,
};

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}
