var IDX = 256,
    HEX = [],
    SIZE = 256,
    BUFFER;

while (IDX--) HEX[IDX] = (IDX + 256).toString(16).substring(1);

//utility function
function uid(len) {
    var i = 0,
        tmp = len || 11;
    if (!BUFFER || IDX + tmp > SIZE * 2) {
        for (BUFFER = '', IDX = 0; i < SIZE; i++) {
            BUFFER += HEX[(Math.random() * 256) | 0];
        }
    }
    return BUFFER.substring(IDX, IDX++ + tmp);
}

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

export class Particle {
    constructor(pOptions) {
        //required params
        if (!pOptions.parentElement) return null;
        this.domParent = pOptions.parentElement;

        if (!this.initialize_constructor(pOptions)) return null;

        //saving transforms - needs data validation
        this.transforms = new Object();
        Object.entries(pOptions.transforms).forEach(entry => {
            const [key, value] = entry;
            this.transforms[key] = value;
        });

        //create div and inner div
        //add image element to load against
        this.create_DOM_structure();
        return this;
    }

    static create(options) {
        //do your data validation
        return new Particle(options);
    }

    initialize_constructor(options) {
        this.emitterLabel = options.emitterLabel;
        this.emitterID = options.emitterID;
        this.particleID = `particle_${uid(16)}`;
        this.id = `${this.particleID}_${this.emitterLabel}`;

        this.size = this.set_param(options.size);
        if (this.size == null) return null;

        this.texture = this.set_param(options.texture);
        if (this.texture == null) return null;

        this.gravity = this.set_param(options.gravity);
        if (this.gravity == null) return null;

        this.position = this.set_param(options.position);
        if (this.position == null) return null;

        this.angleVelocity = this.set_param(options.angleVelocity);
        if (this.angleVelocity == null) return null;
        this.angle = options.angle;

        this.velocity = this.set_param(options.velocity);
        if (this.velocity == null) return null;

        this.lifespan = this.set_param(options.lifespan);
        if (this.lifespan == null) return null;

        this.duration = 0;

        this.animate = options.animation;
        if (this.animate) {
            this.animationObject = options.animationObject;
            this.animationSequence = options.animationObject.sequence;
        }

        //order is important as sequential updates may be dependant
        this.activeVtransform = false;
        this.activeAtransform = false;
        this.trueAngle = this.update_angle();
        this.trueVelocity = this.update_velocity();
        this.trueLivespan = this.update_lifespan();

        this.clipString = options.clipString;
        this.blendStrength = options.blendStrength;
        this.zindex = options.zindex;
        this.isLiving = options.isLiving ? options.isLiving : false;
        this.loop = options.loop;

        return true;
    }

    //Data validation, and parsing of param type
    set_param(arg) {
        let type = typeof arg;
        switch (type) {
            case 'function':
                return arg;
            case 'object': //array or Vector or object
                //test for array
                if (Array.isArray(arg)) {
                    let l = arg.length;
                    let index = Math.floor(Math.random() * l);
                    return arg[index];
                }
                if (arg instanceof Vector) return arg;
                return arg;
            default:
                //int or string
                return arg;
        }
    }

