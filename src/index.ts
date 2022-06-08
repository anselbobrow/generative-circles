import * as p5 from 'p5';
import NightSky from './NightSky';
const { harmonies, utils: { xspace } } = require("prismaek");

export const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background('#0C132D');
        // use hsv with the same max vals as the prismaek library
        p.colorMode(p.HSB, 360, 1, 1);

        const numPlanets = p.random(5, 15);

        let colors: string[] = ['#f9b8b1', '#25388e', '#57dbd8', '#f84791'];
        let hsvColors = colors.map(c => xspace(c, "hsv"));

        let ns = new NightSky(numPlanets, hsvColors);
        ns.generateRandom(p);
        ns.render(p);
    }

    p.draw = () => {
    }
}

export const myp5 = new p5(sketch, document.body);