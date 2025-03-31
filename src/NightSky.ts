import * as p5 from "p5";
import { HSV, LIGHT_SHADE_HSV, Point, Theme } from "./customTypes";
import Planet from "./Planet";
import Saturn from "./Saturn";
import BinaryStar from "./BinaryStar";
import Moon from "./Moon";

export default class NightSky {
    allPlanets: Planet[];
    allMoons: Moon[];
    numPlanets: number;
    colors: HSV[];

    constructor(numPlanets: number, colors: HSV[]) {
        this.numPlanets = numPlanets;
        this.colors = colors;
    }

    public generateRandom(p: p5) {
        let allPlanets: Planet[] = [];

        // add Saturns
        for (let i = 0; i < this.numPlanets; i++) {
            let pos = this.getRandomPos(p);
            let size = this.scaleExponential(p.random());
            let theme = p.random([Theme.DARK, Theme.LIGHT]);
            let saturn = new Saturn(pos, size, theme, p.random(this.colors));
            allPlanets.push(saturn);
        }

        // add BinaryStars
        for (let i = 0; i < 1; i++) {
            let pos = this.getRandomPos(p);
            let size = this.scaleExponential(p.random());
            let theme = p.random([Theme.DARK, Theme.LIGHT]);
            let binaryStar = new BinaryStar(
                pos,
                size,
                theme,
                p.random(this.colors),
            );
            allPlanets.push(binaryStar);
        }

        this.allPlanets = allPlanets;
    }

    public generateRandomNoOverlap(p: p5) {
        let allPlanets: Planet[] = [];
        let allMoons: Moon[] = [];

        // add Saturns
        for (let i = 0; i < this.numPlanets; i++) {
            let size = this.scaleExponential(p.random());
            let pos: Point;
            let isOverlap = true;
            while (isOverlap) {
                pos = this.getRandomPos(p);
                if (allPlanets.length == 0) {
                    isOverlap = false;
                } else {
                    let overlapByPlanet = new Array(allPlanets.length).fill(
                        true,
                    );
                    allPlanets.forEach((planet, idx) => {
                        let dx = pos.x - planet.pos.x;
                        let dy = pos.y - planet.pos.y;
                        let d = Math.sqrt(dx ** 2 + dy ** 2);
                        if (d > (planet.size + size) / 2) {
                            overlapByPlanet[idx] = false;
                        }
                    });
                    isOverlap = !overlapByPlanet.every((item) => !item);
                }
            }
            let theme = p.random([Theme.DARK, Theme.LIGHT]);
            let saturn = new Saturn(pos, size, theme, p.random(this.colors));
            allPlanets.push(saturn);

            if (size > 150) {
                console.log("generating moon");
                let moon = new Moon(50, saturn);
                allMoons.push(moon);
            }
        }

        // add BinaryStars
        for (let i = 0; i < 1; i++) {
            let pos = this.getRandomPos(p);
            let size = this.scaleExponential(p.random());
            let theme = p.random([Theme.DARK, Theme.LIGHT]);
            let binaryStar = new BinaryStar(
                pos,
                size,
                theme,
                p.random(this.colors),
            );
            allPlanets.push(binaryStar);
        }

        this.allPlanets = allPlanets;
        this.allMoons = allMoons;
    }

    public renderPlanets(p: p5) {
        this.allPlanets.forEach((planet) => {
            planet.circles.forEach((circle) => {
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

    public renderMoons(p: p5) {
        this.allMoons.forEach((moon) => {
            let { x, y } = moon.pos;
            let { h, s, v } = LIGHT_SHADE_HSV;
            p.fill(h, s, v);
            p.circle(x, y, moon.size);
            moon.rotate(0.3);
        });
    }

    // public renderConnections(p: p5) {
    //     let size = this.allPlanets.length;
    //     let E: [[number]] = [[]];
    // }

    private getRandomPos(p: p5): Point {
        let pos: Point = {
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
        // let y = (170 * Math.pow(x, 5)) + (46 * x) + 10;
        let y = 170 * Math.pow(x, 5) + 46 * x + 50;
        return y;
    }
}
