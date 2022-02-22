import { divParticle } from './script.js';
import { Vector } from '../ParticleSystem.js';

let myE;

//********************************* */
//angle params (p,d,l,s)
//velocity params (a,p,d,l,s)
//zindex params (v,a,p,d,l,s)
//********************************* */
let fireworksParticleOptions = {
    //userdefined param
    dirction: 0,

    //general purpose params
    parentElement: 'divworld',
    emitterLabel: 'fireworks',
    isLiving: true,
    loop: false,
    size: [{ x: 5, y: 5 }],
    lifespan: 3.75,

    //positional and behavioral params
    position: new Vector(),
    angle: 0,
    angleVelocity: 0,
    velocity: function (a, p, d, l, s) {
        let x, y;

        if (this.direction == 1) x = 1;
        else x = -1;
        //find percentage of time of lifespan, mulitply
        let frameStep = (d * 3000) / 16;
        y = -6 + frameStep * 0.01;

        return { x: x, y: y };
    },
    zindex: 2,
    gravity: 0.04,

    //animation and texture params
    texture: '',
    animation: false,
    animationObject: {},
    clipString: 'circle(60%)',
    blendStrength: 30,

    //transforms
    transforms: {
        0: { type: 'color', time: { start: 0, end: 1 }, values: { start: '#C63347', end: '#f5e028' } },
    },
};

//********************************* */
//angle params (p,d,l,s)
//velocity params (a,p,d,l,s)
//zindex params (v,a,p,d,l,s)
//********************************* */
let burstParticleOptions = {
    //userdefined param
    startingAngle: 0,
    startcolor: '',
    stopcolor: '',

    //general purpose params
    parentElement: 'divworld',
    emitterLabel: 'burst',
    isLiving: true,
    loop: false,
    size: [{ x: 5, y: 5 }],
    lifespan: 0.75,

    //positional and behavioral params
    position: new Vector(),
    angle: 0,
    angleVelocity: 0,
    velocity: function (a, p, d, l, s) {
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
    },
    zindex: 2,
    gravity: 0,

    //animation and texture params
    texture: '',
    animation: false,
    animationObject: {},
    clipString: 'circle(60%)',
    blendStrength: 10,

    //transforms
    transforms: {
        0: {
            type: 'color',
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
        1: { type: 'opacity', time: { start: 0.5, end: 1 }, values: { start: 1, end: 0 } },
    },
};

export let burstEmitterOptions = {
    //general purpos params
    emitterLabel: 'burst',
    parentElement: 'divworld',
    shape: 'circle', // circle, rectangle
    region: 'area', //area|edge
    size: { x: 25, y: 25 },
    position: new Vector(0, 0),
    emittingPoint: new Vector(0, 0),
    texture: {},
    zindex: 1,
    lifespan: 0.75,

    //emission params
    numParticles: 50,
    loop: false,
    enable: false,
    emitRate: 0,
    burstGap: -1,
    burstCount: 50,

    //passed functions
    particleOnCreate: part => {
        //based on position, set initial angle and velocity
        const cp = new Vector(myE.position.x + myE.size.x / 2, myE.position.y + myE.size.y / 2);
        let tempV = part.position.subtract(cp);
        part.startingAngle = Math.atan2(tempV.y, tempV.x);
    },
    particleOnDestroy() {},
    particleOptions: burstParticleOptions,
};

export let fireworksEmitterOptions = {
    //general purpos params
    emitterLabel: 'fireworks',
    parentElement: 'divworld',
    shape: 'rectangle', // circle, rectangle
    region: 'area', //area|edge
    size: { x: '100%', y: 5 },
    position: new Vector(0, 695),
    emittingPoint: new Vector(0, 0),
    texture: {},
    zindex: 1,
    lifespan: -1,

    //emission params
    numParticles: 4,
    loop: true,
    enable: false,
    emitRate: 2,
    burstGap: 0,
    burstCount: 1,

    //passed functions
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
    particleOptions: fireworksParticleOptions,
};
