# ParticleSystem.js

## Contents

-   [Demo](http://mydomparticlesystem.netlify.app/)
-   [Demo Project on GitHub](http://github.com/jyoung4242/myParticleTest)
-   [Description](#description)
-   [Usage](#usage)
-   [Requirements](#requirements)
-   [Variable Parameters](#variable-parameters)
-   [Transforms](#transforms)
-   [API](#api)
    -   [Particle System Class](#particle-system-class)
    -   [Particle Emitter Class](#particle-emitter-class)
    -   [Particle Class](#particle-class)
    -   [Option Objects for each class](#object-objects)
-   [Example Options Configurations](#example-options-configurations)
    -   [Bonfire Example](#bonfire-example)
    -   [Falling Snow Example](#snowfall-example)
    -   [Fireworks Example](#fireworks-example)
    -   [Magic Spell Example](#magic-spell-example)
-   [License](#license)

## Description

A 20kb lightweight, fast & powerful JavaScript particle library.
It allows for individual particle control, and complete emitter systems.
Can pass descrete values, arrays of values, or pass functions that control
specific parameters

## Usage

```js
npm i dom-particle-system
```

## Requirements

There are no more external dependencies, all have been removed.

## Variable Parameters

There are several different parameters that can be passed either a discrete value, like a number, number, or string, or the can be passed and array of like values, or they can be passed a function

Particle Parameters that are subject to this:
size, texture, gravity, angleVelocity, velocity, lifespan, zindex (just added!)

if you pass an array of appropriate values, on the creation of the particle, it will randomly select on element of an array... this works well for textures if you want multiple image files used for particles.

example:

```js
texture: ['../assets/snowflake1.png', '../assets/snowflake2.png', '../assets/snowflake3.png'],
```

So this lets a pool of different assets being used for the snow particles

if you pass a function, example:

```js
 velocity: function (a, p, d,l, s) {
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
```

depending on the parameter, it will either run this function every update, or just on initialization

size: runs once on creation

velocity: updates each loop, returns new velocity vector each time
requires parameters passed (a,p,d,l,s) so your function has access to
angle, position, duration, and size parameters to use in your function
returns vector object {x:0, y:0}

texture: \*\*\*\* not recommended to use function - untested

gravity:runs once on creation

angleVelocity: updates each loop, returns new angle value each time
requires parameters passed (v,p,d,l,s) so your function has access to
velocity, position, duration, and size parameters to use in your function
must return number

lifespan: updates each loop, returns new angle value each time
requires parameters passed (v,a,s,d) so your function has access to
velocity, angle, size, and position parameters to use in your function
must return number

zindex: updates each loop, returns a number representing new zindex level
requires passed values, (v,a,p,d,l,s), so you have access to velocity, angle,
size, lifespan, and duration

## Transforms

The transform object calls out different parameters that can be modified over the course of the lifespan of the particle

it follows this patter:

```js
# : type: 'param',{time: {start: 0 end: 0}},{values: {start: 0, end: 0}};
```

Parameters that can be interpolated over time:
Velocity, Size, Angle, Color, and Opacity

```js
0: {type: 'opacity', time: { start: 0.7, end: 1 }, values: { start: 0.8, end: 0 } },
1: {type: 'size', time: { start: 0.5, end: 1 }, values: { start: Vector(1, 1), end: Vector(.2, .2)  } },
2: {type: 'color', time: { start: 0, end: 1 }, values: { start: '#C63347', end: '#f5e028' } },
3: {type: 'velocity', time: { start: 0, end: 1 }, values: { start: Vector(1, 2), end: {x: 0, y:0} } },
```

the transform will interpolate between the start and end values, based on the start and end time provide
start and end times are percent numbers

for the size example above, for instance:

the transform starts at 50% of the lifespan, and ends at the 100% of the lifespan
during that period of time, it will scale size of the particle from 80% original size to 0% size

vectors, colors, and numbers are all interpolated

## API

### Particle System Class

#### Attributes

#### domParent

String - The domParent Attribute passed as a member of the options object during the new instancing of the Particle System Class is a string identifier for the id of the div element assigned to the particle system.

All emitters and particles become children of the domParent

#### pOnCreate()

null or function - by default null, but you can pass a function to this options object during the new instancing of the Particle System Class. This function will run immediately after a particle is created.

#### pOnDestroy()

null or function - by default null, but you can pass a function to this options object during the new instancing of the Particle System Class. This function will run immediately before a particle is destroyed.

#### eOnCreate()

null or function - by default null, but you can pass a function to this options object during the new instancing of the Particle System Class. This function will run immediately after an emitter is created.

#### eOnDestroy()

null or function - by default null, but you can pass a function to this options object during the new instancing of the Particle System Class. This function will run immediately before an emitter is destroyed.

#### Methods

#### External Methods:

#### static create(options)

```js
divParticle = ParticleSystem.create(particleSystemOptions);
```

the create method, with the options object passed, will instance the new Particle system

#### addParticle(options)

the addParticle method, with the particle options object passed, will create a particle tied to the Particle system itself as the sole emitter. This will add the particle instance to the update array of particles, and create the DOM object for the particle

#### removeParticle(particle)

the removeParticle method, with the particle instance passed, will remove a particle tied to the Particle system. This will remove the instance from the update array, and remove the element from the DOM

#### addEmitter(options)

```js
myEmitter = divParticle.addEmitter(pOptions);
```

the addEmitter method, with the emitter options object passed, will create a emitter instance tied to the Particle system itself. This will add the emitter instance to the update array of emitter, and create the DOM object for the emitter. The emitter instance will manage all the particles that are configured for that specific emitter.

this returns the instance of the emitter which can be used so you can control (enable/disable) the emitter

#### removeEmitter(emitter)

```js
divParticle.removeEmitter(myEmitter2);
```

the removeEmitter method, with the emitter instance passed, will remove an emitter tied to the Particle system. This will remove the instance from the update array, and remove the element from the DOM

returns nothing

#### update(time)

```js
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
```

Example of using a RequestAnimationFrame GameLoop to call the update method for the particle system

the update() method for the particle system shoudld be the only update that is needed to be called from the loop, this will manage the updates on all emitters and particles tied to the entire Particle System.

the parameter for the update method is the elapsed duration from the previous call in milliseconds... in this example, on a 60 fps gameloop, duration will be about 16ms each time through the loop.

### Particle Emitter Class

#### Attributes

#### emitterLabel

String - Label designation that makes emitters elements in the DOM easier to track
examples( "fire", "snowfall", "burst")

#### parentElement

String - The parentElement Attribute passed as a member of the options object during addEmitter method of a particle system. Is a string identifier for the id of the div element assigned to the particle system.

All emitters and particles become children of the domParent

#### shape

string value of ("circle","rectangle","point")

This determines the region shape of the emitter, which can be circular, a distinct point, or a rectangle

#### region

String - if you are using a circle or rectangle shape for your emitter, the region string will either need to be "area" or "edge" and this will determine if your emitter will use the entire area of the emitter, or just emit particles on the edge of the shape

#### size

a Vector(x: 0, y:0) object that determines the overall width (x) and height (y) of the DOM object that will emit the particles

#### position

a Vector(x: 0, y:0) object that determines the overall location (x)(y) of the DOM object that will emit the particles

#### emittingPoint

a Vector(x: 0, y:0) object that determines the overall location (x)(y) of the point of emission in the emitter region, if "point" is selected as shape
this is an offset to the x,y location of the emitter

#### texture

String - Path to image file used as a texture for the emitter.

#### zindex

number - CSS z index so you can control what layer your dom elements are on

#### lifespan

number value that designates how many seconds the emitter will last prior to being destroyed.
If left undefined, emitter will not expirte

#### isEnabled

Boolan flag that can be enable/disabled via methods, if disabled, emitter update routine will be skipped for that emitter

### burst values (controls how the emitter emits)

#### loop

Boolean value, if loop is true, the emitter will continue producting particles , if false, it will be a one-shot type behavior, and the emitter will run until the number of particles specified in the object has been reached

#### burstCount

number - controls how many particles are fired during an emission

#### numParticles

number - value that caps the amount of particles that can be emitted by this emitter

#### burstGap - SECONDS

number - in seconds that defines the gap of time between emission bursts...

#### burstcount

number - in seconds that defines the emission rate for particles on an enabled emitter...

#### emitRate - SECONDS

number - in seconds that defines the emission rate for particles on an enabled emitter...
if set to -1, all particles in burstcount will fire at once

#### particleOnCreate ()

null or function - by default null, but you can pass a function to this options object. This function will run immediately after a particle is created.

#### particleOnDestroy ()

null or function - by default null,but you can pass a function to this options object. This function will run immediately before a particle is destroyed.

#### particleOptions

Object - You must pass the particleOptions object that defines all the parameters of the particles to the emitter, and this is used during the particle creation methods for the emitter

#### Methods

#### External Methods:

#### enableEmitter()

enables the boolean value to true, allowing the emitter to update

```js
myEmitter.enableEmitter();
```

#### disableEmitter()

disables the boolean value to false, allowing the emitter to update

```js
myEmitter.disableEmitter();
```

### Particle Class

#### Attributes

#### emitterLabel

String - string value passed that creates a dataset for that particle, that way internal methods for the emitter, can determien which particles "belong" to that emitter

#### size

a Vector(x: 0, y:0) object that determines the overall width (x) and height (y) of the DOM object of the particle

#### texture

String - a string path to the asset image to be used for the particle... or a sprite sheet

#### gravity

a 'y' vector acceleration component that is optionally used if you want your particles to "fall" after emission, not required

Variable parameter \*\*\*\* This value can be an number, array of numbers, or a function

if number, the dom element will rotate when updated by 'x' degrees

if array of numbers, when particle is created it will randomly select on of the elements of the array and set that to the predefined value for this parameter

if its a function: this function will define the new paramater each time the particle updates

#### angleVelocity

Variable parameter \*\*\*\* This value can be an number, array of numbers, or a function

if number, the dom element will rotate when updated by 'x' degrees

if array of numbers, when particle is created it will randomly select on of the elements of the array and set that to the predefined value for this parameter

if its a function: this function will define the new paramater each time the particle updates

#### angle

number - starting angle for the dom element

#### velocity

Variable parameter \*\*\*\* This value can be an Vector, array of Vectors, or a function

if Vector(x: 0, y:0), the dom element move by this much per update

if array of Vectors(x: 0, y:0), when particle is created it will randomly select on of the elements of the array and set that to the predefined value for this parameter

if its a function: this function will define the new paramater each time the particle updates

#### lifespan

Variable parameter \*\*\*\* This value can be an number, array of numbers, or a function

if number, the dom element will last "x" number of seconds

if array of numbers, when particle is created it will randomly select on of the elements of the array and set that to the predefined value for this parameter

if its a function: this function will define the new paramater each time the particle updates

#### animate

Boolean value - if true, particle update routine will switch the texture around based on the frame sequence provide and the rate of animation

#### animationObject

```js
let animationObject: {
        framePosition: new Vector(0, 0),
        frameSize: new Vector(256, 256),
        numRows: 7,
        numCols: 7,
        sequence: smokeAnimationSequence,
    }

  let smokeAnimationSequence = new Sequence('0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44', true, animationFrameRate);
```

First, the animation Object, has 5 parameters, number of rows and columns on the spritesheet, and the position and size vectors.

the position will be the starting frame position
the size tells the animation sequence how many pixels to jump
the sequence referrs to a sequence object that is defined above

first parameter is the frame string, which number top left -> right, then top -> bottom, numbers all the frames for the sprite sheet, and this string let's you set the sequence for each animation

second paraemeter is boolean, true means normal direction animation, false, will go backwards through sequence

last paremeter is millisecond number that defines how fast the sequence changes images

#### clipString

String - this leverages CSS clip path attributes:

This will apply a clip path string to the outer div object,so you can mask an image off if you would like. Good example clip string: "circle (40%)"

#### blendStrength

Number- a percent value - if transforming colors of your particle, this is the opacity factor applied to inner dive to allow the outerdiv color to pass through

example:

```js
blendStrength: 50, //opacity of innerdiv
```

#### zindex

number - CSS z index so you can control what layer your dom elements are on

#### isLiving

Boolean value - controls if this particle updates each loop, if false, then it is ignored

#### position

a Vector(x: 0, y:0) object that determines the overall location (x)(y) of the DOM object of the particles. this gets modified by velocity and gravity, and doesn't need to be initially set, but can be as a default value

#### parentElement

String - The parentElement Attribute passed as a member of the options object during addEmitter method of a particle system. Is a string identifier for the id of the div element assigned to the particle system.

All emitters and particles become children of the domParent

#### loop

Boolean value - if true, particles get reused and reset when lifespan completed, if false, particles get destroyed when lifespan completed

#### Methods

#### External Methods:

#### static create(options)

#### removeParticle()

takes no paremeters, and returns nothing:

hides, sets living boolean to false, and removes particle form DOM
managed by an emitter usually

#### enableParticle()

unhides particle, and set's living boolean to true
managed by an emitter usually

#### disableParticle()

hides particle, and set's living boolean to false
managed by an emitter usually

## Options Objects

### Particle Options

```js
let ParticleOptions = {
    texture: './stringtomyasset.png', //, string for static image, or array of strings of images
    animation: true,
    animationObject: {
        //should be null, or left undefined if animation is false
        framePosition: new Vector(0, 0),
        frameSize: new Vector(64, 64),
        numRows: 7,
        numCols: 7,
        sequence: new Sequence('0,1,2,3,4', true, 150),
    },
    isLiving: true, // initial state of particle
    loop: true, // false will create a one-shot particle
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
    blendStrength: 100, //not required since no transform being used
    lifespan: 32, //int, array, function, number of seconds particle lives
    parentElement: 'divworld', //string dom id for particle system
    emitterLabel: 'snowfall', //string identifier for the emitter
    zindex: 2, // css z-index value
    gravity: 0, //int, array, function
    transforms: {},
    // "param": {time: {start: 0 end: 0}},{values: {start: 0, end: 0}};
};
```

### Emitter Options

```js
export let smokeEmitter = {
    emitterLabel: 'smoke',
    numParticles: 400, //cap limit
    burstCount: 1, //how many fire during emission
    emittingPoint: Vector(), //if a point is used, this is the vector location of that "point" in the emitter area, x,y offset
    loop: true,
    enable: false, //boolean, initial state of emitter, enable/disable methods control this
    shape: 'rectangle', // circle | rectangle | point
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
```

### Particle System Options

```js
let particleSystemOptions = {
    particleOnCreate: undefined,
    particleOnDestroy: undefined,
    emitterOnCreate: undefined,
    emitterOnDestroy: undefined,
    parentElement: 'divworld',
};
```

## Example Options Configurations

### Bonfire Example

#### Emitters

```js
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
```

#### Particles

```js
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
```

### Snowfall Example

#### Emitters

```js
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
```

#### Particles

```js
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
```

### Fireworks Example

#### Emitters

```js
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
```

#### Particles

```js
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
```

### Magic Spell Example

#### Emitters

```js
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
```

#### Particles

```js
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
        2: { type: 'opacity', time: { start: 0.9, end: 1 }, values: { start: 1, end: 0 } },
        3: { type: 'opacity', time: { start: 0, end: 0.9 }, values: { start: 1, end: 1 } },
    },
};
```

## License

Copyright 2022 by Justin Young

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
