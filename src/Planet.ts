import { HSV, Point, Theme } from "./customTypes";
import P5Circle from "./P5Circle";

export default class Planet {
    public pos: Point;
    public size: number;
    public theme: Theme;
    public color: HSV;
    public circles: P5Circle[] = [];

    constructor(pos: Point, size: number, theme: Theme, color: HSV) {
        this.pos = pos;
        this.size = size;
        this.theme = theme;
        this.color = color;
    }
}