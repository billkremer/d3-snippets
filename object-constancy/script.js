onload = function () {

  var margin = {top: 20, right: 40, bottom: 20, left: 40};
  var width = 960;
  var height = 250 - margin.top - margin.bottom;

  var format = d3.format(".1%"); // 23.1%, 15.4%, etc.
  var states;
  var age;


  var x = d3.scaleLinear()
    .range([0,width])

  var y = d3.scaleOrdinal()
    .range([0,height],0.1)

    var xAxis = d3.axisTop()
      .scale(x)

  // var yAxis = d3.axisLeft()
  //   .scale(y)

  var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("margin-left", -margin.left +"px")
  .append("g")
    .attr("transform", "translate("+margin.left+","+margin.top +")")


  svg.append("g")
    .attr("class","x axis")

  svg.append("g")
    .attr("class", "y axis")
    .append("line")
    .attr("class", "domain")
    .attr("y2",height)

    var menu = d3.select("#menu select")
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

      menu.select("option")
        .data(ages)
        .enter().append("option")
        .text(function (d) {return d;});
        // populates the options in the DOM


      menu.property("value", "18 to 24 Years");
      // sets initial value
      redraw();

    }); // end of csv call









function type(d) {
  d.value = parseFloat(d.frequency); // coerce to number
  return d;
}


}
