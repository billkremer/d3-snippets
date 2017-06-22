onload = function () {

var data1 = [12, 234, 232, 1, 32,1234];

d3.select("body").selectAll("p")

  .data(data1)
  .enter()
  .append("p")
  .text(function (d) {return "something " +d;})
  .style("color", function (d) {
    var c = "green";
    if (d > 100) {
      c = "blue";
    }
    return c;
  });





}
