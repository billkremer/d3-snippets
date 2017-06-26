onload = function () {

  var sliderz = [
    ["A",-5,5,3],   // aye:
    ["B",-10,10,2], // bee:
    ["C",0,12,0],   // cee:
    ["D",1,6,1.4],  // dee:
    ["E",-3,0,-2.5], // eee:
    ["F",-4,4,0.5] // eff:
  ]

  var install = d3.select("#slider")

  var input = install.selectAll("input")
      .data(sliderz);

      input.enter().append("div")
      .attr("id", function (d) {return "input__"+ d[0];})
      .append("input")
      .attr("id", function (d) {return "inputSlider__"+ d[0];})
      .attr("type","range")
      .attr("class","inputSlider")
      .property("min", function (d) {return d[1];})
      .property("max", function (d) {return d[2];})
      .property("step", function (d) {return (d[2] - d[1])/100 })
      .property("value",function (d) {return d[3];});


      for (s of sliderz) {
        // console.log("s",s);
        var and = d3.select("#input__"+s[0]);
        // console.log(and.select("input").property("value"));
        and.insert("input", "#input__"+s[0])
        .attr("type", "number")
        .property("value",and.select("input").property("value"))
        .property("min", s[1])
        .property("max", s[2])
        .property("step",  (s[2] - s[1])/100)
        .attr("class","inputBox")
        .attr("id", "inputBox__"+s[0]);
      }

// TODO now add listeners

  d3.select("#slider").selectAll("input").on("change", function (a,b) {
    // console.log("a",a,"b",b);
    // console.log("this",this);
    var idChanged = d3.select(this).attr("id");
    var newValue = d3.select(this).property("value");
    // console.log(idChanged, newValue);
    synchSliderToBox(idChanged, newValue);
  });

  var synchSliderToBox = function (idChanged, newValue) {
    var rangeOrBox = idChanged.split("__")[0]; // inputBox or inputSlider
    var whichControl = idChanged.split("__")[1];
    // console.log(rangeOrBox, whichControl);

    if (rangeOrBox == "inputBox") {
      d3.select("#inputSlider__"+whichControl)
      .property("value",newValue);

    } else if (rangeOrBox == "inputSlider") {
      d3.select("#inputBox__"+whichControl)
      .property("value",newValue);
    };
    buildEquationString();
  };

//  buildEquationString();

  var buildEquationString = function () {
      var values = d3.select("#slider").selectAll(".inputSlider").nodes();
      //console.log(values.property("value"));
      console.log(values);

      console.log(values.length);
      //values.property("value");

  }


//
// d3.select("#crackCheckBox").on("change", slider_callback);
//
// d3.select("#install_type").selectAll('input')
//   .on("change",function (a,b) {
//     var toChange = d3.select(this).attr("value");
//     changeInstallType(toChange);
//   });
//
//   d3.select("#left").selectAll('.input').on("click",function (a,b) {
//   var idToChange = d3.select(this).attr('id');
//   var newerValue = parseFloat(d3.select(this).property('value'));
//   var symbolToChange = d3.select(this).attr('symbol');
//   inputBoxChange(idToChange, symbolToChange, newerValue);
// });

      //
      // .append("input", function (d) {return "#inputRange__"+ d[0];})
      // .attr("type","number");



  //
  // var matrix = [
  //   [11975,  5871, 8916, 2868],
  //   [ 1951, 10048, 2060, 6171],
  //   [ 8010, 16145, 8090, 8045],
  //   [ 1013,   990,  940, 6907]
  // ];
  //
  // var tr = d3.select("#left")
  //   .append("table")
  //   .selectAll("tr")
  //   .data(matrix)
  //   .enter().append("tr");
  //
  // var td = tr.selectAll("td")
  //   .data(function(d) { return d; })
  //   .enter().append("td")
  //     .text(function(d) { return d; });
//
//   function addSlider (sliderDefaults) {
//   // sliderDefaults = [name, min value, max, initial],... ]
//
//     var install = d3.select("#left")
//     .append("input");
//
//     // for (s in sliderDefaults) {
//     //   var name = sliderDefaults[s][0],
//     //       minVal = s[1],
//     //       maxVal = s[2],
//     //       initVal = s[3];
//     //   // console.log(s);
//     //   // console.log(name, minVal, maxVal, initVal);
//
//     // for (var s in sliderDefaults) {
//     //   console.log(s);
//
//
//
//
//       install
//       .select("input")
//         .data(s).enter()
//         .append("input")
//         .attr("type","range")
//         // .attr("id", function (d) {return "inputRange__"+ d[0];})
//         .property("min", function (d) {console.log(d);
//         console.log(s);})
//         // .property("max", function (d) {return d[2];})
//         // .property("step", function (d) {return (d[2] - d[1])/100 })
//         // .property("value",function (d) {return d[3];});
// ;
//         // install.selectAll("input")
//         // .data(s).enter()
//         // .insert("input", function (d) {return "inputRange__"+ d[0];})
//         // .attr("type","number")
//         // .property("value",function (d) {return d[3];});
//         // .insert("p")
//         // .text(function (d) {return d[0];});
//
//
//
//
// };
//
//
//
//   //  }; // for loop end
//   }; // addSlider end
//
//   addSlider(sliderz);
// //
// //
// // var width = 960,
// //     height = 500;
// //
// // var x = d3.scale.ordinal()
// //     .rangeRoundBands([0, width], .1);
// //
// // var y = d3.scale.linear()
// //     .range([height, 0]);
// //
// // var chart = d3.select(".chart")
// //     .attr("width", width)
// //     .attr("height", height);
// //
// // d3.csv("data.csv", type, function(error, data) {
// //   x.domain(data.map(function(d) { return d.letter; }));
// //   y.domain([0, d3.max(data, function(d) { return d.value; })]);
// //
// // console.log(data);
// //
// //   var bar = chart.selectAll("g")
// //       .data(data)
// //     .enter().append("g")
// //       .attr("transform", function(d) { return "translate(" + x(d.letter) + ",0)"; });
// //
// //   bar.append("rect")
// //       .attr("y", function(d) { return y(d.value); })
// //       .attr("height", function(d) { return height - y(d.value); })
// //       .attr("width", x.rangeBand());
// //
// //   bar.append("text")
// //       .attr("x", x.rangeBand() / 2)
// //       .attr("y", function(d) { return y(d.value) + 3; })
// //       .attr("dy", ".75em")
// //       .text(function(d) { return d.value; });
// // });
// //
// // function type(d) {
// //   d.value = parseFloat(d.frequency); // coerce to number
// //   return d;
// // }
//

}
