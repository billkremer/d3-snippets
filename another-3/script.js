onload = function () {

  var width = 960;
  var height = 500;
  var padding = 20;


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

    var xScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, function (d) {return d[0];})])
      .range([padding, width-padding]);

    var yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, function(d) {return d[1];})])
      .range([height-padding, padding]);


    var rScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, function (d) { return (Math.sqrt(d[0]*d[0] + d[1]*d[1])); })])
      .range([5,25]);


    svg.selectAll("circle")
    .data(dataset)
    .enter().append("circle")
    .attr("cx", function (d) {return xScale(d[0]);})
    .attr("cy", function (d) {return yScale(d[1]);})
    .attr("r", function (d) {return rScale(Math.sqrt(d[0]*d[0] + d[1]*d[1]))})


      svg.selectAll("text")
      .data(dataset)
      .enter().append("text")
      .text(function (d) {return d[0]+", "+d[1];})
      .attr("text-anchor", "middle")
      .attr("x", function (d) {return xScale(d[0]);})
      .attr("y", function (d) {return yScale(d[1])+20;})


}
