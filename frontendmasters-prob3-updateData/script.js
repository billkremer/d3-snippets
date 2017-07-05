onload = function () {

  // var one = d3.select("body").append("svg")

  var city = 'New York';
  // var width = 800;
  // var height = 600;
  var margin = {top: 20, bottom: 20, left: 20, right: 20};

  var w = 0.8* Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = 0.8* Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  d3.select("button").on("mouseup", cycleData)

  function cycleData () {
    //first change data:
      var rand = Math.floor(Math.random()*2);
      console.log(rand);

      if (city == "New York") {
        if (rand === 0) {
          city = "Austin";
        } else if (rand === 1) {
          city = "San Francisco";
        }
      } else if (city == "Austin"){
        if (rand === 0) {
          city = "New York";
        } else if (rand === 1) {
          city = "San Francisco";
        }
      } else if (city == "San Francisco") {
        if (rand === 0) {
          city = "Austin";
        } else if (rand === 1) {
          city = "New York";
        }
      }

      console.log(city);


var data = d3.tsv("data.tsv", fix, function(err, data) {



  var xScale = d3.scaleTime()
    .domain(d3.extent(data, function(d) {return d.date;}))
    .range([margin.left, w - margin.right]);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) {return d[city];})])
    .range([h - margin.bottom, margin.top]);

  var xAxis = d3.axisBottom()
    .scale(xScale)
    .tickFormat(d3.timeFormat('%b %Y'));

  var yAxis = d3.axisLeft()
    .scale(yScale);

  var heightScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) {return d[city];})])
    .range([0,h - margin.bottom - margin.top]);

    var valLine = d3.line()
      .x(function (d) {return xScale(d.date);})
      .y(function (d) {return yScale(d[city]);})
      .curve(d3.curveCardinal.tension(.5));

    var update = d3.select("svg").transition()
    .duration(500)
    .ease(d3.easeLinear);

    update.select(".line")
      .attr("d", valLine(data))
      .attr("fill", "none")
      .attr("stroke","black")
      // .attr("transform", "translate(75,10)");

    update.select(".x-axis")
      .attr("transform", "translate(0," + (h - margin.bottom )+ ")")
      .call(xAxis);

    update.select(".y-axis")
      .call(yAxis)
      .attr("transform", "translate(" +margin.left+",0)");

    update.select(".cityName")
      .text(city);
    });


  }


  var data = d3.tsv("data.tsv", fix, function(err, data) {

    // data.date = new Date(d3.timeParse("%Y%m%d"));
    console.log(data);

    data = data.slice(0,50);

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

      // svg.selectAll("rect")
      // .data(data)
      // .enter().append("rect")
      // .attr("width", 1.5)
      // // .attr("height", function (d) {return heightScale(d[city]);})
      // .attr("height", function (d) {return h - yScale(d[city]);})
      // .attr("transform", "translate(0,-" + margin.bottom + ")")
      // .attr("x", function (d) {return xScale(d.date);})
      // .attr("y", function (d) {return yScale(d[city]);})
      // .attr("fill", "black");

      var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickFormat(d3.timeFormat('%b %Y'));

      var yAxis = d3.axisLeft()
        .scale(yScale);

      var valLine = d3.line()
        .x(function (d) {return xScale(d.date);})
        .y(function (d) {return yScale(d[city]);})
        .curve(d3.curveCardinal.tension(.5));

      svg.append("path")
        .attr("class", "line")
        .attr("d", valLine(data))
        .attr("fill", "none")
        .attr("stroke","black")
        // .attr("transform", "translate(75,10)");

      svg.append("g")
        .attr("class","x-axis")
        .attr("transform", "translate(0," + (h - margin.bottom )+ ")")
        .call(xAxis)
;

      svg.append("g")
        .attr("class","y-axis")
        .call(yAxis)
        .attr("transform", "translate(" +margin.left+",0)");

      svg.append("text")
        .attr("class","cityName")
        .attr("x", margin.left + 100)
        .attr("y", h - margin.bottom - 100)
        .text(city);


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
