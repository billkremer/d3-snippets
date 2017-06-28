onload = function () {

var width = 960,
    height = 500;


  var svg = d3.select("body").append("svg")
              .attr("width", width)
              .attr("height", height);

  var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
  11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

  svg.selectAll("rect")
    .data(dataset)
    .enter().append("rect")
    .attr("x", function (d,i) {
      return i * width / dataset.length;
    })
    .attr("y", function (d,i) { return height - d*19})
    .attr("width", width/ dataset.length - 3 )
    .attr("height", function (d,i) {
      return d*19;
    });

    svg.selectAll("text")
    .data(dataset)
    .enter().append("text")
    .text(function (d) {return d;})
    .attr("text-anchor", "middle")
    .attr("x", function (d,i) {
      return i * width / dataset.length + (width/ dataset.length - 3)/2 ;
    })
    .attr("y", function (d,i) { return height - d*19 + 20})


}
