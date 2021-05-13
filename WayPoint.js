export class WayPoint {
    #id
    #wayTime
    #posicao
    #tamanho
    #cor
    constructor(id, px, py, tx, ty, wayTime) {
        this.#id = id
        this.#tamanho = { x: tx, y: ty }
        this.#posicao = { x: px, y: py }
        this.#cor = "Pink"

    }
    get posicaoWayPoint() {
        return this.#posicao
    }

    desenhaPontos(ctx) {
        ctx.fillStyle = this.#cor
        ctx.fillRect(this.#posicao.x, this.#posicao.y, this.#tamanho.x, this.#tamanho.y)
        ctx.fillText("ID: " + this.#id, this.#posicao.x, this.#posicao.y - 5)
    }
    verificaColisaoWayPoint(patrulhador) {

        return (
            this.#posicao.x < patrulhador.posicao.x + patrulhador.tamanho.x &&
            this.#posicao.x + this.#tamanho.x > patrulhador.posicao.x &&
            this.#posicao.y < patrulhador.posicao.y + patrulhador.tamanho.y &&
            this.#posicao.y + this.#tamanho.y > patrulhador.posicao.y)
    }
}