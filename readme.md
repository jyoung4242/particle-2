# ParticleSystem.js

## Contents

-   [Demo](https://mydomparticlesystem.netlify.app/)
-   [Description](#description)
-   [Requirements](#requirements)
-   [API](#api)
    -   [Particle System Class](#particle-system-class)
    -   [Particle Emitter Class](#particle-emitter-class)
    -   [Particle Class](#particle-class)
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

#### addParticle(options)

#### removeParticle(particle)

#### addEmitter(options)

#### removeEmitter(emitter)

#### update(time)

### Particle Emitter Class

#### Attributes

#### emitterID

#### texture

#### emitterLabel

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
