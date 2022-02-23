import { Vector, Sequence } from '../ParticleSystem.js';
import smokeball from '../assets/smoke.png';
import fireball from '../assets/fire.png';

let animationFrameRate = 0.15;
let smokeAnimationSequence = new Sequence('0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44', true, animationFrameRate);

//********************************* */
//angle params (p,d,l,s)
//velocity params (a,p,d,l,s)
//zindex params (v,a,p,d,l,s)
//********************************* */
let smokeParticleOptions = {
    //general purpose params
    parentElement: 'divworld',
    emitterLabel: 'smoke',
    isLiving: true,
    loop: true,
    size: [
        { x: 50, y: 50 },
        { x: 60, y: 60 },
        { x: 40, y: 40 },
        { x: 80, y: 80 },
        { x: 75, y: 75 },
    ],
    lifespan: [7, 7.25, 8.5, 8.75, 9, 9.5],

    //positional and behavioral params
    position: new Vector(),
    angle: 0,
    angleVelocity: [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2],
    velocity: function (a, p, d, l, s) {
        let x;
        x = Math.sin(degrees_to_radians(a) / 40);
        return { x: x, y: -1 };
    },
    zindex: 2,
    gravity: 0,

    //animation and texture params
    texture: smokeball,
    animation: true,
    animationObject: {
        framePosition: new Vector(0, 0),
        frameSize: new Vector(256, 256),
        numRows: 7,
        numCols: 7,
        sequence: smokeAnimationSequence,
    },
    clipString: '',
    blendStrength: 50,

    //transforms
    transforms: {
        0: { type: 'opacity', time: { start: 0.2, end: 1 }, values: { start: 1, end: 0 } },
        1: { type: 'size', time: { start: 0.25, end: 1 }, values: { start: { x: 1, y: 1 }, end: { x: 4, y: 4 } } },
        2: { type: 'opacity', time: { start: 0, end: 0.2 }, values: { start: 1, end: 1 } },
    },
};

let fireParticleoptions = {
    //general purpose params
    parentElement: 'divworld',
    emitterLabel: 'fire',
    isLiving: true,
    loop: true,
    size: [
        { x: 25, y: 25 },
        { x: 15, y: 15 },
        { x: 20, y: 20 },
        { x: 10, y: 10 },
    ],
    lifespan: [0.75, 1.0, 0.5, 1.25, 1.5, 1.75],

    //positional and behavioral params
    position: new Vector(),
    angle: 0,
    angleVelocity: [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2],
    velocity: function (a, p, d, l, s) {
        let x;
        x = 1.5 * Math.sin(degrees_to_radians(a * 2) / 6);
        return { x: x, y: -1 };
    },
    zindex: 2,
    gravity: 0,

    //animation and texture params
    texture: fireball,
    animation: false,
    animationObject: {},
    clipString: '',
    blendStrength: 50,

    //transforms
    transforms: {
        0: { type: 'size', time: { start: 0.8, end: 1 }, values: { start: { x: 1, y: 1 }, end: { x: 0.2, y: 0.2 } } },
        1: { type: 'size', time: { start: 0, end: 0.8 }, values: { start: { x: 1.1, y: 1.1 }, end: { x: 1.1, y: 1.1 } } },
    },
};

export let smokeEmitter = {
    //general purpos params
    emitterLabel: 'smoke',
    parentElement: 'divworld',
    shape: 'rectangle', // circle, rectangle
    region: 'area', //area|edge
    size: { x: 30, y: 25 },
    position: new Vector(550, 450),
    emittingPoint: new Vector(0, 0),
    texture: '',
    zindex: 1,
    lifespan: -1,

    //emission params
    numParticles: 400,
    loop: true,
    enable: false,
    emitRate: 0.05,
    burstGap: 0,
    burstCount: 1,

    //passed functions
    particleOnCreate() {},
    particleOnDestroy() {},
    particleOptions: smokeParticleOptions,
};

export let fireEmitter = {
    //general purpos params
    emitterLabel: 'fire',
    parentElement: 'divworld',
    shape: 'rectangle', // circle, rectangle
    region: 'area', //area|edge
    size: { x: 49, y: 25 },
    position: new Vector(565, 570),
    emittingPoint: new Vector(0, 0),
    texture: '',
    zindex: 1,
    lifespan: -1,

    //emission params
    numParticles: 50,
    loop: true,
    enable: false,
    emitRate: 0.02,
    burstGap: 0,
    burstCount: 1,

    //passed functions
    particleOnCreate() {},
    particleOnDestroy() {},
    particleOptions: fireParticleoptions,
};

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}
