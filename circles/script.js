onload = function () {

var circle = d3.selectAll("circle");

  circle.attr("r",10);
  circle.attr("fill","steelblue");

//window.setInterval(mover, 200);

  circle.data([100,1000,10000]);

  console.log(circle);

  circle.attr("r", function (d) {return Math.sqrt(d);});

function mover () {
  circle.attr("cx",function () {return Math.random()*500});
}
//mover();

}
