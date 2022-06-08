import { HSV, Point } from "./customTypes";
import P5Circle from "./P5Circle";
const { utils: { cspace } } = require("prismaek");

export enum Theme {
    DARK,
    LIGHT,
}

export default class Planet {
    protected pos: Point;
    protected size: number;
    protected theme: Theme;
    protected color: HSV;
    circles: P5Circle[] = [];

    constructor(pos: Point, size: number, theme: Theme, color: HSV) {
        this.pos = pos;
        this.size = size;
        this.theme = theme;
        this.color = color;
    }
}