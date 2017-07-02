onload = function () {


  var city = 'New York';
  var width = 800;
  var height = 300;
  var margin = {top: 20, bottom: 20, left: 20, right: 20};

  // var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  // var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  var data = d3.tsv("data.tsv", fix, function(err, data) {

    // data.date = new Date(d3.timeParse("%Y%m%d"));
    console.log(data);

    xScale = d3.scaleTime()
      .domain(d3.extent(data, function(d) {return d.date;}))
      .range([margin.left, width - margin.right]);

    yScale = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) {return d[city];})])
      .range([0, height - margin.bottom - margin.top]);

    var svg = d3.select("svg").selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("width", 2)
      .attr("height", function (d) {return yScale(d[city]);})
      .attr("x", function (d) {return xScale(d.date);})
      .attr("y", function (d) {return yScale(d[city]);})
      .attr("fill", "black");






  })



  function fix(d) {
    d.date = new Date(d3.timeParse("%Y%m%d")(d.date));
        // d.date = new Date(d.date); // x
    // d.value = +d.value; // coerce to number
    // d[city] = ++d[city]; // y
    d[city] = +d[city]; // y same coercion to number
    return d;
  }
}
