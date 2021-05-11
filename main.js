import { Inimigo } from "./Inimigo.js"
import { Amigo } from "./Amigo.js"
import { WayPoint } from "./WayPoint.js"

Math.distance = (xa, ya, xb, yb) => {
    const x = xb - xa;
    const y = yb - ya;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

class GameManager {
    static canvas = document.createElement("canvas")
    static ctx = GameManager.canvas.getContext("2d")

    static amigo = new Amigo();
    static inimigo = new Inimigo();

    static initialized = false
    static wayPoints = new Set()

    static init() {
        if (GameManager.initialized)
            return
        GameManager.initialized = true
        GameManager.canvas.width = 800
        GameManager.canvas.height = 700
        document.body.append(GameManager.canvas)
        GameManager._gameUpdate()
        GameManager.wayPoints.add(new WayPoint(1, 10, 100, 6, 6, 6))
        GameManager.wayPoints.add(new WayPoint(2, 600, 100, 6, 6, 0))
        GameManager.wayPoints.add(new WayPoint(3, 600, 500, 6, 6, 6))
        GameManager.wayPoints.add(new WayPoint(4, 10, 400, 6, 6, 0))
        GameManager.wayPoints.add(new WayPoint(5, 250, 200, 6, 6, 6))
        GameManager.wayPoints.add(new WayPoint(6, 350, 200, 6, 6, 0))
        GameManager.wayPoints.add(new WayPoint(7, 350, 270, 6, 6, 6))

    }

    static _gameUpdate(time) {
        const loop = () => {
            GameManager.ctx.clearRect(0, 0, GameManager.canvas.width, GameManager.canvas.height)
            GameManager.amigo.drawAgente(GameManager.ctx)
            GameManager.inimigo.drawAgente(GameManager.ctx)
            GameManager.amigo.adversario = GameManager.Inimigo
            GameManager.inimigo.mudarEstados()
            GameManager.amigo.mudarEstados()

            GameManager.wayPoints.forEach(wayPoint => {
                wayPoint.desenhaPontos(GameManager.ctx)
            })

            // GameManager.amigo.verificaColisao(GameManager.inimigo)
            // GameManager.inimigo.atacar(GameManager.amigo)

            requestAnimationFrame(loop)
        }

        requestAnimationFrame(loop)
    }
}

GameManager.init()