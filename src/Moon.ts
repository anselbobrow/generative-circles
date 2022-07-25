import { Point } from "./customTypes";
import Planet from "./Planet";

export default class Moon {
    public size: number;
    public planet: Planet;
    private angle: number;

    constructor(size: number, planet: Planet) {
        this.size = size;
        this.planet = planet;
        this.angle = 0;
    }

    public rotate(deg: number) {
        this.angle += deg;
        if (this.angle == 360) {
            this.angle = 0;
        }
    }

    public get pos(): Point {
        let orbitPath = this.planet.circles[0];
        let r = orbitPath.d / 2;
        let angle = this.angle * (Math.PI / 180);
        let { x, y } = this.planet.pos;
        x += r * Math.sin(angle);
        y += r * Math.cos(angle);
        return { x, y };
    }

}