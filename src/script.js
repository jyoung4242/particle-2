import { ParticleSystem } from '../ParticleSystem.js';
import { snowEmitterOptions } from './snowflake.js';
import { fireworksEmitterOptions } from './fireworks.js';
import { fireEmitter, smokeEmitter } from './bonfire.js';
import { magicEmitterOptions } from './magic.js';
import './styles.css';

export let divParticle;
let selectcontrol;
let maindiv;
let pOptions, sOptions;
let myEmitter, myEmitter2;
let campfire, magi;
let engine;
const fpsElem = document.getElementById('fps');

let particleSystemOptions = {
    particleOnCreate: undefined,
    particleOnDestroy: undefined,
    emitterOnCreate: undefined,
    emitterOnDestroy: undefined,
    parentElement: 'divworld',
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
    magi = document.getElementById('magic');
    selectcontrol.addEventListener('change', changeParticles);
    selectcontrol.value = 'bonfire';

    divParticle = ParticleSystem.create(particleSystemOptions);
    engine.engineStart();
    changeParticles();

    /* setTimeout(() => {
        engine.engineStop();
    }, 6000); */
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
            magi.classList.add('hidden');
            maindiv.style.backgroundColor = '#000000';
            break;
        case 'fireworks':
            pOptions = fireworksEmitterOptions;
            magi.classList.add('hidden');
            myEmitter = divParticle.addEmitter(pOptions);
            myEmitter.enableEmitter();
            campfire.classList.add('hidden');
            maindiv.style.backgroundColor = '#000000';
            break;
        case 'bonfire':
            campfire.classList.remove('hidden');
            magi.classList.add('hidden');
            pOptions = fireEmitter;
            sOptions = smokeEmitter;
            maindiv.style.backgroundColor = '#ffffff';
            myEmitter = divParticle.addEmitter(pOptions);
            myEmitter2 = divParticle.addEmitter(sOptions);
            myEmitter.enableEmitter();
            myEmitter2.enableEmitter();
            break;
        case 'magic':
            maindiv.style.backgroundColor = '#dddddd';
            pOptions = magicEmitterOptions;
            campfire.classList.add('hidden');
            magi.classList.remove('hidden');
            myEmitter = divParticle.addEmitter(pOptions);
            myEmitter.enableEmitter();
            break;
    }
}

init();
