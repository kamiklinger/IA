import { Inimigo } from "./Inimigo.js"
import { Amigo } from "./Amigo.js"

Math.distance = (xa, ya, xb, yb) => {
    const x = xb - xa;
    const y = yb - ya;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

const canvas = document.createElement("canvas")

canvas.width = 800
canvas.height = 700
document.body.append(canvas)
const ctx = canvas.getContext("2d")


const amigo = new Amigo();
const inimigo = new Inimigo();


console.log(amigo)
function gameUpdate(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    amigo.drawAgente(ctx)
    inimigo.drawAgente(ctx)

    amigo.verificaColisao(inimigo)
    inimigo.verificaColisao(amigo)

    // amigo.pegaAdversario(inimigo)    
    //    console.log("cadee")
    // console.log(amigo.currentState)
    requestAnimationFrame(gameUpdate)
}
amigo.changeState("patrol")
requestAnimationFrame(gameUpdate)