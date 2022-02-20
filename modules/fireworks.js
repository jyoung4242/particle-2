import { divParticle } from '../script.js';
import { Vector } from './vector.js';

let myE;

let fireworksParticleOptions = {
    dirction: 0,
    texture: '', //object for spritesheets, string for static image, or array of strings of images
    animation: false,
    isLiving: true,
    loop: false,
    size: { x: 5, y: 5 }, //function, vector, array of vectors
    angle: 0,
    angleVelocity: 0, //array, integer, function
    velocity: function (a, p, d, s) {
        let x, y;

        if (this.direction == 1) x = 1;
        else x = -1;
        //find percentage of time of lifespan, mulitply
        let frameStep = (d * 3000) / 16;
        y = -6 + frameStep * 0.01;

        return { x: x, y: y };
    }, //function, vector, array of vectors
    position: new Vector(), //function, vector, array of vectors
    clipString: 'circle(60%)',
    blendStrength: 10, //opacity of innerdiv
    lifespan: 3, //int, array, function
    parentElement: 'divworld',
    emitterLabel: 'fireworks',
    emitterID: '',
    particleID: '',
    zindex: 2,
    gravity: 0.01, //int, array, function
    transforms: {
        color: { time: { start: 0, end: 1 }, values: { start: '#C63347', end: '#f5e028' } },
    }, // "param": {time: {start: 0 end: 0}},{values: {start: 0, end: 0}};
};

let burstParticleOptions = {
    startingAngle: 0,
    startcolor: '',
    stopcolor: '',
    texture: '', //object for spritesheets, string for static image, or array of strings of images
    animation: false,
    isLiving: true,
    loop: false,
    size: { x: 5, y: 5 }, //function, vector, array of vectors
    angle: 0,
    angleVelocity: 0, //array, integer, function
    velocity: function (a, p, d, s) {
        let magnitude = 6;
        let x, y;
        if (this.startingAngle) {
            //console.log(`angle before components: ${this.startingAngle}`);
            x = magnitude * Math.cos(this.startingAngle);
            y = magnitude * Math.sin(this.startingAngle);
            //console.log(`starting vector after calculation: x ${x}, y ${y}`);
            let frameStep = (d * 3000) / 16;
            y += frameStep * 0.01;
        } else return { x: 0, y: 0 };

        return { x: x, y: y };
    }, //function, vector, array of vectors
    position: new Vector(), //function, vector, array of vectors
    clipString: 'circle(60%)',
    blendStrength: 5, //opacity of innerdiv
    lifespan: 0.75, //int, array, function
    parentElement: 'divworld',
    emitterLabel: 'burst',
    emitterID: '',
    particleID: '',
    zindex: 2,
    gravity: 0, //int, array, function
    transforms: {
        color: {
            time: { start: 0, end: 1 },
            values: {
                start: function () {
                    let c = Math.floor(Math.random() * 16777215).toString(16);

                    return '#' + c;
                },
                end: function () {
                    let c = Math.floor(Math.random() * 16777215).toString(16);
                    return '#' + c;
                },
            },
        },
        opacity: { time: { start: 0.5, end: 1 }, values: { start: 1, end: 0 } },
    }, // "param": {time: {start: 0 end: 0}},{values: {start: 0, end: 0}};
};

export let burstEmitterOptions = {
    parentElement: 'divworld',
    emitterLabel: 'burst',
    emitterID: '',
    numParticles: 100,
    burstCount: 100,
    emittingLocation: new Vector(0, 0),
    loop: false,
    lifespan: 6,
    enable: false,
    shape: 'circle', // circle, rectangle
    region: 'edge', //area|edge
    size: { x: 10, y: 10 },
    position: new Vector(0, 0),
    emitRate: 1,
    particleOnCreate: part => {
        //based on position, set initial angle and velocity
        const cp = new Vector(myE.position.x + myE.size.x / 2, myE.position.y + myE.size.y / 2);
        let tempV = part.position.subtract(cp);
        let rads = Math.atan2(tempV.y, tempV.x);
        part.startingAngle = Math.atan2(tempV.y, tempV.x);
    },
    particleOnDestroy() {},
    initialVelocityTransform() {},
    particleOptions: burstParticleOptions,
    texture: {},
    zindex: 1,
};

export let fireworksEmitterOptions = {
    parentElement: 'divworld',
    emitterLabel: 'fireworks',
    emitterID: '',
    numParticles: 4,
    burstCount: 1,
    emittingLocation: {},
    loop: true,
    enable: false,
    shape: 'rectangle', // circle, rectangle
    region: 'area', //area|edge
    size: { x: '100%', y: 5 },
    position: new Vector(0, 695),
    emitRate: 2000,
    particleOnCreate: part => {
        if (Math.random() * 5 > 2.5) {
            part.direction = 1;
        } else {
            part.direction = -1;
        }
    },
    particleOnDestroy: part => {
        burstEmitterOptions.position = part.position;
        myE = divParticle.addEmitter(burstEmitterOptions);
        myE.enableEmitter();
    },
    initialVelocityTransform() {},
    particleOptions: fireworksParticleOptions,
    texture: {},
    zindex: 1,
};
