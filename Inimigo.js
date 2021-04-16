import { Agente } from "./Agente.js"

export class Inimigo extends Agente {
    constructor() {
        super("purple", 50, 50, 100, 0, 0, 100, 15, 5)
    }

    verificaColisao(adversario) {
        this.darDanoRanged(adversario)
        // if (this.posicao.x < adversario.posicao.x + adversario.tamanho.x &&
        //     this.posicao.x + this.tamanho.x > adversario.posicao.x &&
        //     this.posicao.y < adversario.posicao.y + adversario.tamanho.y &&
        //     this.posicao.y + this.tamanho.y > adversario.posicao.y) {
        //    console.log(adversario)

        //     // this.changeState("darDanoMelee");
        //     // console.log("colidiu")
        //     this.darDanoMelee(adversario)    
        //     // this.changeState("idle");
        //     // this.darDanoMelee(adversario)

        // }
    }
}