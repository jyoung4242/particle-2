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
