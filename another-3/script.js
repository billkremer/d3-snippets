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

    var xScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, function (d) {return d[0];})])
      .range([20, width-20]);

    var yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, function(d) {return d[1];})])
      .range([height-20, 20]);




    svg.selectAll("circle")
    .data(dataset)
    .enter().append("circle")
    .attr("cx", function (d) {return xScale(d[0]);})
    .attr("cy", function (d) {return yScale(d[1]);})
    .attr("r", 5)


      svg.selectAll("text")
      .data(dataset)
      .enter().append("text")
      .text(function (d) {return d[0]+", "+d[1];})
      .attr("text-anchor", "middle")
      .attr("x", function (d) {return xScale(d[0]);})
      .attr("y", function (d) {return yScale(d[1])+20;})


}
