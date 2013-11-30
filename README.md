# svg-path

Parse and manipulate SVG `<path>`s.

[![Build status](https://travis-ci.org/PPvG/svg-path.png?branch=master)](https://travis-ci.org/PPvG/svg-path)

## Usage example

    var svgPath = require('svg-path')

    var pathData = 'm100,1e2C125,100 130,110 150,150l-25-75z'

    var path = svgPath(pathData) // creates a new svgPath.Path
    console.log(path.content)
    /*
        [
           { type: 'M', relative: false, x: 100, y: 100 },
           { type: 'C', relative: false,
             x1: 125, y1: 100, x2: 130, y2: 110, x: 150, y: 150 },
           { type: 'L', relative: true,  x: -25, y: -75 },
           { type: 'Z' }
        ]
    */

    // Apply transformations:

    path.abs()
    path.matrix(1, 0, 0, 1, 100, 50) // same as translate(100, 50)

    // Transformations are applied in-place. To retain the original, create a copy first:

    var newPath = path.copy()
