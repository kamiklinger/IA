import { GameManager } from "./main.js"
import { WayPoint } from "./WayPoint.js"


export class Agente {

    #cor
    #tamanho
    #posicao
    #velocidade
    #velocidadePontencial = 0.3
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
    #auxiliar = false
    #adversario

    // Atributos para WayPoint 
    #wayPoints
    #indexWayPoint
    #timerWayPoint
    #timer = 0
    #target



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
            ["wayPointPatrol", this.wayPointPatrol],
            ["darDanoMelee", this.darDanoMelee],
            ["darDanoRanged", this.darDanoRanged],

        ])

    }
    // ---------Criar e mudar estados -------------
    addState(stateName, stateFunction) {
        this.#stateMap.set(stateName, stateFunction)
    }

    changeState(stateName) {
        const state = this.#stateMap.get(stateName)
        if (state === undefined) {
            throw new Error(`Estado ${stateName}, não encontrado.`)
        }
        this.#currentState = state
        // console.log(this.#currentState + " estato atual")
    }

    //----------------------------------------------

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

    set adversario(adversario) {
        this.#adversario = adversario;
    }
    //-----------------------------------------------
    // -------wayPoints -----------------------------
    setWayPoints(wayPoints) {
        this.#wayPoints = wayPoints
        this.#indexWayPoint = -1
        this.proximoTarget();
    }

    proximoTarget() {
        this.#target = this.#wayPoints[this.proximoIndexWayPoint()];
    }

    proximoIndexWayPoint() {
        if (this.#indexWayPoint < this.#wayPoints.length - 1) {
            this.#indexWayPoint++;
            // console.trace(this._target)
            return this.#indexWayPoint;
        }

        return this.#indexWayPoint = 0;
    }

    calculaAnguloWayPoint() {
        
        let diffX = this.#target.posicaoWayPoint.x - this.#posicao.x
        let diffY = this.#target.posicaoWayPoint.y - this.#posicao.y
        
        return Math.atan2(diffY, diffX)
    }
    
    moveAteWayPoint() {
                if (this.#velocidade == 0) {
            this.#velocidade = this.#velocidadePontencial
        }

        let velX = this.#velocidade * Math.cos(this.calculaAnguloWayPoint())
        let velY = this.#velocidade * Math.sin(this.calculaAnguloWayPoint())
        
        this.#posicao.x += velX * GameManager.diffTime 
        this.#posicao.y += velY * GameManager.diffTime 



        if (this.#target.verificaColisaoWayPoint(this)) {
            let timerWaypoint = this.#target.wayTime;
            this.changeState("idle")
            this.proximoTarget();
        
        }
    }

    //-----------------------------------------------------


    drawAgente(ctx) {
        ctx.fillStyle = this.#cor
        ctx.fillRect(this.#posicao.x, this.#posicao.y, this.#tamanho.x, this.#tamanho.y)
        this.changeColor()
        this.#currentState()
        
    }

    verificaColisao() {
        return (
            this.posicao.x < this.adversario.posicao.x + this.adversario.tamanho.x &&
            this.posicao.x + this.tamanho.x > this.adversario.posicao.x &&
            this.posicao.y < this.adversario.posicao.y + this.adversario.tamanho.y &&
            this.posicao.y + this.tamanho.y > this.adversario.posicao.y)
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

    // checaVida() {
    //     if (this.#vida <= 0) {
    //         //achar um lugar melhor pra por o continua, pois assim os dois continuam e n só (colocar nos darDanos da vida)
    //         // atacante.continua()
    //         return this.#vida
    //     }
    // }

    tomarDano(dano, atacante) {
        this.#vida -= dano
        // console.log("eu levei dano" + this.#vida)

    }

    //--------------------------------------------------------
    //-----------------estados de movimentação ---------------

    wayPointPatrol() {
        this.moveAteWayPoint()
    }
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
        if (this.#posicao.x >= 100 || this.#posicao.x <= 0) {
            this.#velocidadePontencial *= -1;
            this.#velocidade = this.#velocidadePontencial
            // this.#counter++
            // console.log(this.#counter)
        }
        // if (this.#counter  <=2) {
        //     this.changeState("idle")
        // }
        // if ((this.#posicao.x >= 100 || this.#posicao.x <= 0) && !this.#auxiliar) {
        //     console.log("Quantas vezes entrou aqui no patrol:")
        //     this.#velocidadePontencial *= -1
        //     this.#velocidade = this.#velocidadePontencial
        //     this.#auxiliar = true;
        // }


    }

    //-----------------estados de ataque----------------------

    darDanoMelee() {
        // this.#velocidade = 0
        if (this.#cooldown >= 10) {
            this.adversario.tomarDano(this.#danoMelee, this)

            this.#cooldown = 0

        }
        // if (this.adversario.checaVida() == 0) {
        //     this.continua()
        // }
        this.#cooldown ++
    }

    darDanoRanged() {
        if (this.#cooldownRanged >= 2) {
            if (Math.distance(this.#posicao.x, this.adversario.#posicao.y,
                this.#posicao.y, this.adversario.#posicao.y))
                this.adversario.tomarDano(this.#danoRanged, this)

            // console.log("to dando dano longe aqui no cara")
            this.#cooldownRanged = 0
        }
        this.#cooldownRanged ++
    }

    // --------------------------------------------------------
}
