import { Vector } from './modules/vector.js';
import { ParticleSystem } from './modules/ParticleSystem.js';
import { snowEmitterOptions } from './modules/snowflake.js';
import { fireworksEmitterOptions, burstEmitterOptions } from './modules/fireworks.js';
import { fireEmitter, smokeEmitter } from './modules/bonfire.js';

export let divParticle;
let selectcontrol;
let maindiv;
let pOptions, sOptions;
let myEmitter, myEmitter2;
let campfire;

let engine;

const fpsElem = document.getElementById('fps');

let particleSystemOptions = {
    particleOnCreate: undefined,
    particleOnDestroy: undefined,
    emitterOnCreate: undefined,
    emitterOnDestroy: undefined,
    parentElement: '',
    preload: '',
};

class GameLoop {
    #running;
    #lastTime;
    fpsTimer;
    frameCounter;
    fps;
    diagtim;

    constructor() {
        this.lastTime = 0;
        this.running = false;
        this.fpsTimer = 0;
        this.frameCounter = 0;
        this.fps = 0;
    }

    tick(timestamp) {
        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
        this.fpsTimer += deltaTime;
        this.frameCounter++;

        if (this.fpsTimer > 1) {
            this.fps = this.frameCounter;
            this.frameCounter = this.fpsTimer = 0;

            fpsElem.innerHTML = `FPS: ${this.fps}`;
        }
        divParticle.update(deltaTime);

        if (this.running) {
            requestAnimationFrame(this.tick.bind(this));
        }
    }

    engineStart() {
        this.running = true;
        this.tick(0);
    }

    engineStop() {
        this.running = false;
    }
}

function init() {
    engine = new GameLoop();
    particleSystemOptions.parentElement = 'divworld';
    maindiv = document.getElementById('divworld');
    selectcontrol = document.getElementById('particletype');
    campfire = document.getElementById('fire');
    selectcontrol.addEventListener('change', changeParticles);
    selectcontrol.value = 'bonfire';

    divParticle = ParticleSystem.create(particleSystemOptions);
    engine.engineStart();
    changeParticles();

    /* setTimeout(() => {
        engine.engineStop();
    }, 8000); */
}

/*********************
 * Utility Functions
 ********************/

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

const Vlerp = (v1, v2, a) => {
    const x = v1.x * (1 - a) + v2.x * a;
    const y = v1.y * (1 - a) + v2.y * a;
    return new Vector(x, y);
};

/**
 * A linear interpolator for hexadecimal colors
 * @param {String} a
 * @param {String} b
 * @param {Number} amount
 * @example
 * // returns #7F7F7F
 * lerpColor('#000000', '#ffffff', 0.5)
 * @returns {String}
 */

function lerpColor(a, b, amount) {
    var ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16,
        ag = (ah >> 8) & 0xff,
        ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16,
        bg = (bh >> 8) & 0xff,
        bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1);
}

function changeParticles() {
    //remove Emitter
    if (myEmitter) {
        divParticle.removeEmitter(myEmitter);
    }

    if (myEmitter2) {
        divParticle.removeEmitter(myEmitter2);
    }

    //get new particle type
    //start new emitter

    switch (selectcontrol.value) {
        case 'snow':
            pOptions = snowEmitterOptions;
            myEmitter = divParticle.addEmitter(pOptions);
            myEmitter.enableEmitter();
            //hide fire
            campfire.classList.add('hidden');
            maindiv.style.backgroundColor = '#000000';
            break;
        case 'fireworks':
            pOptions = fireworksEmitterOptions;
            myEmitter = divParticle.addEmitter(pOptions);
            myEmitter.enableEmitter();
            campfire.classList.add('hidden');
            maindiv.style.backgroundColor = '#000000';
            break;
        case 'bonfire':
            campfire.classList.remove('hidden');
            pOptions = fireEmitter;
            sOptions = smokeEmitter;
            maindiv.style.backgroundColor = '#ffffff';
            myEmitter = divParticle.addEmitter(pOptions);
            myEmitter2 = divParticle.addEmitter(sOptions);
            myEmitter.enableEmitter();
            myEmitter2.enableEmitter();
            break;
    }
}

init();
