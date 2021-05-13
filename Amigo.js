import { Agente } from "./Agente.js"
export class Amigo extends Agente {
    constructor() {
        super("blue", 50, 50, 0, 0, 0, 100, 10, 0)
        // this.addState("idle", this.darDano.bind(this))
        // this.changeState("darDano")
    }

    mudarEstados(){

        if(!this.verificaColisao){
            throw new Error(`Não colidiu com nada`)
        }

        // this.changeState("wayPointPatrol")
        // this.changeState("darDanoMelee")

    }
}