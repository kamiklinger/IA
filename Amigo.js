import { Agente } from "./Agente.js"
export class Amigo extends Agente {
    constructor() {
        super("blue", 50, 50, 0, 0, 0, 100, 10, 0)
        // this.addState("idle", this.darDano.bind(this))
        // this.changeState("darDano")
    }

    verificaColisao(adversario) {
            if (this.posicao.x < adversario.posicao.x + adversario.tamanho.x &&
                this.posicao.x + this.tamanho.x > adversario.posicao.x &&
                this.posicao.y < adversario.posicao.y + adversario.tamanho.y &&
                this.posicao.y + this.tamanho.y > adversario.posicao.y) {
               console.log(adversario)

                this.darDanoMelee(adversario) 
        
                // this.changeState("darDanoMelee")
        }
    }

}