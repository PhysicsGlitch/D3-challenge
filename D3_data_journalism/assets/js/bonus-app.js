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

var labelGroup = svg_bonus.append("g");

// https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e
// I defined all of my axes labels to show on the graph. I also added a css class e.g. "y1" to 
    
var ylabel1 = labelGroup.append("text")
      .attr("class", "y1")
      .attr("transform", "rotate(-90)")
      .attr("y", 60 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .attr("font-family", "Arial")
      .attr("font-size", "20px")
      .attr("font-weight", "bold")
      .attr("value", 1)
      .style("text-anchor", "middle")
      .text("yLabel1");

var ylabel2 = labelGroup.append("text")
      .attr("class", "y2")
      .attr("transform", "rotate(-90)")
      .attr("y", 30 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .attr("font-family", "Arial")
      .attr("font-size", "20px")
      .attr("font-weight", "lighter")
      .attr("value", 2)
      .style("text-anchor", "middle")
      .text("yLabel2");
    
var ylabel3 = labelGroup.append("text")
      .attr("class", "y3")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .attr("font-family", "Arial")
      .attr("font-size", "20px")
      .attr("font-weight", "lighter")
      .attr("value", 3)
      .style("text-anchor", "middle")
      .text("yLabel3");
    
var xlabel1 = labelGroup.append("text")
      .attr("class", "x1")
      .attr("y", height + 60)
      .attr("x", 30 + (width / 2 ))
      .attr("dx", "1em")
      .attr("font-family", "Arial")
      .attr("font-size", "20px")
      .attr("font-weight", "bold")
      .attr("value", 1)
      .style("text-anchor", "middle")
      .text("xLabel1");

var xlabel2 = labelGroup.append("text")
      .attr("class", "x2")
      .attr("y", height + 100)
      .attr("x", 30 + (width / 2 ))
      .attr("dx", "1em")
      .attr("font-family", "Arial")
      .attr("font-size", "20px")
      .attr("font-weight", "lighter")
      .attr("value", 2)
      .style("text-anchor", "middle")
      .text("xLabel2");

var xlabel3 = labelGroup.append("text")
      .attr("class", "x3")
      .attr("y", height + 140)
      .attr("x", 30 + (width / 2 ))
      .attr("dx", "1em")
      .attr("font-family", "Arial")
      .attr("font-size", "20px")
      .attr("font-weight", "lighter")
      .attr("value", 3)
      .style("text-anchor", "middle")
      .text("xLabel3");
   
// Append click events to each label by selecting the svg element, text and then binding it with d3.select(this)

//Read the data
d3.csv("assets/data/data.csv").then(function(data) {
  data.forEach(function(data) {
    data.obesity = +data.obesity;
    data.poverty = +data.poverty;
    data.income = +data.income;
    data.smokes = +data.smokes;
    data.healthcare = +data.healthcare;
    return data;
  });

  // Add initial X axis
  var LinearScaleX = d3.scaleLinear()
    .domain([8, 25])
    .range([ 0, width ]);
  svg_bonus.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(LinearScaleX));

  // Add initial Y axis
  var LinearScaleY = d3.scaleLinear()
    .domain([20, 36])
    .range([ height, 0]);
  svg_bonus.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(LinearScaleY));

// Add dots: I declared it as a variable, scatter dots to make it a bit easier to see how I appended both circles and then dots to the poits. 
 var bonus_dots = svg_bonus.selectAll("g")
                .data(data)
                .enter()
                .append("g");

// Add circles to dots
bonus_dots.append("circle")
  .attr("class", "dot")
  .attr("cx", function(d) { return LinearScaleX(d.poverty); })
  .attr("cy", function(d) { return LinearScaleY(d.obesity); })
  .attr("r", 12)
  .style("fill", "#69b3a2");

// Append text to dots
bonus_dots.append("text")
    .text(function(d) {
    return d.abbr; })
  .attr("x", function(d) { return LinearScaleX(d.poverty); })
  .attr("y", function(d) { return LinearScaleY(d.obesity); })
  .attr("font-family", "Arial")
  .attr("font-size", "9px")
  .attr("text-anchor", "middle")
  .attr("fill", "white"); 
    });


function xScale(xdata) {
  // create scales
  var LinearScaleX = d3.scaleLinear()
    .domain([0, 100])
    .range([ 0, width ]);
    return LinearScaleX;
}
 

function yScale(ydata) {
  
var LinearScaleY = d3.scaleLinear()
    .domain([20, 36])
    .range([ height, 0]);
    return  LinearScaleY;
}


// function used for updating xAxis var upon click on axis label
function renderXAxis(newXScale) {
  var bottomAxis = d3.axisBottom(newXScale);
  
  xAxis = d3.select(".x-axis").transition()
    .duration(900)
    .call(bottomAxis);
    
  return xAxis;
}

function renderYAxis(newYScale) {
    var leftAxis = d3.axisLeft(newYScale);
         
    yAxis = d3.select(".y-axis").transition()
    .duration(900)
    .call(leftAxis);
    
    return yAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

var chosenAxisNum = 1

labelGroup.selectAll("text")
         .on('click', function () {
          var clicked_axis = d3.select(this).attr("value");
                 
          if (clicked_axis != chosenAxisNum) {
              chosenAxisNum = clicked_axis;
              // console.log(chosenAxisNum);
              var x_class = ".x" + chosenAxisNum
              var y_class = ".y" + chosenAxisNum
              d3.selectAll("text").style("font-weight", "lighter");
              d3.select(x_class).style("font-weight", "bold")
              d3.select(y_class).style("font-weight", "bold")

              
if (chosenAxisNum==='1')    {  
    
    console.log(chosenAxisNum)
    var newXScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width]);
    var newYScale = d3.scaleLinear()
    .domain([20, 36])
    .range([height, 0]);
    renderXAxis(newXScale);
    renderYAxis(newYScale);
}

else if (chosenAxisNum==='2')  {  
    
    console.log(clicked_axis)
    var newXScale = d3.scaleLinear()
    .domain([0, 80])
    .range([ 0, width ]);
    var newYScale = d3.scaleLinear()
    .domain([0, 100])
    .range([ height, 0]);
    renderXAxis(newXScale);
    renderYAxis(newYScale);
    
 }
          
else if (chosenAxisNum==='3') {
    
    console.log(clicked_axis)
    var newXScale = d3.scaleLinear()
    .domain([0, 60])
    .range([ 0, width ]);
    var newYScale = d3.scaleLinear()
    .domain([0, 150])
    .range([ height, 0]);
    renderXAxis(newXScale);
    renderYAxis(newYScale);
};        
  };
          
});  
