export class Agente {
    #cor
    #tamanho
    #posicao
    #velocidade
    #velocidadePontencial = 1
    #vida
    #danoMelee
    #danoRanged
    //
    #stateMap
    #currentState = this.idle
    //
    #counter = 0
    #cooldown = 0
    #cooldownRanged = 0
    #auxiliar = false;
    //#adversario
    constructor(cor, tx, ty, px, py, vel, vida, dMelee, dRanged) {
        this.#cor = cor
        this.#tamanho = { x: tx, y: ty }
        this.#posicao = { x: px, y: py }
        this.#velocidade = vel
        this.#vida = vida
        this.#danoMelee = dMelee
        this.#danoRanged = dRanged
        this.#stateMap = new Map([
            ["idle", this.idle],
            ["walk", this.walk],
            ["patrol", this.patrol],
        ])
    }

    addState(stateName, stateFunction) {
        this.#stateMap.set(stateName, stateFunction)
    }

    changeState(stateName) {
        const state = this.#stateMap.get(stateName)
        if (state === undefined) {
            throw new Error(`Estado ${stateName}, não encontrado.`)
        }
        this.#currentState = state
        console.log(this.#currentState+ " estato atual")
    }

    //------------------------------------------------

    set tamanho(tamanho) {
        this.#tamanho.x = tamanho.x
        this.#tamanho.y = tamanho.y
    }

    get tamanho() {
        return this.#tamanho
    }

    set posicao(posicao) {
        this.#posicao.x = posicao.x
        this.#posicao.y = posicao.y
    }

    get posicao() {
        return this.#posicao
    }

    //-----------------------------------------------

    drawAgente(ctx) {
        ctx.fillStyle = this.#cor
        ctx.fillRect(this.#posicao.x, this.#posicao.y, this.#tamanho.x, this.#tamanho.y)
        this.changeColor()
        this.#currentState()
    }

    changeColor() {
        if (this.#vida > 80) {
            this.#cor = "green"
        }

        if (this.#vida <= 60 && this.#vida > 40) {
            this.#cor = "yellow"
        }

        if (this.#vida <= 40 && this.#vida > 20) {
            this.#cor = "orange"
        }

        if (this.#vida <= 20 && this.#vida > 0) {
            this.#cor = "red"
        }

        if (this.#vida <= 0) {
            this.#cor = "black"
        }
    }

    continua() {
        this.changeState("patrol")
    }

    checaVida(adversario) {
        if (this.#vida <= 0) {
            //achar um lugar melhor pra por o continua, pois assim os dois continuam e n só (colocar nos darDanos da vida)
            // atacante.continua()
            return this.#vida
        }
    }

    tomarDano(dano, atacante) {
        this.#vida -= dano
        console.log("eu levei dano" + this.#vida)

    }

    darDanoMelee(adversario) {
        this.#velocidade = 0
        if (this.#cooldown >= 10) {
            adversario.tomarDano(this.#danoMelee, this)
            console.log("to dando dano aqui no cara")
            this.#cooldown = 0

        }
        if (adversario.checaVida() == 0) {
            this.continua()
        }
        this.#cooldown ++
    }

    darDanoRanged(adversario) {
        if (this.#cooldownRanged >= 2) {
            if (Math.distance(this.#posicao.x, adversario.#posicao.y,
                this.#posicao.y, adversario.#posicao.y))
                adversario.tomarDano(this.#danoRanged, this)

            console.log("to dando dano longe aqui no cara")
            this.#cooldownRanged = 0
        }
        this.#cooldownRanged ++
    }

    //--------------------------------------------------------
    //-----------------estados--------------------------------

    idle() {
        this.#velocidade = 0
    }

    walk() {
        if (this.#velocidade == 0) {
            this.#velocidade = this.#velocidadePontencial
        }
        this.#posicao.x += this.#velocidade
    }
    
    patrol() {
        if (this.#velocidade == 0) {
            this.#velocidadePontencial = 1
            this.#velocidade = this.#velocidadePontencial
        }
        this.#posicao.x += this.#velocidade
        
        if ((this.#posicao.x >= 100 || this.#posicao.x <= 0) && !this.#auxiliar)  {
            console.log("Quantas vezes entrou aqui no patrol:")
            this.#velocidadePontencial *= -1
            this.#velocidade = this.#velocidadePontencial
            this.#counter++
            this.#auxiliar = true;
        }

        if (this.#counter == 10) {
            this.changeState("idle")
        }
    }

    // pegaAdversario(adversario){
    //     this.#adversario = adversario;
    // }
    //--------------------------------------------------------
}