    create_DOM_structure() {
        //OuterDiv setup
        const particleElement = document.createElement('div');
        particleElement.setAttribute('id', `${this.id}_OUTER`);
        particleElement.dataset.pid = `${this.particleID}`;
        particleElement.dataset.eid = `${this.emitterID}`;
        if (!this.isLiving) particleElement.setAttribute('class', 'hidden');
        particleElement.setAttribute('width', `${this.size.x}`);
        particleElement.setAttribute('height', `${this.size.y}`);
        particleElement.style.width = `${this.size.x}px`;
        particleElement.style.height = `${this.size.y}px`;
        particleElement.style.zIndex = this.zindex;
        particleElement.style.position = 'absolute';
        particleElement.style.left = `${this.position.x}px`;
        particleElement.style.top = `${this.position.y}px`;
        if (this.clipString) particleElement.style.clipPath = `${this.clipString}`;
        this.domhandle = particleElement;
        //add to parent dom
        document.getElementById(this.domParent).appendChild(particleElement);

        //Inner div setup
        const innerdiv = document.createElement('div');
        innerdiv.setAttribute('id', `${this.id}_INNER`);
        innerdiv.setAttribute('width', `${this.size.x}`);
        innerdiv.setAttribute('height', `${this.size.y}`);
        innerdiv.style.width = `${this.size.x}px`;
        innerdiv.style.height = `${this.size.y}px`;
        //set background image to image texture or spritesheet

        if (this.animate) {
            this.assetAnimationSprite = new Spritesheet(this.animationObject.numRows, this.animationObject.numCols, this.animationObject.frameSize.x, this.animationObject.frameSize.y, this.size);

            innerdiv.style.backgroundImage = `url(${this.texture})`;
            innerdiv.style.backgroundSize = `${this.size.x * this.assetAnimationSprite.numCols}px ${this.size.y * this.assetAnimationSprite.numRows}px`;
        } else {
            innerdiv.style.backgroundImage = `url(${this.texture})`;
            innerdiv.style.backgroundSize = `cover`;
        }

        if (this.angle != 0) innerdiv.style.transform = `rotate(${this.angle}deg)`;
        particleElement.appendChild(innerdiv);
    }

    update_velocity() {
        if (!this.activeVtransform) {
            let type = typeof this.velocity;
            switch (type) {
                case 'function':
                    this.trueVelocity = this.velocity(this.trueAngle, this.position, this.duration, this.size);
                    break;
                default:
                    if (this.gravity) this.trueVelocity += this.velocity + this.gravity;
                    else this.trueVelocity = this.velocity;
                    break;
            }
        }
        return this.trueVelocity;
    }

    update_angle() {
        if (!this.activeAtransform) {
            let type = typeof this.angleVelocity;
            switch (type) {
                case 'function':
                    this.trueAngle = this.angle + this.angleVelocity(this.trueVelocity, this.position, this.duration, this.size);
                    break;
                default:
                    this.trueAngle = this.angle + this.angleVelocity;
                    break;
            }
        }
        return this.trueAngle;
    }

    update_position() {
        let newV = this.update_velocity();
        let newPos = this.position.add(newV);
        return newPos;
    }

    update_lifespan() {
        let type = typeof this.lifespan;
        if (type == 'function') {
            this.lifespan = this.lifespan(this.trueVelocity, this.trueAngle, this.trueSize, this.position);
        } else this.trueLivespan = this.lifespan;
        return this.trueLivespan;
    }

    applyTransform(transform) {
        //times be a percent decimal, like .5 is 50% of lifespan
        const param = transform[0];
        const values = transform[1];
        const startTime = values.time.start;
        const endTime = values.time.end;
        const currentTime = this.duration / this.lifespan;

        //active transform
        if (currentTime > startTime && currentTime < endTime) {
            const alpha = range(startTime, endTime, 0, 1, currentTime); //normalize to a lerp percentage

            switch (param) {
                case 'velocity':
                    //check time, is active

                    let x1, y1, x2, y2;
                    x1 = values.values.start.x == null ? this.velocity.x : values.values.start.x;
                    y1 = values.values.start.y == null ? this.velocity.y : values.values.start.y;
                    x2 = values.values.end.x == null ? this.velocity.x : values.values.end.x;
                    y2 = values.values.end.y == null ? this.velocity.y : values.values.end.y;
                    this.trueVelocity = Vlerp({ x: x1, y: y1 }, { x: x2, y: y2 }, alpha);
                    return 'V';

                case 'opacity':
                    const appliedOpacity = lerp(values.values.start, values.values.end, alpha);
                    this.domhandle.style.opacity = `${appliedOpacity}`;
                    break;
                case 'color':
                    const innerDiv = this.domhandle.firstChild;
                    let s1, s2;
                    if (typeof values.values.start == 'function') s1 = values.values.start();
                    else s1 = values.values.start;
                    if (typeof values.values.end == 'function') s2 = values.values.end();
                    else s2 = values.values.end;

                    const appliedColor = lerpColor(s1, s2, alpha);

                    this.domhandle.style.backgroundColor = appliedColor;
                    innerDiv.style.opacity = `${this.blendStrength}%`;

                    break;
                case 'angle':
                    innerDiv = this.domhandle.firstChild;
                    const appliedAngle = lerp(values.values.start, values.values.end, alpha);
                    innerDiv.style.transform = `rotate(${appliedAngle}deg)`;

                    return 'A';

                case 'size':
                    const newSize = new Vector(Vlerp(values.values.start, values.values.end, alpha));
                    this.domhandle.style.transform = `scale(${newSize.x},${newSize.y})`;
                    break;
            }
            return null;
        }
    }

