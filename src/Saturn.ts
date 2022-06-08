import { HSV, Point } from "./customTypes";
import P5Circle from "./P5Circle";
import Planet, { Theme } from "./Planet";

export default class Saturn extends Planet {
    constructor(pos: Point, size: number, theme: Theme, color: HSV) {
        super(pos, size, theme, color);
        this.generateCircles();
    }

    private generateCircles() {
        this.circles.push(new P5Circle(this.pos, this.size, this.color));
    }
}