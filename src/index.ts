import * as p5 from 'p5';

export const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background('#0C132D');

        p.noStroke();
        const colors = ['#f9b8b1', '#25388e', '#57dbd8', '#f84791'];

        const numCircles = p.random(5, 15);
        let diameters = "";

        for (let i = 0; i < numCircles; i++) {
            p.fill(p.random(colors));
            let d = quadraticDiameter(p.random());
            diameters += d.toFixed() + ", ";

            p.circle(p.randomGaussian(p.windowWidth / 2, p.windowWidth / 8), p.randomGaussian(p.windowHeight / 2, p.windowWidth / 8), d);
        }

        // diameters of all displayed circles
        console.log("# circles: " + numCircles.toFixed());
        console.log("diameters: " + diameters);

        console.log("[test] ensure no super tiny circles");
        for (let i = 0; i < 1000; i++) {
            let exp = quadraticDiameter(p.random());
            if (exp < 10) {
                console.log("fail");
                break;
            }
            if (i == 999) {
                console.log("pass");
            }
        }
    }

    p.draw = () => {
    }
}

const quadraticDiameter = (x: number) => {
    if (x < 0 || x > 1) {
        console.error("quadraticDiameter: invalid input");
        return;
    }

    // visualization -> https://www.desmos.com/calculator/4yuqvam6k4
    let scaledSeed = (170 * Math.pow(x, 5)) + (46 * x) + 10;
    return scaledSeed;
}

export const myp5 = new p5(sketch, document.body);