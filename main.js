import { Inimigo } from "./Inimigo.js"
import { Amigo } from "./Amigo.js"
import { WayPoint } from "./WayPoint.js"

Math.distance = (xa, ya, xb, yb) => {
    const x = xb - xa;
    const y = yb - ya;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

export class GameManager {
    static canvas = document.createElement("canvas")
    static ctx = GameManager.canvas.getContext("2d")

    static amigo = new Amigo();
    static inimigo = new Inimigo();

    static initialized = false
    static wayPoints = []

    static init() {
        if (GameManager.initialized)
            return
        GameManager.initialized = true
        GameManager.canvas.width = 800
        GameManager.canvas.height = 700
        document.body.append(GameManager.canvas)
        GameManager._gameUpdate()

        //array de pontos para waypoint
        GameManager.wayPoints.push(new WayPoint(1, 10, 100, 6, 6, 6))
        GameManager.wayPoints.push(new WayPoint(2, 600, 100, 6, 6, 0))
        GameManager.wayPoints.push(new WayPoint(3, 600, 500, 6, 6, 6))
        GameManager.wayPoints.push(new WayPoint(4, 10, 400, 6, 6, 0))
        GameManager.wayPoints.push(new WayPoint(5, 250, 200, 6, 6, 6))
        GameManager.wayPoints.push(new WayPoint(6, 350, 200, 6, 6, 0))
        GameManager.wayPoints.push(new WayPoint(7, 350, 270, 6, 6, 6))

        GameManager.inimigo.setWayPoints(GameManager.wayPoints)

    }

    static diffTime = 0

    static _gameUpdate() {

        let prevTime = 0
        GameManager.diffTime = 0
        const loop = (time) => {
            GameManager.diffTime = time - prevTime

            // desenhação das cosas no canvas
            GameManager.ctx.clearRect(0, 0, GameManager.canvas.width, GameManager.canvas.height)

            GameManager.amigo.drawAgente(GameManager.ctx)
            GameManager.inimigo.drawAgente(GameManager.ctx)

            GameManager.wayPoints.forEach(wayPoint => {
                wayPoint.desenhaPontos(GameManager.ctx)
            })


            // define quem são os adversários
            GameManager.amigo.adversario = GameManager.Inimigo
            GameManager.wayPoints.adversario = GameManager.Inimigo

            //As ações vão ser chamadas aqui 
            GameManager.inimigo.mudarEstados()
            GameManager.amigo.mudarEstados()

            // GameManager.amigo.verificaColisao(GameManager.inimigo)
            // GameManager.inimigo.atacar(GameManager.amigo)


            prevTime = time
            requestAnimationFrame(loop)
        }

        requestAnimationFrame(loop)
    }
}

GameManager.init()