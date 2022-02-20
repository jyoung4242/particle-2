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

The domParent Attribute passed as a member of the options object during the new instancing of the Particle System Class is a string identifier for the id of the div element assigned to the particle system.

All emitters and particles become children of the domParent

#### pOnCreate()

by default null, but you can pass a function to this options object during the new instancing of the Particle System Class. This function will run immediately after a particle is created.

#### pOnDestroy()

by default null, but you can pass a function to this options object during the new instancing of the Particle System Class. This function will run immediately before a particle is destroyed.

#### eOnCreate()

by default null, but you can pass a function to this options object during the new instancing of the Particle System Class. This function will run immediately after an emitter is created.

#### eOnDestroy()

by default null, but you can pass a function to this options object during the new instancing of the Particle System Class. This function will run immediately before an emitter is destroyed.

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

the addEmitter method, with the emitter options object passed, will create a emitter instance tied to the Particle system itself. This will add the emitter instance to the update array of emitter, and create the DOM object for the emitter. The emitter instance will manage all the particles that are configured for that specific emitter.

#### removeEmitter(emitter)

the removeEmitter method, with the emitter instance passed, will remove an emitter tied to the Particle system. This will remove the instance from the update array, and remove the element from the DOM

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

#### texture

#### lifespan

#### isEnabled

#### shape

#### size

#### position

#### emitRate

#### particleOnCreate ()

#### particleOnDestroy ()

#### numParticles

#### parentElement

#### particleOptions

#### emissionTimer

#### region

#### zindex

#### loop

#### burstCount

#### Methods

#### External Methods:

#### static create(options)

#### enableEmitter()

#### disableEmitter()

#### destroyEmitter()

### Particle Class

#### Attributes

#### emitterID

#### emitterLabel

#### particleID

#### size

#### texture

#### gravity

#### angleVelocity

#### angle

#### velocity

#### lifespan

#### animate

#### animationObject

#### clipString

#### blendStrength

#### zindex

#### isLiving

#### position

#### parentElement

#### zindex

#### loop

#### Methods

#### External Methods:

#### static create(options)

#### removeParticle()

#### enableParticle()

#### disableParticle()

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
