onload = function () {

  var margin = {top: 20, right: 40, bottom: 20, left: 40};
  var width = 960;
  var height = 250 - margin.top - margin.bottom;

  var format = d3.format(".1%"); // 23.1%, 15.4%, etc.
  var states;
  var age;


  var x = d3.scaleLinear()
    .range([0,width]);

  var y = d3.scaleOrdinal()
    .range([0,height]);

    var xAxis = d3.axisTop()
      .scale(x)
      .tickSize(-height - margin.bottom)
      .tickFormat(format);

  // var yAxis = d3.axisLeft()
  //   .scale(y)

  var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("margin-left", -margin.left +"px")
  .append("g")
    .attr("transform", "translate("+(margin.left+ 20) + ","+margin.top +")")


  svg.append("g")
    .attr("class","x axis")

  svg.append("g")
    .attr("class", "y axis")
    .append("line")
    .attr("class", "domain")
    .attr("y2",height)

    var menu = d3.select("#menu").select("select")
      .on("change",change)

    d3.csv("states-age.csv", function (data) {
      states = data;

      var ages = d3.keys(states[0]).filter(function (key) {
        return key != "State" && key != "Total";
      }); // all the keys exceept "state" and "total"

      states.forEach( function (state) {
          ages.forEach( function(age) {
            state[age] = state[age] / state.Total;
          });
      });

      menu.selectAll("option") // have to use selectAll, cant use select
        .data(ages)
        .enter().append("option")
        .text(function (d) {return d;});
        // populates the options in the DOM


      menu.property("value", "18 to 24 Years");
      // sets initial value
      redraw();

    }); // end of csv call

    // hold down alt key to slow down animation to a crawl
    var altKey;

    d3.select(window)
      .on("keydown", function () { altKey = d3.event.altKey; })
      .on("keyup", function() { altKey = "false"; });

function change() {

    clearTimeout(timeout); // clears automatic cycling through list

    d3.transition()
      .duration(5000)
      .each(redraw);

}

function redraw() {
  var age1 = menu.property("value")
  var top = states.sort(function(a,b) {return b[age1] - a[age1];}).slice(0,10)
  // top 10 responses
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

  y.domain(top.map(function (d) { return d.State;}   ));
console.log(y.domain()); // array of the top ten states "ND", "DC", etc
  x.domain([0, top[0][age = age1]]); // resets the domain.

  var yBand = d3.scaleBand()
    .domain(top.map(function (d) { return d.State;}   ))
    .range([0,height])
    .paddingInner([0.1]); // makes the bars distinct

      // console.log(yBand.bandwidth()); // 21 = (250 - 20 - 20) /10


  var bar = svg.selectAll(".bar")
    .data(top, function (d) {return d.State;});

    // bar.exit().remove();


  var barEnter = bar.enter().insert("g", ".axis")
   // y axis
    .attr("class", "bar")
    .attr("transform", function (d,i) {
      // console.log("yba",yBand(d.State));
      // console.log( "y", y(d.State) );
       return "translate(0," + (yBand(d.State)) +  ")"})
    .style("fill-opacity",1);

    barEnter.append("rect").transition()
               .duration(5000)
      .attr("width", age && function(d) {return x(d[age]); })
      .attr("height", (yBand.bandwidth()));


// TODO add a transition to the entering data


    barEnter.append("text") // y axis label, not really axis labels though
      .attr("class", "label") // just appended to end of bar
      .attr("x", -3)
      .attr("y", function (d) {return yBand.bandwidth()/2;})
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .text(function (d) {return d.State; });

    barEnter.append("text") // bar value placeholder?
      .attr("class", "value")
      .attr("x", age && function(d) {return x(d[age])-3;})
      .attr("y",  function (d) {return yBand.bandwidth()/2;})
      .attr("dy", ".35em")
      .attr("text-anchor","end")
      .text(function (d) {return format(d[age]);})

    var barUpdate = bar.transition()
          .duration(5000)
      .attr("transform", function (d) {
        console.log(y(0),y(1),"dstate");
        return "translate(0," + (yBand(d.State)) + ")";
      })
      .style("fill-opacity", 1);

    barUpdate.select("rect")
      .attr("width", function (d) { return x(d[age]);});

    barUpdate.select(".value").transition().duration(5000) // updated bars grow or shrink slower
      .attr("x", function (d) {return x(d[age])-3})
      .text(function (d) {return format(d[age]);});

    //
    var barExit = bar.exit().transition()
      .duration(5000)
      .attr("transform", function(d) {return "translate(0, " + (y(1)+ height) + ")";})
      .style("fill-opacity", 0)
      .remove();

    barExit.select(".value") //.transition().duration(5000)
      .attr("x", function (d) { return x(d[age])-3; })
      .text(function (d) { return format(d[age])});

    d3.transition(svg).select(".x.axis")
      .call(xAxis);

}

var timeout = setTimeout(function() {
  menu.property("value", "65 Years and Over").node().focus();
  change();
}, 10000)



}
