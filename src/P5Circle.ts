import { Alpha, HSV, Point } from "./customTypes";

export default class P5Circle {
    x: number;
    y: number;
    d: number;
    fill: HSV;
    stroke: HSV;
    strokeWeight: number;
    alpha: Alpha;

    constructor(
        pos: Point,
        d: number,
        fill: HSV,
        stroke: HSV = null,
        strokeWeight: number = null,
        alpha: Alpha = null,
    ) {
        this.x = pos.x;
        this.y = pos.y;
        this.d = d;
        this.fill = fill;
        this.stroke = stroke;
        this.strokeWeight = strokeWeight;
        this.alpha = alpha;
    }
}
