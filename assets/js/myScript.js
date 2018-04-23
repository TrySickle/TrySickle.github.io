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
var rectangle = new Rectangle(new Point(50, 50), new Point(150, 100));
var cornerSize = new Size(20, 20);
var path2 = new Path.RoundRectangle(rectangle, cornerSize);
path2.fillColor = 'black';
rect.onMouseEnter = function (event) {
    console.log('enter');
    this.fillColor = 'red';
}
rect.onMouseLeave = function (event) {
    this.fillColor = 'black';
}