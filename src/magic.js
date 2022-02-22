import { Vector } from '../ParticleSystem.js';
import magicball from '../assets/purpleparticle.png';

//********************************* */
//angle params (p,d,l,s)
//velocity params (a,p,d,l,s)
//zindex params (v,a,p,d,l,s)
//********************************* */
let magicParticleOptions = {
    //general purpose params
    parentElement: 'divworld',
    emitterLabel: 'magic',
    isLiving: true,
    loop: true,
    size: [{ x: 10, y: 10 }],
    lifespan: 7.5,

    //positional and behavioral params
    position: new Vector(),
    angle: 0,
    angleVelocity: -1,
    velocity: function (a, p, d, l, s) {
        let x, y;
        if (Math.abs(a) > 360) {
        }

        y = a / 700;
        x = (-20 * Math.sin(degrees_to_radians(a * 2))) / 6;
        return { x: x, y: y };
    },
    zindex: function (v, a, p, d, l, s) {
        let perc_life = d / l;
        if (perc_life > 0.2 && perc_life < 0.4) {
            return 1;
        } else if (perc_life > 0.6 && perc_life < 0.8) {
            return 1;
        } else return 3;
    },
    gravity: 0,

    //animation and texture params
    texture: magicball,
    animation: false,
    animationObject: {},
    clipString: '',
    blendStrength: 100,

    //transforms
    transforms: {
        0: { type: 'size', time: { start: 0, end: 0.5 }, values: { start: { x: 1, y: 1 }, end: { x: 8, y: 8 } } },
        1: { type: 'size', time: { start: 0.5, end: 1 }, values: { start: { x: 8, y: 8 }, end: { x: 2, y: 2 } } },
    },
};

//Emitter Lifecycle values
export let magicEmitterOptions = {
    //general purpos params
    emitterLabel: 'magic',
    parentElement: 'divworld',
    shape: 'point', // circle, rectangle
    region: 'area', //area|edge
    size: { x: 1, y: 1 },
    position: new Vector(512, 430),
    emittingPoint: new Vector(0, 0),
    texture: {},
    zindex: 2,
    lifespan: -1,

    //emission params
    numParticles: 25,
    loop: true,
    enable: false,
    emitRate: 0.1,
    burstGap: 1,
    burstCount: 5,

    //passed functions
    particleOnCreate() {},
    particleOnDestroy() {},
    particleOptions: magicParticleOptions,
};

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}
