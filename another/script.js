onload = function () {

var width = 960,
    height = 500;


  var svg = d3.select("body").append("svg")
              .attr("width", width)
              .attr("height", height);

  var dataset = [
                    [ 5,     20 ],
                    [ 480,   90 ],
                    [ 250,   50 ],
                    [ 100,   33 ],
                    [ 330,   95 ],
                    [ 410,   12 ],
                    [ 475,   44 ],
                    [ 25,    67 ],
                    [ 85,    21 ],
                    [ 220,   88 ]
                ];

  svg.selectAll("circle")
  .data(dataset)
  .enter().append("circle")
  .attr("cx", function (d) {return d[0];})
  .attr("cy", function (d) {return d[1];})
  .attr("r", 5)


    svg.selectAll("text")
    .data(dataset)
    .enter().append("text")
    .text(function (d) {return d[0]+", "+d[1];})
    .attr("text-anchor", "middle")
    .attr("x", function (d) {return d[0];})
    .attr("y", function (d) {return d[1]+20;})


}
