import { GameManager } from "./main.js"
import { Vector } from "./Vector.js"
class Bird extends Sprite {
    #pos
    #vel
    #color

    construct(pos, vel, color) {
        this.#pos = pos
        this.#vel = vel
        this.#color = color
        // sizeX = sizeY = 10;
    }

    gameRender(ctx) {
        ctx.fillStyle = this.#color
        ctx.arc(this.#pos.x, this.#pos.y, 5, 0, 2 * Math.PI);
    }

    gameUpdate() {
        this.#pos = Vector.add(this.#pos, Vector.multScalar(this.#vel, GameManager.diffTime))
    }
    randomPos(maxX, minX, maxY, minY) {
        let x = (Math.random() * (maxX - minX)) + minX
        let y = (Math.random() * (maxY - minY)) + minY

        return new Vector(x, y)
    }

    randomVel(maxSpeed) {
        let minSpeed = minSpeed *-1
        x = (Math.random() * (maxSpeed - minSpeed)) + minSpeed
        y = (Math.random() * (maxSpeed - minSpeed)) + minSpeed
        let v = new Vector(x, y)
        
        if(Vector.mag(v)> maxSpeed){
            v = Vector.multScalar (Vector.divScalar(v, Vector.mag(v)), maxSpeed )
        }
        return v
    }

}