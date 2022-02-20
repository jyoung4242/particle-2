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
