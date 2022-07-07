const DARK_SHADE_HSV: HSV = { h: 340, s: 0.09, v: 0.13 };
const LIGHT_SHADE_HSV: HSV = { h: 340, s: 0, v: 1 };

interface HSV {
    h: number,
    s: number,
    v: number,
}

interface Point {
    x: number,
    y: number,
}

enum Theme {
    DARK,
    LIGHT,
}

class Alpha {
    private _val: number;

    constructor(val: number) {
        this.val = val;
    }

    public set val(v: number) {
        if (v < 0 || v > 1) {
            throw new RangeError("Alpha.val must be a value between 0 and 1")
        }

        this._val = v;
    }

    public get val() {
        return this._val;
    }
}

export { HSV, Alpha, Point, Theme, DARK_SHADE_HSV, LIGHT_SHADE_HSV };