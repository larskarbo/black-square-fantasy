

const perturb = (degree) => ((Math.random() - 0.5) * ((65 + 2 * degree) * 1));

export default class Square {
    constructor(props) {
        this.ctx = props.ctx

        const { x, y, size } = props

        this.center = {
            x: x + size / 2,
            y: y + size / 2
        }

        this.coords = {
            x1: x,
            y1: y,
            x2: x + size,
            y2: y,
            x3: x + size,
            y3: y + size,
            x4: x,
            y4: y + size
        };


        this.wonkyCoords = this.getWonky(10)
    }

    getWonky(degree) {
        const wonkyCoords = {}
        for (const prop in this.coords) {
            wonkyCoords[prop] = this.coords[prop] + perturb(degree)
        }
        return wonkyCoords
    }

    render(distance, tween) {
        const { ctx, coords, wonkyCoords } = this
        const dist = Math.min(1, distance / 600)

        const lightSourceDistance = 1000 - 999 * tween
        const lightOnThisSquare = 1 - (distance / lightSourceDistance)

        const howManySquares = Math.max(Math.floor(distance / 50), 1)

        // for (let i = 0; i < howManySquares; i++) {
        // const useCoords = this.tweenSquares(coords, this.getWonky((howManySquares / 5)), dist)
        const useCoords = this.tweenSquares(coords, this.wonkyCoords, easingEffects.easeInSine(dist))

        ctx.beginPath()
        ctx.strokeStyle = `rgba(255,255,255,${this.tween(0, 1, lightOnThisSquare * 1)})`
        ctx.lineWidth = this.tween(4 + 400 * tween, 2 - 1 * tween, lightOnThisSquare)
        ctx.moveTo(useCoords.x1, useCoords.y1)
        ctx.lineTo(useCoords.x2, useCoords.y2)
        ctx.lineTo(useCoords.x3, useCoords.y3)
        ctx.lineTo(useCoords.x4, useCoords.y4)
        ctx.closePath()
        ctx.stroke()
        // }
    }

    easeInOutExpo(t) {
        if (t === 0) {
            return 0
        }
        if (t === 1) {
            return 1
        }
        if ((t /= 1 / 2) < 1) {
            return 1 / 2 * Math.pow(2, 10 * (t - 1))
        }
        return 1 / 2 * (-Math.pow(2, -10 * --t) + 2)
    }

    tweenSquares(square1, square2, progress) {
        const out = {}
        for (const prop in square1) {
            out[prop] = square1[prop] + (square2[prop] - square1[prop]) * progress
        }
        return out
    }

    tween(v1, v2, progress) {
        return v1 + (v2 - v1) * progress
    }
}

