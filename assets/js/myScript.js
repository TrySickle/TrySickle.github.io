// Path Arrays
var nodes = []; // the Path.Rectangles made from the corners and offset to be centered
var lines = []; // the Path.Lines to make connections
var descriptions = []; // the popup full descriptions
var descMeta = []; // the metadata within each description
var descTexts = []; // the texts within each description
var descImages = []; // the Rasters within each description

// Data Arrays
// Comics: Polar Bear, Backyard; Films: Man, Brock; Lit: Marx, Grapes; Digital Media: Species, Spore; Data: Cuba, Iraq; Open: Dutty, Boxes
var images = ["img1",
    "img2",
    "img3",
    "img4",
    "img5",
    "img6",
    "img7",
    "img8",
    "img9",
    "img10",
    "img11",
    "img12"];

var labels = ["Comics",
    "Films",
    "Literature",
    "Digital Media",
    "Data",
    "Open Media"];

var colors = ['#ff303a',
    '#ff303a',
    '#fc9a11',
    '#fc9a11',
    '#41f497',
    '#41f497',
    '#41aff4',
    '#41aff4',
    '#f8ff30',
    '#f8ff30',
    '#ff30f1',
    '#ff30f1'];

var texts = ["Chip Bok’s political comic plays off of Bernie Sander’s argument in a debate that climate change is directly related to the growth of terrorism, e.g. that climate change will cause water shortages, drought, and mass migration, creating a disgruntled, instable populace that will be easily swayed by radical groups. Bok criticizes the over-generalization of Sander’s argument and mocks his claim by using personification of nature and the popular image of polar bears losing their habitat due to climate change. Nature is thus used as a humorous counterpoint in a political argument.",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""];
var metadata = ["Greatest Threat to Bernie\nArtist: Chip Bok\nDate: 11/19/2015\nPublished: Chip Bok's\nEditorial Comics",
    "Arguments Against\nArtist: Joe Heller\nDate: 3/18/2011\nPublished: Green Bay\nPress Gazette",
                        "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""];

// Params
var x = view.size.width / 2;
var y = view.size.height / 2.2;
var radius = view.size.height > view.size.width ? view.size.width / 3 : view.size.height / 3;
var nodeLength = radius / 3;
var descLength = 5 * nodeLength;
var labelDist = 1.34;
var corners = [new Point(x + radius, y),
new Point(x + Math.cos(Math.PI / 6) * radius, y - Math.sin(Math.PI / 6) * radius),
new Point(x + Math.cos(Math.PI / 3) * radius, y - Math.sin(Math.PI / 3) * radius),
new Point(x, y - radius),
new Point(x - Math.cos(Math.PI / 3) * radius, y - Math.sin(Math.PI / 3) * radius),
new Point(x - Math.cos(Math.PI / 6) * radius, y - Math.sin(Math.PI / 6) * radius),
new Point(x - radius, y),
new Point(x - Math.cos(Math.PI / 6) * radius, y + Math.sin(Math.PI / 6) * radius),
new Point(x - Math.cos(Math.PI / 3) * radius, y + Math.sin(Math.PI / 3) * radius),
new Point(x, y + radius),
new Point(x + Math.cos(Math.PI / 6) * radius, y + Math.sin(Math.PI / 6) * radius),
new Point(x + Math.cos(Math.PI / 3) * radius, y + Math.sin(Math.PI / 3) * radius)];

var labelCorners = [new Point(x + Math.cos(Math.PI * 15 / 180) * radius * labelDist, y - Math.sin(Math.PI * 15 / 180) * radius * labelDist),
new Point(x + Math.cos(Math.PI * 75 / 180) * radius * labelDist, y - Math.sin(Math.PI * 75 / 180) * radius * labelDist),
new Point(x + Math.cos(Math.PI * 135 / 180) * radius * labelDist, y - Math.sin(Math.PI * 135 / 180) * radius * labelDist),
new Point(x + Math.cos(Math.PI * 195 / 180) * radius * labelDist, y - Math.sin(Math.PI * 195 / 180) * radius * labelDist),
new Point(x + Math.cos(Math.PI * 255 / 180) * radius * labelDist, y - Math.sin(Math.PI * 255 / 180) * radius * labelDist),
new Point(x + Math.cos(Math.PI * 315 / 180) * radius * labelDist, y - Math.sin(Math.PI * 315 / 180) * radius * labelDist)];

Raster.prototype.rescale = function (width, height) {
    this.scale(width / this.width, height / this.height);
};
var line = Path.Line(corners[0], corners[1]);
line.strokeColor = 'white';
line.strokeWidth = 7;
line.onMouseEnter = function (event) {
    var rect = new Rectangle(new Point(event.target.position.x + descLength, event.target.position.y - descLength), new Size(radius, radius));
    var fullDescription = new Path.Rectangle(rect);
    fullDescription.fillColor = '#717171';
    descriptions.push(fullDescription);
    var text = new PointText(rect.center);
    text.justification = 'center';
    text.fillColor = 'white';
    text.content = 'politics asdf lorem ipsum \ntext long long on glong';
    descTexts.push(text);
}
line.onMouseLeave = function (event) {
    var popped = descriptions.pop();
    popped.remove();
    var poppedText = descTexts.pop();
    poppedText.remove();
}
for (var i = 0; i < corners.length; i++) {
    var stroke = new Path.Rectangle(new Rectangle(corners[i] - nodeLength / 2, new Size(nodeLength, nodeLength)));
    stroke.strokeColor = colors[i];
    stroke.strokeWidth = colors[i] == '#41aff4' ? 7 : 5;
    var corner = new Raster(images[i]);
    corner.position = corners[i];
    corner.rescale(nodeLength, nodeLength);
    corner.onMouseEnter = function (event) {
        var rect;
        if (event.target.position.y > y) {
            rect = new Rectangle(new Point(event.target.position.x + 0.5 * nodeLength, event.target.position.y - 4.5 * nodeLength), new Size(descLength, descLength));
        } else {
            rect = new Rectangle(new Point(event.target.position.x + 0.5 * nodeLength, event.target.position.y - nodeLength), new Size(descLength, descLength));
        }
        var fullDescription = new Path.Rectangle(rect);
        fullDescription.fillColor = '#717171';
        descriptions.push(fullDescription);
        var meta = new PointText(new Point(rect.center.x, rect.center.y - .25 * descLength));
        meta.justification = 'left';
        meta.fillColor = 'white';
        meta.content = metadata[getIndex(event.target.position)];
        meta.fontSize = '.8em';
        descMeta.push(meta);
        var text = new PointText(new Point(rect.center.x - descLength / 2, rect.center.y + .1 * descLength));
        text.justification = 'left';
        text.fillColor = 'white';
        text.content = addLineBreaks(texts[getIndex(event.target.position)]);
        text.fontSize = '.8em';
        descTexts.push(text);
        var img = new Raster(event.target.image);
        var imgLength = descLength / 2;
        img.position = new Point(rect.center.x - 1 / 4 * descLength, rect.center.y - 1 / 4 * descLength);
        img.rescale(imgLength, imgLength);
        descImages.push(img);
    }
    corner.onMouseLeave = function (event) {
        var popped = descriptions.pop();
        popped.remove();
        var poppedMeta = descMeta.pop();
        poppedMeta.remove();
        var poppedText = descTexts.pop();
        poppedText.remove();
        var poppedImg = descImages.pop();
        poppedImg.remove();
    }
    nodes.push(corner);
}

for (var i = 0; i < labels.length; i++) {
    var text = new PointText(labelCorners[i]);
    text.justification = i == 0 || i == 5 ? 'left' : 'right';
    text.fillColor = colors[i * 2];
    text.fontSize = '1.5em';
    text.content = labels[i];
    text.fontFamily = 'Arial';
}

function getIndex(point) {
    for (var i = 0; i < corners.length; i++) {
        if (corners[i].x === point.x && corners[i].y === point.y) {
            return i;
        }
    }
    return null;
}

function addLineBreaks(text) {
    var broken = "";
    var words = text.split(" ");
    console.log(words);
    var lineLength = 0;
    var lineLimit = 55;
    for (var i = 0; i < words.length; i++) {
        if (lineLength + words[i].length > lineLimit) {
            broken += "\n";
            lineLength = 0;
        }
        broken += words[i] + " ";
        lineLength += words[i].length;
    }
    return broken;
}