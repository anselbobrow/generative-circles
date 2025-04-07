import { Point } from "./customTypes";
import Planet from "./Planet";

export default class Moon {
    public size: number;
    public planet: Planet;
    private angle: number;
    private swapDirection: boolean;

    constructor(size: number, angle: number, planet: Planet) {
        this.size = size;
        this.planet = planet;
        if (angle < 0 || angle > 360) {
            throw new Error("Angle must be a valid value in degrees.");
        }
        this.angle = angle;
        this.swapDirection = Math.random() < 0.5;
    }

    public rotate(deg: number) {
        if (this.swapDirection) {
            this.angle -= deg;
        } else {
            this.angle += deg;
        }

        if (this.angle >= 360) {
            this.angle -= 360;
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
