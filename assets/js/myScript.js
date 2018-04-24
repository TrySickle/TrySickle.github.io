var path = new Path();
// Give the stroke a color
path.strokeColor = 'black';
var start = new Point(100, 100);
// Move to start and draw a line from there
path.moveTo(start);
// Note the plus operator on Point objects.
// PaperScript does that for us, and much more!
path.lineTo(start + [100, -50]);
path.onMouseEnter = function (event) {
    console.log('enter lin');
}

var rectangle = new Rectangle(new Point(50, 50), new Point(view.size.width / 2, view.size.height / 2));
var path2 = new Path.Rectangle(rectangle);
path2.fillColor = 'black';
path2.onMouseEnter = function (event) {
    console.log('enter');
    this.fillColor = 'red';
}
path2.onMouseLeave = function (event) {
    this.fillColor = 'black';
}