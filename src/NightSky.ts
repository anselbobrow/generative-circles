import * as p5 from "p5";
import { HSV, LIGHT_SHADE_HSV, Point, Theme } from "./customTypes";
import Planet from "./Planet";
import Saturn from "./Saturn";
import BinaryStar from "./BinaryStar";
import Moon from "./Moon";

export default class NightSky {
    public allPlanets: Planet[] = [];
    public allMoons: Moon[] = [];
    public numPlanets: number;
    public colors: HSV[];

    constructor(numPlanets: number, colors: HSV[]) {
        this.numPlanets = numPlanets;
        this.colors = colors;
    }

    public generateRandom(p: p5) {
        // add Saturns
        for (let i = 0; i < this.numPlanets; i++) {
            const pos = this.getRandomPos(p);
            const size = this.scaleExponential(p.random());
            const theme = p.random([Theme.DARK, Theme.LIGHT]);
            const saturn = new Saturn(pos, size, theme, p.random(this.colors));
            this.allPlanets.push(saturn);
        }

        // add BinaryStars
        for (let i = 0; i < 1; i++) {
            const pos = this.getRandomPos(p);
            const size = this.scaleExponential(p.random());
            const theme = p.random([Theme.DARK, Theme.LIGHT]);
            const angle = Math.random() * 360;
            const binaryStar = new BinaryStar(
                pos,
                size,
                angle,
                theme,
                p.random(this.colors),
            );
            this.allPlanets.push(binaryStar);
        }
    }

    public generateRandomNoOverlap(p: p5) {
        // add Saturns
        for (let i = 0; i < this.numPlanets; i++) {
            const size = this.scaleExponential(p.random());
            let pos: Point;
            let isOverlap = true;
            while (isOverlap) {
                pos = this.getRandomPos(p);
                if (this.allPlanets.length == 0) {
                    isOverlap = false;
                } else {
                    const overlapByPlanet = new Array(this.allPlanets.length).fill(
                        true,
                    );
                    this.allPlanets.forEach((planet, idx) => {
                        const dx = pos.x - planet.pos.x;
                        const dy = pos.y - planet.pos.y;
                        const d = Math.sqrt(dx ** 2 + dy ** 2);
                        if (d > (planet.size + size) / 2) {
                            overlapByPlanet[idx] = false;
                        }
                    });
                    isOverlap = !overlapByPlanet.every((item) => !item);
                }
            }
            const theme = p.random([Theme.DARK, Theme.LIGHT]);
            const saturn = new Saturn(pos, size, theme, p.random(this.colors));
            this.allPlanets.push(saturn);

            if (size > 150) {
                // console.log("generating moon");
                const angle = Math.random() * 360;
                const moon = new Moon(50, angle, saturn);
                this.allMoons.push(moon);
            }
        }

        // add BinaryStars
        for (let i = 0; i < 1; i++) {
            const pos = this.getRandomPos(p);
            const size = this.scaleExponential(p.random());
            const theme = p.random([Theme.DARK, Theme.LIGHT]);
            const angle = Math.random() * 360;
            const binaryStar = new BinaryStar(
                pos,
                size,
                angle,
                theme,
                p.random(this.colors),
            );
            this.allPlanets.push(binaryStar);
        }
    }

    public renderPlanets(p: p5) {
        this.allPlanets.forEach((planet) => {
            if (planet instanceof BinaryStar) {
                planet.rotate(0.2);
            }

            planet.circles.forEach((circle) => {
                // set fill color and transparency
                const { h, s, v } = circle.fill;

                let a: number;
                if (circle.alpha != null) {
                    a = circle.alpha.val;
                } else {
                    a = 1;
                }

                p.fill(h, s, v, a);

                // set stroke
                if (circle.stroke != null) {
                    const { h, s, v } = circle.stroke;
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

    public renderMoons(p: p5) {
        this.allMoons.forEach((moon) => {
            const { x, y } = moon.pos;
            const { h, s, v } = LIGHT_SHADE_HSV;
            p.fill(h, s, v);
            p.noStroke();
            p.circle(x, y, moon.size);
            moon.rotate(0.3);
        });
    }

    // public renderConnections(p: p5) {
    //     const size = this.allPlanets.length;
    //     const E: [[number]] = [[]];
    // }

    private getRandomPos(p: p5): Point {
        const pos: Point = {
            x: p.randomGaussian(p.windowWidth / 2, p.windowWidth / 8),
            y: p.randomGaussian(p.windowHeight / 2, p.windowHeight / 8),
        };
        return pos;
    }

    private scaleExponential(x: number): number {
        if (x < 0 || x > 1) {
            throw new RangeError(
                "scaleExponential: invalid input (not between 0 and 1)",
            );
        }

        // visualization -> https://www.desmos.com/calculator/4yuqvam6k4
        // const y = (170 * Math.pow(x, 5)) + (46 * x) + 10;
        const y = 170 * Math.pow(x, 5) + 46 * x + 50;
        return y;
    }
}
