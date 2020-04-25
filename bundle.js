import { select } from 'd3';

const perturb = (degree) => ((Math.random() - 0.5) * ((65 + 2 * degree) * 1));

class Square {
    constructor(props) {
        this.ctx = props.ctx;

        const { x, y, size } = props;

        this.center = {
            x: x + size / 2,
            y: y + size / 2
        };

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


        this.wonkyCoords = this.getWonky(10);
    }

    getWonky(degree) {
        const wonkyCoords = {};
        for (const prop in this.coords) {
            wonkyCoords[prop] = this.coords[prop] + perturb(degree);
        }
        return wonkyCoords
    }

    render(distance) {
        const { ctx, coords, wonkyCoords } = this;
        const dist = Math.min(1, distance / 1200);

        const lightSourceDistance = 1100;
        const lightOnThisSquare = 1 - (distance / lightSourceDistance);

        // for (let i = 0; i < howManySquares; i++) {
        // const useCoords = this.tweenSquares(coords, this.getWonky((howManySquares / 5)), dist)
        const useCoords = this.tweenSquares(coords, this.wonkyCoords, easingEffects.easeInSine(dist));

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${this.tween(0, 1, lightOnThisSquare * 1.1)})`;
        ctx.lineWidth = this.tween(2, 1, lightOnThisSquare);
        ctx.moveTo(useCoords.x1, useCoords.y1);
        ctx.lineTo(useCoords.x2, useCoords.y2);
        ctx.lineTo(useCoords.x3, useCoords.y3);
        ctx.lineTo(useCoords.x4, useCoords.y4);
        ctx.closePath();
        ctx.stroke();
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
        const out = {};
        for (const prop in square1) {
            out[prop] = square1[prop] + (square2[prop] - square1[prop]) * progress;
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
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t === 0) {
            return 0
        }
        if ((t /= 1) === 1) {
            return 1
        }
        if (!p) {
            p = 1 * 0.3;
        }
        if (a < Math.abs(1)) {
            a = 1;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(1 / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p))
    },
    easeOutElastic: function (t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t === 0) {
            return 0
        }
        if ((t /= 1) === 1) {
            return 1
        }
        if (!p) {
            p = 1 * 0.3;
        }
        if (a < Math.abs(1)) {
            a = 1;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(1 / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1
    },
    easeInOutElastic: function (t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t === 0) {
            return 0
        }
        if ((t /= 1 / 2) === 2) {
            return 1
        }
        if (!p) {
            p = 1 * (0.3 * 1.5);
        }
        if (a < Math.abs(1)) {
            a = 1;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(1 / a);
        }
        if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p))
        }
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * 0.5 + 1
    },
    easeInBack: function (t) {
        var s = 1.70158;
        return 1 * (t /= 1) * t * ((s + 1) * t - s)
    },
    easeOutBack: function (t) {
        var s = 1.70158;
        return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1)
    },
    easeInOutBack: function (t) {
        var s = 1.70158;
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
};

class SquareFantasy {
    constructor() {
        this.margin = 15;
        this.squareSize = 10;

        
        this.canvas = document.getElementById('canvasmann');
        this.ctx = this.canvas.getContext('2d');

        this.boundingRect = this.canvas.getBoundingClientRect();
        this.canvas.width = this.boundingRect.width * 2;
        this.canvas.height = this.boundingRect.height * 2;

        this.squares = [];

        this.createSquares();

        this.mouse = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        };

        window.addEventListener('mousemove', e => {
            

            this.mouse = {
                x: (e.pageX - this.boundingRect.x) * 2,
                y: (e.pageY - this.boundingRect.y) * 2
            };

            // this.renderLoop()
        });





        this.renderLoop();
        this.six_svg();



    }

    createSquares() {
        const { width, height } = this.canvas;
        const padding = 10;

        const squaresX = Math.floor(width / ((this.margin * 2) + (this.squareSize* 2)));
        
        const squaresY = Math.floor(height / ((this.margin * 2) + (this.squareSize* 2)));
        

        for (let iy = 0; iy < squaresY; iy++) {
            for (let ix = 0; ix < squaresX; ix++) {
                this.squares.push(new Square({
                    x: padding + ix * ((this.margin * 2) + (this.squareSize* 2)),
                    y: padding + iy * ((this.margin * 2) + (this.squareSize* 2)),
                    size: this.squareSize * 2,
                    ctx: this.ctx
                }));
            }
        }
    }

    renderLoop() {
        const { width, height } = this.canvas;
        const { x, y } = this.mouse;
        this.ctx.clearRect(0, 0, width, height);
        this.squares.forEach(s => {
            const distance = Math.sqrt(Math.pow(s.center.x - x, 2) + Math.pow(s.center.y - y, 2));
            s.render(distance);
        });
    }

    five_squarePositions(){
        let squarePositions = [];
        for (let i = 0; i < 40; i++) {
            for (let j = 0; j < 40; j++) {
                // At this point in the code i represents the column number and j is the row number
                let square = {
                    column: i, row: j,
                    x1: (this.margin * (i + 1) + this.squareSize * i),
                    y1: (this.margin * (j + 1) + this.squareSize * j),
                    x2: (this.margin * (i + 1) + this.squareSize * (i + 1)),
                    y2: (this.margin * (j + 1) + this.squareSize * j),
                    x3: (this.margin * (i + 1) + this.squareSize * (i + 1)),
                    y3: (this.margin * (j + 1) + this.squareSize * (j + 1)),
                    x4: (this.margin * (i + 1) + this.squareSize * i),
                    y4: (this.margin * (j + 1) + this.squareSize * (j + 1))
                };
                squarePositions.push(square);
            }
        }
        return squarePositions;
    }

    perturber(square){
        let magnitude = square.column * 1.000001; // This line defines how the randomness spreads across the image
        let perturb = () => ((Math.random() - 0.5) * (magnitude * 1)); // The line defines the size of the randomness
        let wonkySquare = {
            column: square.column, row: square.row,
            x1: square.x1 + perturb(),
            x2: square.x2 + perturb(),
            x3: square.x3 + perturb(),
            x4: square.x4 + perturb(),
            y1: square.y1 + perturb(),
            y2: square.y2 + perturb(),
            y3: square.y3 + perturb(),
            y4: square.y4 + perturb()
        };
        return wonkySquare;
    }

    six_squarePositions(){
        let squarePositions = [];
        const asdf = this.five_squarePositions();
        for (let i = 0; i < asdf.length; i++) {
            squarePositions.push(this.perturber(asdf[i]));
        }        return squarePositions;
    }

    seven_squarePositions(){
        let squarePositions = [];
        const asdf = this.five_squarePositions();
        for (let i = 0; i < asdf.length; i++) {
            squarePositions.push(this.perturber(asdf[i]));
            // This is the new bit - a for loop that runs a number of times equal to the column number minus one.
            for (let j = 0; j < asdf[i].column; j++) {
                squarePositions.push(this.perturber(asdf[i]));
            }
        }        return squarePositions;
    }

    six_svg(){
        const svg = document.getElementById('svgmann');

        // 
        // 
        select(svg)
            .selectAll("path")
            .data(this.six_squarePositions())
            .enter()
            .append("path")
            .attr("d", square => `M${square.x1} ${square.y1} L${square.x2} ${square.y2} L${square.x3} ${square.y3} L${square.x4} ${square.y4} Z`)
            .attr("stroke", "white")
            // .attr("strokeWidth", "10")
            .attr("fill", "none");

        return svg;
    }
}

new SquareFantasy();

export default SquareFantasy;
