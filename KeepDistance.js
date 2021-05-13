import { Rules } from "./Rules.js";
import { Vector } from "./Vector";

class KeeDistance extends Rules {
    #DISTANCE
    #FLOCK
    construct(distance, flock) {
        this.#DISTANCE = distance
        this.#FLOCK = flock
    }

    change (bird, flock){
        let c = new Vector(0,0)

        bird.forEach(element => {
            
        });
    }
}

//UNHIDE School 