import {
    Point,
    Theme,
    HSV,
    Alpha,
    DARK_SHADE_HSV,
    LIGHT_SHADE_HSV,
} from "./customTypes";
import P5Circle from "./P5Circle";
import Planet from "./Planet";

export default class BinaryStar extends Planet {
    private angle: number;
    private radius: number;
    private swapDirection: boolean;

    constructor(
        pos: Point,
        size: number,
        angle: number,
        theme: Theme,
        color: HSV,
    ) {
        super(pos, size, theme, color);
        if (angle < 0 || angle > 360) {
            throw new Error("Angle must be a valid value in degrees.");
        }
        this.angle = angle;
        this.swapDirection = Math.random() < 0.5;
        this.generateCircles();
    }

    private generateCircles() {
        const offset = this.size * 0.25;
        this.radius = Math.sqrt(2 * offset * offset);

        const themeColor: HSV =
            this.theme === Theme.DARK ? DARK_SHADE_HSV : LIGHT_SHADE_HSV;

        const starA = new P5Circle(this.pos, this.size, this.color);
        const starB = new P5Circle(this.pos, this.size, themeColor);

        starA.alpha = starB.alpha = new Alpha(0.5);

        this.circles.push(starA);
        this.circles.push(starB);

        // initializes location with respect to angle
        this.rotate(0);
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

        const angle = this.angle * (Math.PI / 180);
        const { x, y } = this.pos;

        const dx = this.radius * Math.sin(angle);
        const dy = this.radius * Math.cos(angle);

        this.circles[0].x = x + dx;
        this.circles[0].y = y + dy;

        this.circles[1].x = x - dx;
        this.circles[1].y = y - dy;
    }
}
