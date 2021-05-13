export class Sprite {
    #posX
    #posY
    #sizeX
    #sizeY
    
    constructor() {
        if (this.constructor === Sprite)
        throw new TypeError("Abstract class cannot be instantiated directly")
        this.#posX;
        this.#posY;
        this.#sizeX
        this.#sizeY
        
    }
    gameRender(ctx){}
    gameUpdate(){}
    
}