    enableParticle() {
        this.isLiving = true;
        this.domhandle.classList.remove('hidden');
    }

    disableParticle() {
        this.isLiving = false;
        this.domhandle.classList.add('hidden');
    }

    removeParticle() {
        this.isLiving = false;
        this.domhandle.classList.add('hidden');

        if (document.getElementById(this.domParent).contains(this.domhandle)) {
            document.getElementById(this.domParent).removeChild(this.domhandle);
        }
    }

    update(time) {
        this.duration += time;

        if (this.duration >= this.trueLivespan) {
            if (this.loop) {
                return 2;
            } else {
                this.removeParticle();
                return 0;
            }
        }

        //apply transforms
        if (Object.keys(this.transforms).length) {
            let cntVt = 0;
            let cntAt = 0;
            Object.entries(this.transforms).forEach(entry => {
                let rtrn = this.applyTransform(entry);
                if (rtrn == 'V') cntVt++;
                if (rtrn == 'A') cntAt++;
            });
            if (cntVt > 0) this.activeVtransform = true;
            else this.activeVtransform = false;
            if (cntAt > 0) this.activeAtransform = true;
            else this.activeAtransform = false;
        }

        //add animation update here
        if (this.animate) {
            let i = this.animationSequence.getCurrentFrameIndex();
            this.animationSequence.updateElapsedTime(time);
            const frameObject = this.animationSequence.step();
            if (frameObject != null) {
                if (i != frameObject.index) {
                    const fdata = this.assetAnimationSprite.getFrameAttributes(frameObject.index);

                    let innerDiv = this.domhandle.firstChild;
                    innerDiv.style.backgroundPosition = `-${fdata.x}px -${fdata.y}px`;
                }
            }
        }

        if (this.isLiving) {
            this.position = this.update_position();
            this.angle = this.update_angle();
            this.domhandle.style.transform = `rotate(${this.angle}deg)`;
            this.domhandle.style.left = `${this.position.x}px`;
            this.domhandle.style.top = `${this.position.y}px`;
        }

        return 1;
    }
}

export class ParticleEmitter {
    constructor(eOptions) {
        this.initialize_constructor(eOptions);
        this.create_DOM_structure();
        return this;
    }

    initialize_constructor(opt) {
        if (opt.texture != {}) {
            this.texture = opt.texture.image;
            this.flip = opt.texture.flip;
        }

        this.emitterID = opt.emitterID;
        this.emitterLabel = opt.emitterLabel;
        this.particles = [];
        this.deadpool = [];
        this.lifespan = opt.lifespan;
        this.isEnabled = opt.enable;
        this.shape = opt.shape;
        this.size = opt.size;
        this.position = opt.position;
        this.emitRate = opt.emitRate;
        this.particleOnCreate = opt.particleOnCreate;
        this.particleOnDestroy = opt.particleOnDestroy;
        this.numParticles = opt.numParticles;
        this.parentElement = opt.parentElement;
        this.particleOptions = opt.particleOptions;
        this.emissionTimer = 0;
        this.region = opt.region;
        this.zindex = opt.zindex;
        this.loop = opt.loop;
        this.loopCount = 0;
        this.burstCount = opt.burstCount;
        this.redrawFlag = true;
        this.emittingPoint = opt.emittingPoint;
    }

