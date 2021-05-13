import { Vector } from "./Vector";

export class Rules {
    #weight
    constructor() {
        if (this.constructor === Rules)
            throw new TypeError("Abstract class cannot be instantiated directly")

        this.#weight = 1;
    }
    setWeight  (weight){ 
        this.#weight = weight
    }

    getChange (bird, flock){
        return Vector.multScalar(change(bird,flock),this.#weight)
    }

    change (bird, flock)
}