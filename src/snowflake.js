import { Vector } from '../ParticleSystem.js';
import snow1 from '../assets/snowflake1.png';
import snow2 from '../assets/snowflake2.png';
import snow3 from '../assets/snowflake3.png';

//********************************* */
//angle params (p,d,l,s)
//velocity params (a,p,d,l,s)
//zindex params (v,a,p,d,l,s)
//********************************* */
let snowParticleOptions = {
    //general purpose params
    parentElement: 'divworld',
    emitterLabel: 'snowfall',
    isLiving: true,
    loop: true,
    size: [
        { x: 25, y: 25 },
        { x: 15, y: 15 },
        { x: 20, y: 20 },
        { x: 10, y: 10 },
        { x: 30, y: 30 },
    ],
    lifespan: 32,

    //positional and behavioral params
    position: new Vector(),
    angle: 0,
    angleVelocity: [-1, -0.5, -0.25, 0, 0.25, 0.5, 1],
    velocity: function (a, p, d, l, s) {
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
    },
    zindex: 2,
    gravity: 0,

    //animation and texture params
    texture: [snow1, snow2, snow3],
    animation: false,
    animationObject: {},
    clipString: '',
    blendStrength: 100,

    //transforms
    transforms: {},
};

export let snowEmitterOptions = {
    //general purpos params
    emitterLabel: 'snowfall',
    parentElement: 'divworld',
    shape: 'rectangle', // circle, rectangle
    region: 'area', //area|edge
    size: { x: '100%', y: 5 },
    position: new Vector(0, -5),
    emittingPoint: new Vector(0, 0),
    texture: '',
    zindex: 1,
    lifespan: -1,

    //emission params
    numParticles: 600,
    loop: true,
    enable: false,
    emitRate: 0.05,
    burstGap: 0,
    burstCount: 1,

    //passed functions
    particleOnCreate() {},
    particleOnDestroy() {},
    particleOptions: snowParticleOptions,
};

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}
