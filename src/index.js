
import * as d3 from 'd3'
import { tween } from 'shifty';
import Square from './Square'

export default class SquareFantasy {
    constructor() {
        this.margin = 30
        this.squareSize = 20

        
        this.canvas = document.getElementById('canvasmann')
        this.ctx = this.canvas.getContext('2d')

        this.boundingRect = this.canvas.getBoundingClientRect()
        this.canvas.width = this.boundingRect.width * 2
        this.canvas.height = this.boundingRect.height * 2

        this.squares = []

        this.createSquares()

        this.mouse = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        }

        // window.addEventListener('mousemove', e => {
            

        //     this.mouse = {
        //         x: (e.pageX - this.boundingRect.x) * 2,
        //         y: (e.pageY - this.boundingRect.y) * 2
        //     }

        //     // this.renderLoop()
        // })




        this.start = performance.now()
        this.renderLoop(0)
        this.six_svg()

        this.animDuration = 5000
        tween({
            from: { num: 0 },
            to: { num: 1 },
            duration: this.animDuration,
            easing: 'easeInCirc',
            step: ({num}) => {
                console.log(num)
                

                window.requestAnimationFrame(() => {
                    this.renderLoop(num)
                })
            }
        }).then(
            () => {
                console.log('fisished')
                window.requestAnimationFrame(() => {
                    this.renderLoop(1)
                })
            }
        );

    }

    createSquares() {
        const { width, height } = this.canvas
        const padding = 10

        const squaresX = Math.floor(width / ((this.margin * 2) + (this.squareSize* 2)))
        
        const squaresY = Math.floor(height / ((this.margin * 2) + (this.squareSize* 2)))
        

        for (let iy = 0; iy < squaresY; iy++) {
            for (let ix = 0; ix < squaresX; ix++) {
                this.squares.push(new Square({
                    x: padding + ix * ((this.margin * 2) + (this.squareSize* 2)),
                    y: padding + iy * ((this.margin * 2) + (this.squareSize* 2)),
                    size: this.squareSize * 2,
                    ctx: this.ctx
                }))
            }
        }
    }

    renderLoop(tween) {
        const { width, height } = this.canvas
        const { x, y } = this.mouse
        this.ctx.clearRect(0, 0, width, height)
        console.log(tween)
        this.squares.forEach(s => {
            const distance = Math.sqrt(Math.pow(s.center.x - x, 2) + Math.pow(s.center.y - y, 2))
            s.render(distance, tween)
        })
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
        let magnitude = square.column * 1.000001 // This line defines how the randomness spreads across the image
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
        const asdf = this.five_squarePositions()
        for (let i = 0; i < asdf.length; i++) {
            squarePositions.push(this.perturber(asdf[i]));
        };
        return squarePositions;
    }

    seven_squarePositions(){
        let squarePositions = [];
        const asdf = this.five_squarePositions()
        for (let i = 0; i < asdf.length; i++) {
            squarePositions.push(this.perturber(asdf[i]))
            // This is the new bit - a for loop that runs a number of times equal to the column number minus one.
            for (let j = 0; j < asdf[i].column; j++) {
                squarePositions.push(this.perturber(asdf[i]));
            }
        };
        return squarePositions;
    }

    six_svg(){
        const svg = document.getElementById('svgmann')

        // 
        // 
        d3.select(svg)
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

new SquareFantasy()