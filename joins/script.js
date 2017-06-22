onload = function () {


var data = [{"x": 10.0, "y": 100.1}, {"x": 20.0, "y": 88.5}];



var svg = d3.select("svg");

// svg.append("circle")
//     .attr("cx", d.x)
//     .attr("cy", d.y)
//     .attr("r", 2.5);

var circle = svg.selectAll("circle")
  .data(data);

circle.exit().remove();

  circle.enter().append("circle")
      .attr("r", 0)
    .transition()
    .attr("r",10);
    circle
  .merge(circle)
  .attr("cx",function (d) {return d.x;})
  .attr("cy",function (d) {return d.y;})

  .attr("fill","steelblue");


function type(d) {
  d.value = parseFloat(d.frequency); // coerce to number
  return d;
}


}
