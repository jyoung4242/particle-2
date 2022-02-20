import { ParticleSystem } from './modules/ParticleSystem.js';
import { snowEmitterOptions } from './modules/snowflake.js';
import { fireworksEmitterOptions } from './modules/fireworks.js';
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
}

function changeParticles() {
    //remove Emitter
    if (myEmitter) {
        divParticle.removeEmitter(myEmitter);
    }

    if (myEmitter2) {
        divParticle.removeEmitter(myEmitter2);
    }
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
