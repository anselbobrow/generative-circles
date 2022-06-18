import * as p5 from "p5";
import { HSV, Point } from "./customTypes";
import Planet, { Theme } from "./Planet";
import Saturn from "./Saturn";

export default class NightSky {
    allPlanets: Planet[] = [];
    numPlanets: number;
    colors: HSV[];

    constructor(numPlanets: number, colors: HSV[]) {
        this.numPlanets = numPlanets;
        this.colors = colors;
    }

    public generateRandom(p: p5) {
        let allPlanets: Planet[] = [];
        for (let i = 0; i < this.numPlanets; i++) {
            let pos: Point = {
                x: p.randomGaussian(p.windowWidth / 2, p.windowWidth / 8),
                y: p.randomGaussian(p.windowHeight / 2, p.windowHeight / 8)
            };
            let size = this.scaleExponential(p.random());
            let saturn = new Saturn(pos, size, Theme.DARK, p.random(this.colors));
            allPlanets.push(saturn);
        }
        this.allPlanets = allPlanets;
    }

    public render(p: p5) {
        this.allPlanets.forEach(planet => {
            planet.circles.forEach(circle => {
                // set fill color and transparency
                let { h, s, v } = circle.fill;

                let a: number;
                if (circle.alpha != null) {
                    a = circle.alpha.val;
                } else {
                    a = 1;
                }

                p.fill(h, s, v, a);

                // set stroke
                if (circle.stroke != null) {
                    let { h, s, v } = circle.stroke;
                    p.stroke(h, s, v);
                    p.strokeWeight(circle.strokeWeight);
                } else {
                    p.noStroke();
                }

                // draw the circle
                p.circle(circle.x, circle.y, circle.d);
            });
        });
    }

    private scaleExponential(x: number): number {
        if (x < 0 || x > 1) {
            throw new RangeError("quadraticDiameter: invalid input (not between 0 and 1)");
        }

        // visualization -> https://www.desmos.com/calculator/4yuqvam6k4
        // let y = (170 * Math.pow(x, 5)) + (46 * x) + 10;
        let y = (170 * Math.pow(x, 5)) + (46 * x) + 50;
        return y;
    }

}