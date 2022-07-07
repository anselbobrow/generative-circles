import { Point, Theme, HSV, Alpha, DARK_SHADE_HSV, LIGHT_SHADE_HSV } from "./customTypes";
import P5Circle from "./P5Circle";
import Planet from "./Planet";

export default class BinaryStar extends Planet {
    constructor(pos: Point, size: number, theme: Theme, color: HSV) {
        super(pos, size, theme, color);
        this.generateCircles();
    }

    private generateCircles() {
        let posA = { ...this.pos };
        let posB = { ...this.pos };

        posA.x -= this.size * 0.25;
        posA.y -= this.size * 0.25;

        posB.x += this.size * 0.25;
        posB.y += this.size * 0.25;

        let themeColor: HSV = (this.theme === Theme.DARK ? DARK_SHADE_HSV : LIGHT_SHADE_HSV);

        let starA = new P5Circle(posA, this.size, this.color);
        let starB = new P5Circle(posB, this.size, themeColor);

        starA.alpha = starB.alpha = new Alpha(0.5);

        this.circles.push(starA);
        this.circles.push(starB);
    }
}