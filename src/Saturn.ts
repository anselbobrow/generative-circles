import { Alpha, DARK_SHADE_HSV, HSV, LIGHT_SHADE_HSV, Point, Theme } from "./customTypes";
import P5Circle from "./P5Circle";
import Planet from "./Planet";

export default class Saturn extends Planet {
    constructor(pos: Point, size: number, theme: Theme, color: HSV) {
        super(pos, size, theme, color);
        this.generateCircles();
    }

    private generateCircles() {
        // circles need to be listed in size order to render correctly
        let nucleusColor: HSV = (this.theme === Theme.DARK ? DARK_SHADE_HSV : LIGHT_SHADE_HSV);

        let ring3 = new P5Circle(this.pos, this.size * 2, this.color);
        ring3.alpha = new Alpha(0.1);
        // ring3.stroke = this.color;
        // ring3.strokeWeight = 2;
        this.circles.push(ring3);

        let ring2 = new P5Circle(this.pos, this.size, this.color);
        ring2.alpha = new Alpha(0.6);
        ring2.stroke = this.color;
        ring2.strokeWeight = 2;
        this.circles.push(ring2);

        let ring1 = new P5Circle(this.pos, (this.size / 5) * 2, this.color);
        this.circles.push(ring1);

        // nucleus
        this.circles.push(new P5Circle(this.pos, this.size / 5, nucleusColor));
    }
}