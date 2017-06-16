

var width = 960;
var height = 500;

var x= d3.scaleBand()
    .range([0,width],.1);

var y = d3.scaleLinear()
    .range([height,0]);

var chart = d3.select(".chart")
    .attr("height",height)
    .attr("width",width);

d3.csv("data.csv", type, function (error, data) {
  x.domain(data.map(function(d) {return d.name;}));
  y.domain([0,d3.max(data, function(d) {return d.value})])
console.log(data);

  var bar = chart.selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)";});
console.log(bar);
console.log(data);
  bar.append("rect")
      .attr("y", function(d) {return y(d.value);})
      .attr("height", function(d) { return height - y(d.value);})
      .attr("width", x.paddingOuter([0.1]).bandwidth());
console.log(bar);

      bar.append("text")
    .attr("x", x.bandwidth() / 2)
    .attr("y", function(d) { return y(d.value) + 3; })
    .attr("dy", ".75em")
    .text(function(d) { return d.value; });

});

function type(d) {
//  console.log("d",d);
  d.value = parseFloat(d.value) // coerce to number since d3.csv returns strings
//    console.log("d",d);
  return d;
}
