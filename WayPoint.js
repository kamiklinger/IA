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
    desenhaPontos(ctx) {
        ctx.fillStyle = this.#cor
        ctx.fillRect(this.#posicao.x, this.#posicao.y, this.#tamanho.x, this.#tamanho.y)
        ctx.fillText("ID: "+this.#id,this.#posicao.x, this.#posicao.y-5 )
    }
    verificaColisao() {
        return (
            this.posicao.x < this.adversario.posicao.x + this.adversario.tamanho.x &&
            this.posicao.x + this.tamanho.x > this.adversario.posicao.x &&
            this.posicao.y < this.adversario.posicao.y + this.adversario.tamanho.y &&
            this.posicao.y + this.tamanho.y > this.adversario.posicao.y)
    }
}