    create_DOM_structure() {
        //create div
        //add image element to load against
        const parent = document.getElementById(this.parentElement);
        const emitterElement = document.createElement('div');
        let pWidth = parent.clientWidth;
        let pHeight = parent.clientHeight;

        this.emitterID = `emit_${uid(16)}`;
        emitterElement.dataset.eid = this.emitterID;
        emitterElement.id = `${this.emitterID}_${this.emitterLabel}`;

        //set size of emitter
        //if size is string, then its a percentage of the parent, calculate
        if (typeof this.size.x == 'string') {
            const mulitplier = this.size.x.split('%');
            const widthmag = (parseFloat(mulitplier[0]) * pWidth) / 100;
            emitterElement.setAttribute('width', widthmag.toString());
            emitterElement.style.width = this.size.x;
        } else {
            //number value.
            emitterElement.setAttribute('width', this.size.x.toString());
            emitterElement.style.width = `${this.size.y}px`;
        }

        //now height
        if (typeof this.size.y == 'string') {
            const mulitplier = this.size.y.split('%');
            const heightmag = (parseFloat(mulitplier[0]) * pHeight) / 100;
            emitterElement.setAttribute('height', heightmag.toString());
            emitterElement.style.height = this.size.y;
        } else {
            //number value.
            emitterElement.setAttribute('height', this.size.y.toString());
            emitterElement.style.height = `${this.size.y}px`;
        }

        parent.appendChild(emitterElement);

        //if texture, add to element
        if (this.texture != undefined) {
            emitterElement.style.backgroundImage = `url(${this.texture})`;
            if (this.flip) {
                emitterElement.style.transform = `scaleX(-1)`;
            }
            emitterElement.style.backgroundSize = `cover`;
        }
        emitterElement.style.position = 'absolute';
        emitterElement.style.zIndex = this.zindex;
        emitterElement.style.left = `${this.position.x}px`;
        emitterElement.style.top = `${this.position.y}px`;

        this.domhandle = emitterElement;

        //add resize listener if size is relative, wait till after this.domhandle is assigned
        if (typeof this.size.x == 'string' || typeof this.size.y == 'string') {
            parent.addEventListener('resize', () => {
                if (typeof this.size.x == 'string') {
                    this.domhandle.style.width = `${this.size.x}`;
                } else this.domhandle.style.width = `${this.size.x}px`;
                if (typeof this.size.y == 'string') this.domhandle.style.height = `${this.size.y}`;
                else this.domhandle.style.height = `${this.size.y}px`;
                this.domwidth = this.domhandle.clientWidth;
                this.domheight = this.domhandle.clientHeight;
            });
        }
    }

    static create(options) {
        //do your data validation
        return new ParticleEmitter(options);
    }

    enableEmitter() {
        this.isEnabled = true;
    }

    destroyEmitter() {
        this.clearParticles();
        let parent = document.getElementById('divworld');
        let children = parent.querySelectorAll('#divworld > [data-eid^="' + this.emitterID + '"]');
        for (let i = children.length - 1; i > -1; i--) {
            parent.removeChild(children[i]);
        }
        this.particles = [];
    }

    disableEmitter() {
        this.isEnabled = false;
    }

    resetParticle(particle) {
        let index = this.particles.indexOf(particle);
        this.particles[index].position = this.getNextStartingPoint();
        this.particles[index].duration = 0;
        if (this.particleOnCreate) this.particleOnCreate(this.particles[index]);
    }

    addParticle(options) {
        let newPart;

        if (this.loop && this.deadpool.length) {
            newPart = this.deadpool.pop();
            newPart.initialize_constructor(options);
        } else {
            newPart = Particle.create(options);
            if (!newPart) return -1;
        }
        this.particles.push(newPart);
        if (this.particleOnCreate) this.particleOnCreate(newPart);
        return newPart;
    }

    moveToDeadPool(particle) {
        let ind = this.particles.indexOf(particle);
        const deadParticle = this.particles.splice(particle, 1);
        if (ind != -1) this.deadpool.push(deadParticle[0]);
    }

