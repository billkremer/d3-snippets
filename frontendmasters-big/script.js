onload = function () {

  // var one = d3.select("body").append("svg")

  var city = 'New York';
  // var width = 800;
  // var height = 600;
  var margin = {top: 20, bottom: 20, left: 20, right: 20};

  var w = 0.8* Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = 0.8* Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  var data = d3.tsv("data.tsv", fix, function(err, data) {

    // data.date = new Date(d3.timeParse("%Y%m%d"));
    // console.log(data);

    var xScale = d3.scaleTime()
      .domain(d3.extent(data, function(d) {return d.date;}))
      .range([margin.left, w - margin.right]);

    var yScale = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) {return d[city];})])
      .range([h - margin.bottom, margin.top]);

    var heightScale = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) {return d[city];})])
      .range([0,h - margin.bottom - margin.top]);

    var svg = d3.select("svg")

      svg.selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("width", 2)
      .attr("height", function (d) {return heightScale(d[city]);})
      .attr("x", function (d) {return xScale(d.date);})
      .attr("y", function (d) {return yScale(d[city]);})
      .attr("fill", "black");

      var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickFormat(d3.timeFormat('%b %Y'));

      var yAxis = d3.axisLeft()
        .scale(yScale);

      svg.append("g")
        .attr("transform", "translate(0," + (h - margin.bottom )+ ")")
        .call(xAxis)
;

      svg.append("g")
        .call(yAxis)
        .attr("transform", "translate(" +margin.left+",0)");


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
