// Create a Paper.js Path to draw a line into it:
var path = new Path();
// Give the stroke a color
path.strokeColor = 'black';
var start = new Point(100, 100);
// Move to start and draw a line from there
path.moveTo(start);
// Note the plus operator on Point objects.
// PaperScript does that for us, and much more!
path.lineTo(start + [100, -50]);
var topLeft = new Point(100, 100);
var rectSize = new Size(200, 100);
var rect = new Rectangle(topLeft, rectSize);
rect.fillColor = 'black';
console.log(rect); // { x: 10, y: 20, width: 200, height: 100 }
console.log(rect.point); // { x: 10, y: 20 }
console.log(rect.size);
rect.onMouseEnter = function (event) {
    console.log('enter');
    this.fillColor = 'red';
}
rect.onMouseLeave = function (event) {
    this.fillColor = 'black';
}