    removeParticle(part) {
        if (this.particleOnDestroy) this.particleOnDestroy(part);
        part.removeParticle();
        let ind = this.particles.indexOf(part);
        if (ind != -1) this.particles.splice(ind, 1);
    }

    clearParticles() {
        let parent = document.getElementById('divworld');
        let children = parent.querySelectorAll('#divworld > [data-eid^="' + this.emitterID + '"]');
        for (let i = children.length - 1; i > -1; i--) {
            parent.removeChild(children[i]);
        }
        this.particles = [];
    }

    getNextStartingPoint() {
        switch (this.shape) {
            case 'point':
                return this.position.add(this.emittingPoint);

            case 'circle':
                const cp = new Vector(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);
                const radius = this.region == 'edge' ? this.size.x / 2 : (Math.random() * this.size.x) / 2;
                const theta = degrees_to_radians(Math.floor(Math.random() * 359));
                let testVector = new Vector(radius * Math.cos(theta), -radius * Math.sin(theta));
                return new Vector(cp.x + radius * Math.cos(theta), cp.y - radius * Math.sin(theta));

            case 'rectangle': //can be an integer value, or a string % of dom dimensions
                let pointx, pointy, width, height;

                if (typeof this.size.x == 'string') {
                    if (this.size.x.includes('%')) {
                        const rtrnArray = this.size.x.split('%');

                        width = this.domwidth * (parseInt(rtrnArray[0]) / 100); //this.domhandle.clientWidth
                    }
                } else width = this.size.x;

                if (typeof this.size.y == 'string') {
                    if (this.size.y.includes('%')) {
                        const rtrnArray = this.size.y.split('%');

                        height = this.domheight * (parseInt(rtrnArray[0]) / 100); //this.domhandle.clientHeight
                    }
                } else height = this.size.y;

                if (this.region == 'edge') {
                    //pick side
                    const side = Math.floor(Math.random() * 4);

                    if (side == 0 || side == 2) {
                        pointx = this.position.x + Math.random() * width;
                        pointy = side == 0 ? this.position.y : this.position.y + height;
                    } else {
                        pointy = this.position.y + Math.random() * height;
                        pointx = side == 1 ? this.position.x : this.position.x + width;
                    }
                } else {
                    //area
                    pointx = this.position.x + Math.random() * width;
                    pointy = this.position.y + Math.random() * height;
                }
                return new Vector(pointx, pointy);
            default:
                return this.position.add(emittingPoint);
        }
    }

    update(time) {
        if (this.redrawFlag) {
            //onetime through, let's a dom redraw occur
            this.redrawFlag = false;
            this.domwidth = this.domhandle.clientWidth;
            this.domheight = this.domhandle.clientHeight;
        } else {
            this.emissionTimer += time;

            if (this.emissionTimer >= this.lifespan && this.lifespan != undefined && this.loop == false) {
                this.destroyEmitter();
                return -1;
            }

            if (this.isEnabled) {
                if (this.loop || (!this.loop && this.loopCount < 1)) {
                    if (this.emissionTimer >= this.emitRate / 1000 && this.particles.length < this.numParticles) {
                        this.emissionTimer = 0;

                        //add burst option here, loop through burst and add # number of particles in this instance
                        if (this.burstCount > 1) {
                            for (let burst = this.burstCount; burst >= 0; burst--) {
                                this.particleOptions.position = this.getNextStartingPoint();
                                this.particleOptions.emitterID = this.emitterID;
                                this.addParticle(this.particleOptions);
                            }
                            this.loopCount += 1;
                        } else {
                            this.particleOptions.position = this.getNextStartingPoint();
                            this.particleOptions.emitterID = this.emitterID;
                            this.addParticle(this.particleOptions);
                            this.loopCount += 1;
                        }
                    }
                }
            }

            //update all active particles
            if (this.isEnabled) {
                this.particles.forEach(particle => {
                    let stillAlive = particle.update(time);
                    if (stillAlive == 0) this.removeParticle(particle);
                    else if (stillAlive == 2) this.moveToDeadPool(particle);
                });
            }

            return 1;
        }
    }
}

