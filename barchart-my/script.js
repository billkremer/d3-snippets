

var width = 960;
var height = 500;

var x= d3.scale.ordinal()
    .range([0,width]);

var y = d3.scale.linear()
    .range([height,0]);

var chart = d3.select(".chart")
    .attr("height",height)
    .attr("width",width);

d3.csv("data.csv", type, function (error, data) {
  x.domain(data.map(function(d) {return d.name}));
  y.domain([0,d3.max(data, function(d) {return d.value})])
  console.log(data);

  var bar = chart.selectAll("g")
      .data(data)
      .enter().append("g")



});

function type(d) {
  console.log("d",d);
  d.value = parseFloat(d.value) // coerce to number since d3.csv returns strings

      console.log("d",d);
  return d;

}
