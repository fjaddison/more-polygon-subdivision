let polys = []
let count = 0
let sqr

function setup() {
    createCanvas(1000, 1000)
    background(240)
    strokeWeight(1)
    sqr = new Polygon(
        50, 50, 
        width - 50, 50, 
        width - 50, height - 50, 
        50, width - 50
    )
    polys.push(sqr)
    frameRate(5)
}

function draw() {
    if (count < 15) {
        polys.map((p, i) => {
            p.split()
            fill(random(255))
            p.render()
            polys.splice(i, 1)
        })
    } else {
        noLoop()
    }
    count += 1
}

class Polygon {
    constructor(x1, y1, x2, y2, x3, y3, x4, y4) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
        this.x3 = x3
        this.y3 = y3
        this.x4 = x4
        this.y4 = y4
    }

    // check if one side is bigger than the other 
    // to determine which way to split
    split() {
        let x5, y5, x6, y6, poly1, poly2
        let randDist1 = random(0.4, 0.6)
        let randDist2 = random(0.4, 0.6)

        // check if the average of two parallel sides is greater than the average of the perpendicular sides
        if (
            (dist(this.x1, this.y1, this.x2, this.y2) + dist(this.x3, this.y3, this.x4, this.y4)) / 2
            >
            (dist(this.x2, this.y2, this.x3, this.y3) + dist(this.x1, this.y1, this.x4, this.y4)) / 2
        ) {
            x5 = lerp(this.x1, this.x2, randDist1)
            y5 = lerp(this.y1, this.y2, randDist1)
            x6 = lerp(this.x4, this.x3, randDist2)
            y6 = lerp(this.y4, this.y3, randDist2)

            poly1 = new Polygon(this.x1, this.y1, x5, y5, x6, y6, this.x4, this.y4)
            poly2 = new Polygon(x5, y5, this.xy, this.y2, this.x3, this.y3, x6, y6)

        } else {
            x5 = lerp(this.x1, this.x4, randDist1)
            y5 = lerp(this.y1, this.y4, randDist1)
            x6 = lerp(this.x2, this.x3, randDist2)
            y6 = lerp(this.y2, this.y3, randDist2)

            poly1 = new Polygon(this.x1, this.y1, this.x2, this.y2, x6, y6, x5, y5)
            poly2 = new Polygon(x6, y6, this.x3, this.y3, this.x4, this.y4, x5, y5)
        }

        polys.push(poly1)
        polys.push(poly2)
    }

    render() {
        beginShape()
        vertex(this.x1, this.y1)
        vertex(this.x2, this.y2)
        vertex(this.x3, this.y3)
        vertex(this.x4, this.y4)
        endShape(CLOSE)
    }
}
