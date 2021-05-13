export class Vector {

    #x
    #y

    constructor(x, y) {
        this.#x = x
        this.#y = y
    }

    static addAll(all) {
        let v = new Vector(0, 0)

        all.forEach(add => {
            v = Vector.add(v, add);
        })
        
        return v
    }

    static add(v1, v2) {
        let x = v1.x + v2.x
        let y = v1.y + v2.y
        return (x, y)
    }
    static sub(v1, v2) {
        let x = v1.x - v2.x
        let y = v1.y - v2.y
        return (x, y)
    }
    static multScalar(v1, v2) {
        let x = v1.x * v2.x
        let y = v1.y * v2.y
        return (x, y)
    }

    static divScalar(v1, v2) {
        let x = v1.x / v2.x
        let y = v1.y / v2.y
        return (x, y)
    }

    static mag(v1) {
        return Math.sqrt(Math.pow(v1.x, 2) + Math.pow(v1.y, 2));
    }
}

// const a = new Vector(10, 10)
// const b = new Vector(20, 20)

// const c = Vector.add(a,b)