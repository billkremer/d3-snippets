onload = function () {

var svg = d3.select("svg");
var circle = svg.selectAll("circle")
  .data([20, 30, 40, 50]);

var circleEnter = circle.enter().append("circle");

circleEnter.attr("cy",60)
  .attr("cx",function () {return Math.random()*500});

  circleEnter.attr("r",10);
  circleEnter.attr("fill","steelblue");



//window.setInterval(mover, 200);

//  circle.data([100,1000,10000]);

  console.log(circle);
  console.log(circleEnter);

  circleEnter.attr("r", function (d) {return Math.sqrt(d);});

// var svg = d3.select("svg");

circleEnter.exit().remove();

function mover () {
  circle.attr("cx",function () {return Math.random()*500});
}
// mover();

}
