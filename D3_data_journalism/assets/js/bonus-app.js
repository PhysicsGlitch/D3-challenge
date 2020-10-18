// First step is to define my margins, width and heigh of the svg container
var margin = {top: 60, right: 30, bottom: 150, left: 120},
    width = 1400 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg_bonus = d3.select("#bonus")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    
// Add Axis Labels

var labelGroups = svg_bonus.append("g");

// https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e
    
var ylabel1 = labelGroups.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 60 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .attr("font-family", "Arial")
      .attr("font-size", "20px")
      .attr("font-weight", "bold")
      .attr("value", "ylabel1")
      .style("text-anchor", "middle")
      .text("yLabel1");

var ylabel2 = labelGroups.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 30 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .attr("font-family", "Arial")
      .attr("font-size", "20px")
      .attr("font-weight", "lighter")
      .attr("value", "ylabel2")
      .style("text-anchor", "middle")
      .text("yLabel2");
    
var ylabel3 = labelGroups.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .attr("font-family", "Arial")
      .attr("font-size", "20px")
      .attr("font-weight", "lighter")
      .attr("value", "ylabel3")
      .style("text-anchor", "middle")
      .text("yLabel3");
    
var xlabel1 = labelGroups.append("text")
      .attr("y", height + 60)
      .attr("x", 30 + (width / 2 ))
      .attr("dx", "1em")
      .attr("font-family", "Arial")
      .attr("font-size", "20px")
      .attr("font-weight", "bold")
      .attr("value", "xlabel1")
      .style("text-anchor", "middle")
      .text("xLabel1");

var xlabel2 = labelGroups.append("text")
      .attr("y", height + 100)
      .attr("x", 30 + (width / 2 ))
      .attr("dx", "1em")
      .attr("font-family", "Arial")
      .attr("font-size", "20px")
      .attr("font-weight", "lighter")
      .attr("value", "xlabel2")
      .style("text-anchor", "middle")
      .text("xLabel2");
    
var xlabel3 = labelGroups.append("text")
      .attr("y", height + 140)
      .attr("x", 30 + (width / 2 ))
      .attr("dx", "1em")
      .attr("font-family", "Arial")
      .attr("font-size", "20px")
      .attr("font-weight", "lighter")
      .attr("value", "xlabel3")
      .style("text-anchor", "middle")
      .text("xLabel3");

// Append click events to each label by selecting the svg element, text and then binding it with d3.select(this)
    
var chosenXaxis = "xLabel1"
var chosenYaxis = "ylabel1"

labelGroups.selectAll("text")
         .on('click', function () {
          var clicked_axis = d3.select(this).attr("value");
                 
          if (clicked_axis != chosenXaxis) {
              chosenXaxis = clicked_axis;
              console.log(chosenXaxis);
              d3.selectAll("text").style("font-weight", "lighter")
              d3.select(this).style("font-weight", "bold");
          }
          }); 
  

//Read the data
d3.csv("assets/data/data.csv").then(function(data) {
  data.forEach(function(data) {
    data.obesity = +data.obesity;
    data.poverty = +data.poverty;
    data.income = +data.income;
    data.smokes = +data.smokes;
    data.healthcare = +data.healthcare;

// Add X axis
  var x = d3.scaleLinear()
    .domain([8, 25])
    .range([ 0, width ]);
  svg_bonus.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([20, 36])
    .range([ height, 0]);
  svg_bonus.append("g")
    .call(d3.axisLeft(y));
  // Add dots: I declared it as a variable, scatter dots to make it a bit easier to see how I appended both circles and then dots to the poits. 
 var scatter_dots = svg_bonus.selectAll("g")
                .data(data)
                .enter()
                .append("g");

// Add circles to dots
scatter_dots.append("circle")
  .attr("class", "dot")
  .attr("cx", function(d) { return x(d.data.poverty); })
  .attr("cy", function(d) { return y(d.data.obesity); })
  .attr("r", 12)
  .style("fill", "#69b3a2");

// Append text to dots
scatter_dots.append("text")
    .text(function(d) {
    return d.abbr; })
  .attr("x", function(d) { return x(data.poverty); })
  .attr("y", function(d) { return y(data.obesity); })
  .attr("font-family", "Arial")
  .attr("font-size", "9px")
  .attr("text-anchor", "middle")
  .attr("fill", "white");    
    
      

    });
});;