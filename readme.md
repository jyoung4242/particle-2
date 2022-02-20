# ParticleSystem.js

## Contents

-   [Demo](https://mydomparticlesystem.netlify.app/)
-   [Description](#description)
-   [Requirements](#requirements)
-   [API](#api)
    -   [Particle System Class](#particle-system-class)
    -   [Particle Emitter Class](#particle-emitter-class)
    -   [Particle Class](#particle-class)
    -   [Option Objects for each class](#object-objects)
-   [Example Options Configurations](#example-options-configurations)
-   [License](#license)

## Description

17KB lightweight, fast & powerful JavaScript particle library
Allows for individual particle control, and complete emitter systems.
Can pass descrete values, arrays of values, or pass functions that control
specific parameters

## Requirements

Currently there are two .js module dependencies, which may change in future
Vector.js and Spritesheet.js, which are just formatted out for convenience
Both are included in the modules folder

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

#### texture

String - Path to image file used as a texture for the emitter.

#### lifespan

number value that designates how many seconds the emitter will last prior to being destroyed.
If left undefined, emitter will not expirte

#### isEnabled

Boolan flag that can be enable/disabled via methods, if disabled, emitter update routine will be skipped for that emitter

#### shape

string value of ("circle","rectangle","point")

This determines the region shape of the emitter, which can be circular, a distinct point, or a rectangle

#### size

a Vector(x: 0, y:0) object that determines the overall width (x) and height (y) of the DOM object that will emit the particles

#### position

a Vector(x: 0, y:0) object that determines the overall location (x)(y) of the DOM object that will emit the particles

#### emitRate

number - in milliseconds that defines the emission rate for particles on an enabled emitter...

#### particleOnCreate ()

null or function - by default null, but you can pass a function to this options object. This function will run immediately after a particle is created.

#### particleOnDestroy ()

null or function - by default null,but you can pass a function to this options object. This function will run immediately before a particle is destroyed.

#### numParticles

number - value that caps the amount of particles that can be emitted by this emitter

#### parentElement

String - The parentElement Attribute passed as a member of the options object during addEmitter method of a particle system. Is a string identifier for the id of the div element assigned to the particle system.

All emitters and particles become children of the domParent

#### particleOptions

Object - You must pass the particleOptions object that defines all the parameters of the particles to the emitter, and this is used during the particle creation methods for the emitter

#### region

String - if you are using a circle or rectangle shape for your emitter, the region string will either need to be "area" or "edge" and this will determine if your emitter will use the entire area of the emitter, or just emit particles on the edge of the shape

#### zindex

number - CSS z index so you can control what layer your dom elements are on

#### loop

Boolean value, if loop is true, the emitter will continue producting particles , if false, it will be a one-shot type behavior, and the emitter will run until the number of particles specified in the object has been reached

#### burstCount

number - controls how many particles are fired during an emission

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

number - a 'y' vector acceleration component that is optionally used if you want your particles to "fall" after emission, not required

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

### Emitter Options

### Particle System Options

## Example Options Configurations

### Bonfire Example

#### Emitters

#### Particles

### Snowfall Example

#### Emitters

#### Particles

### Fireworks Example

#### Emitters

#### Particles

## License

Copyright 2022 by Justin Young

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