class ParticleSystem {
    constructor(psOptions) {
        //load defaults
        if (!psOptions.parentElement) return null; //gaurd condition for one required param
        this.domParent = psOptions.parentElement;
        this.pOnCreate = psOptions.particleOnCreate ? psOptions.particleOnCreate : undefined;
        this.pOnDestroy = psOptions.particleOnDestroy ? psOptions.particleOnDestroy : undefined;
        this.eOnCreate = psOptions.emitterOnCreate ? psOptions.emitterOnCreate : undefined;
        this.eOnDestroy = psOptions.emitterOnDestroy ? psOptions.emitterOnDestroy : undefined;
        this.id = 'pSystem_' + uid(16);

        //define arrays
        this.emitters = [];
        this.particles = [];
    }

    static create(options) {
        //do your data validation
        return new ParticleSystem(options);
    }

    addEmitter(eOptions) {
        let currentEmitter = ParticleEmitter.create(eOptions);
        this.emitters.push(currentEmitter);
        if (this.eOnCreate) this.eOnCreate(currentEmitter);
        return currentEmitter;
    }

    removeEmitter(emit) {
        emit.disableEmitter();
        if (this.eOnDestroy) this.eOnDestroy(emit);
        emit.destroyEmitter();
        this.emitters = this.emitters.filter(em => {
            return em != emit;
        });
    }

    removeParticle(part) {
        if (this.pOnDestroy) this.pOnDestroy(part);
        this.particles = this.particles.filter(prt => {
            return prt != part;
        });
    }

    addParticle(pOptions) {
        let currentParticle = new Particle(pOptions, this.preLoadImage);
        this.particles.push(currentParticle);
        if (this.pOnCreate) this.pOnCreate(currentParticle);
    }

    update(time) {
        this.emitters.forEach(emitter => {
            let rslt = emitter.update(time);
            if (rslt == -1) this.removeEmitter(emitter);
        });

        this.particles.forEach(particle => {
            let rslt = particle.update(time);
            if (rslt == -1) this.removeParticle(particle);
        });
    }
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

export class Spritesheet {
    //private attributes

    constructor(numrows = 1, numcols = 1, frameWidth = null, frameHeight = null, divSize) {
        this.numRows = numrows;
        this.numCols = numcols;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frames = {};
        this.divSize = divSize;

        let ind = 0;
        for (let r = 0; r < this.numRows; r++) {
            for (let c = 0; c < this.numCols; c++) {
                this.frames[ind] = {
                    x: c * this.divSize.x,
                    y: r * this.divSize.y,
                    w: this.divSize,
                    h: this.divSize,
                };
                ind++;
            }
        }
    }

    //accepts key (index) string, returns the key/value pair
    getFrames() {
        return this.frames;
    }

    //accepts key (index) string, returns the key/value pair
    getFrameAttributes(key) {
        return this.frames[key];
    }
}

export class Sequence {
    constructor(frameString, isLooping = false, frameRate = 60, direction = 'normal') {
        this.frameString = frameString;
        this.isLooping = isLooping;
        this.frameRate = frameRate;
        this.currentIndex = 0;
        this.direction = direction;
        this.numFrames = 0;
        this.elapsedTime = 0;
        //count number of frames
        this.frameArray = this.frameString.split(',');
        this.numFrames = this.frameArray.length;

        return;
    }

    updateElapsedTime(time) {
        this.elapsedTime += time;

        return this.elapsedTime;
    }

    step() {
        if (this.elapsedTime > this.frameRate) {
            this.elapsedTime = 0;
            if (this.direction === 'normal') {
                this.currentIndex++;
            } else {
                this.currentIndex--;
            }
            //test for zero and going past end of sequence
            if (this.currentIndex < 0) this.currentIndex = this.numFrames - 1;
            else if (this.currentIndex == this.numFrames) this.currentIndex = 0;

            let obj = {
                index: this.currentIndex,
                frame: this.frameArray[this.currentIndex],
            };
            return obj;
        }
        return null;
    }