const easingEffects = {
    linear: function (t) {
        return t
    },
    easeInQuad: function (t) {
        return t * t
    },
    easeOutQuad: function (t) {
        return -1 * t * (t - 2)
    },
    easeInOutQuad: function (t) {
        if ((t /= 1 / 2) < 1) {
            return 1 / 2 * t * t
        }
        return -1 / 2 * ((--t) * (t - 2) - 1)
    },
    easeInCubic: function (t) {
        return t * t * t
    },
    easeOutCubic: function (t) {
        return 1 * ((t = t / 1 - 1) * t * t + 1)
    },
    easeInOutCubic: function (t) {
        if ((t /= 1 / 2) < 1) {
            return 1 / 2 * t * t * t
        }
        return 1 / 2 * ((t -= 2) * t * t + 2)
    },
    easeInQuart: function (t) {
        return t * t * t * t
    },
    easeOutQuart: function (t) {
        return -1 * ((t = t / 1 - 1) * t * t * t - 1)
    },
    easeInOutQuart: function (t) {
        if ((t /= 1 / 2) < 1) {
            return 1 / 2 * t * t * t * t
        }
        return -1 / 2 * ((t -= 2) * t * t * t - 2)
    },
    easeInQuint: function (t) {
        return 1 * (t /= 1) * t * t * t * t
    },
    easeOutQuint: function (t) {
        return 1 * ((t = t / 1 - 1) * t * t * t * t + 1)
    },
    easeInOutQuint: function (t) {
        if ((t /= 1 / 2) < 1) {
            return 1 / 2 * t * t * t * t * t
        }
        return 1 / 2 * ((t -= 2) * t * t * t * t + 2)
    },
    easeInSine: function (t) {
        return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1
    },
    easeOutSine: function (t) {
        return 1 * Math.sin(t / 1 * (Math.PI / 2))
    },
    easeInOutSine: function (t) {
        return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1)
    },
    easeInExpo: function (t) {
        return (t === 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1))
    },
    easeOutExpo: function (t) {
        return (t === 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1)
    },
    easeInOutExpo: function (t) {
        if (t === 0) {
            return 0
        }
        if (t === 1) {
            return 1
        }
        if ((t /= 1 / 2) < 1) {
            return 1 / 2 * Math.pow(2, 10 * (t - 1))
        }
        return 1 / 2 * (-Math.pow(2, -10 * --t) + 2)
    },
    easeInCirc: function (t) {
        if (t >= 1) {
            return t
        }
        return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1)
    },
    easeOutCirc: function (t) {
        return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t)
    },
    easeInOutCirc: function (t) {
        if ((t /= 1 / 2) < 1) {
            return -1 / 2 * (Math.sqrt(1 - t * t) - 1)
        }
        return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1)
    },
    easeInElastic: function (t) {
        var s = 1.70158
        var p = 0
        var a = 1
        if (t === 0) {
            return 0
        }
        if ((t /= 1) === 1) {
            return 1
        }
        if (!p) {
            p = 1 * 0.3
        }
        if (a < Math.abs(1)) {
            a = 1
            s = p / 4
        } else {
            s = p / (2 * Math.PI) * Math.asin(1 / a)
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p))
    },
    easeOutElastic: function (t) {
        var s = 1.70158
        var p = 0
        var a = 1
        if (t === 0) {
            return 0
        }
        if ((t /= 1) === 1) {
            return 1
        }
        if (!p) {
            p = 1 * 0.3
        }
        if (a < Math.abs(1)) {
            a = 1
            s = p / 4
        } else {
            s = p / (2 * Math.PI) * Math.asin(1 / a)
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1
    },
    easeInOutElastic: function (t) {
        var s = 1.70158
        var p = 0
        var a = 1
        if (t === 0) {
            return 0
        }
        if ((t /= 1 / 2) === 2) {
            return 1
        }
        if (!p) {
            p = 1 * (0.3 * 1.5)
        }
        if (a < Math.abs(1)) {
            a = 1
            s = p / 4
        } else {
            s = p / (2 * Math.PI) * Math.asin(1 / a)
        }
        if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p))
        }
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * 0.5 + 1
    },
    easeInBack: function (t) {
        var s = 1.70158
        return 1 * (t /= 1) * t * ((s + 1) * t - s)
    },
    easeOutBack: function (t) {
        var s = 1.70158
        return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1)
    },
    easeInOutBack: function (t) {
        var s = 1.70158
        if ((t /= 1 / 2) < 1) {
            return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s))
        }
        return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2)
    },
    easeInBounce: function (t) {
        return 1 - helpers.easingEffects.easeOutBounce(1 - t)
    },
    easeOutBounce: function (t) {
        if ((t /= 1) < (1 / 2.75)) {
            return 1 * (7.5625 * t * t)
        } else if (t < (2 / 2.75)) {
            return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)
        } else if (t < (2.5 / 2.75)) {
            return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)
        }
        return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)
    },
    easeInOutBounce: function (t) {
        if (t < 1 / 2) {
            return helpers.easingEffects.easeInBounce(t * 2) * 0.5
        }
        return helpers.easingEffects.easeOutBounce(t * 2 - 1) * 0.5 + 1 * 0.5
    }
}