    getCurrentFrameIndex() {
        return this.currentIndex;
    }

    reset() {
        this.currentIndex = 0;
        return this.currentIndex;
    }

    getCurrentFrame() {
        return this.frameArray[this.currentIndex];
    }

    setFrameRate(newFrameRate) {
        this.frameRate = newFrameRate;
        return this.frameRate;
    }

    getFrameRate() {
        return this.frameRate;
    }

    setFrameString(newFrameString) {
        this.frameRate = newFrameString;
        return this.frameString;
    }

    getFrameString() {
        return this.frameString;
    }
}

export class Vector {
    x;
    y;
    z;

    constructor(x = 0, y = 0, z = 0) {
        if (x instanceof Vector) {
            y = x.y;
            z = x.z;
            x = x.x;
        } else if (Array.isArray(x)) {
            y = x[1];
            z = x[2] ?? 0;
            x = x[0];
        }
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get zero() {
        return this instanceof Vector3 ? Math.abs(this.x) === 0 && Math.abs(this.y) === 0 && Math.abs(this.z) === 0 : Math.abs(this.x) === 0 && Math.abs(this.y) === 0;
    }

    get magnitude() {
        return this instanceof Vector3 ? Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z) : Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get half() {
        return this.multiply(0.5);
    }

    get negHalf() {
        return this.multiply(-0.5);
    }

    add(delta, update = false) {
        let vector = update ? this : this.clone();
        //const deltaVector = delta instanceof Vector ? delta : new Vector(delta[0], delta[1], delta[2]);
        vector.x += delta.x;
        vector.y += delta.y;
        if (this instanceof Vector3) {
            vector.z += deltaVector.z;
        }
        return vector;
    }
    subtract(delta, update = false) {
        const vector = update ? this : this.clone();
        const deltaVector = delta instanceof Vector ? delta : new Vector(delta[0], delta[1], delta[2]);
        vector.x -= deltaVector.x;
        vector.y -= deltaVector.y;
        if (this instanceof Vector3) {
            vector.z -= deltaVector.z;
        }
        return vector;
    }
    multiply(delta, update = false) {
        const vector = update ? this : this.clone();
        const deltaVector = delta instanceof Vector ? delta : new Vector(delta, delta, delta);
        vector.x *= deltaVector.x;
        vector.y *= deltaVector.y;
        if (this instanceof Vector3) {
            vector.z *= deltaVector.z;
        }
        return vector;
    }
    divide(delta, update = false) {
        const vector = update ? this : this.clone();
        const deltaVector = delta instanceof Vector ? delta : new Vector(delta, delta, delta);
        vector.x /= deltaVector.x;
        vector.y /= deltaVector.y;
        if (this instanceof Vector3) {
            vector.z /= deltaVector.z;
        }
        return vector;
    }

    normalize(update = false) {
        const vector = update ? this : this.clone();
        const magnitude = this.magnitude;
        if (magnitude > 0) {
            vector.divide(magnitude, true);
        }
        return vector;
    }

    sign(update = false) {
        const vector = update ? this : this.clone();
        vector.x = Math.sign(vector.x);
        vector.y = Math.sign(vector.y);
        if (this instanceof Vector3) {
            vector.z = Math.sign(vector.z);
        }
        return vector;
    }

    clamp(min, max, update = false) {
        const vector = update ? this : this.clone();
        vector.x = Math.max(min.x, Math.min(vector.x, max.x));
        vector.y = Math.max(min.y, Math.min(vector.y, max.y));
        if (this instanceof Vector3) {
            vector.z = Math.max(min.z, Math.min(vector.z, max.z));
        }
        return vector;
    }

    clone() {
        return this instanceof Vector3 ? new Vector3(this.x, this.y, this.z) : new Vector(this.x, this.y, this.z);
    }

    toArray() {
        return this instanceof Vector3 ? [this.x, this.y, this.z] : [this.x, this.y];
    }

    toVector2() {
        return this instanceof Vector3 ? new Vector(this.x, this.y, this.z) : this;
    }
}

export class Vector3 extends Vector {}
