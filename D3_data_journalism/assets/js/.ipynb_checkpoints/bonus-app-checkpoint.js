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

// I defined all of my axes labels to show on the graph. I also added a css class e.g. "y1" so that it was easy to select them for binding data to each axis by css selection with D3.
    
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
      .text("Obesity (%)");

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
      .text("Lacks Healthcare (%)");
    
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
      .text("Lacks Healthcare (%)");
    
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
      .text("Poverty (%)");

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
      .text("Income(Dollars)");

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
      .text("Smokes(%)");
   
// Append click events to each label by selecting the svg element, text and then binding it with d3.select(this)

//Read the data
d3.csv("assets/data/data.csv").then(function(data) {
  data.forEach(function(data) {
    data.obesity = +data.obesity;
    data.poverty = +data.poverty;
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

    
// The tool tip functionality is added below. The following github was used to help construct the code.  https://github.com/caged/d3-tip
// I defined an initial tool tip and then the tool tip is update in the code below when a different axis is clicked. 
    
    
var tip = d3.tip().attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
        return "<strong>State:</strong> <span style='color:red'>" + d.state + "</span>" + "</br>" +
            "<strong>Poverty:</strong> <span style='color:red'>" + d.poverty + "</span>" + 
        "</br>" + "<strong>Obesity:</strong> <span style='color:red'>" + d.obesity + "</span>";
        });
            
svg_bonus.call(tip);

// Add dots: I appended my circle elements to the svg and then appended a "dottext" class to these dots so that the state abbreviations would appear within the circles.
var bonus_dots = svg_bonus.selectAll("circle")
                .data(data)
                .enter()
                .append("g");

// Add circles to dots
bonus_dots.append("circle")
  .attr("class", "dot")
  .attr("cx", function(d) { return LinearScaleX(d.poverty); })
  .attr("cy", function(d) { return LinearScaleY(d.obesity); })
  .attr("r", 12)
  .style("fill", "#69b3a2")
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)


// Append text to dots
bonus_dots.append("text")
    .attr("class", "dottext")
    .text(function(d) {
    return d.abbr; })
  .attr("x", function(d) { return LinearScaleX(d.poverty); })
  .attr("y", function(d) { return LinearScaleY(d.obesity); })
  .attr("font-family", "Arial")
  .attr("font-size", "9px")
  .attr("text-anchor", "middle")
  .attr("fill", "white");        

});

// Having defined my initial plot I then created functions for updating my plot. The first renders new scales for the x and then y axis.

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

// function used for updating circles group with a transition to new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// The following code updates based on axis click. To accomplish this I called the data and defined the three axis by numbers 1-3 and called a variable chosenAxisNum.
// The code runs the changes through through if conditionals based on the chosen number. I found that d3 works well by selecting based on css selectors.
// So the code above creates the appropriate html divs and css classes. I can then use d3.selectAll using css selection to change the elements I need based on 
// the chosenAxisNum. I manually set the linear scales to get the exact ratios that looked the best in the plots.

var chosenAxisNum = 1

d3.csv("assets/data/data.csv").then(function(data) {
    data.forEach(function(data) {
    data.obesity = +data.obesity;
    data.poverty = +data.poverty;
    data.income = +data.income;
    data.smokes = +data.smokes;
    data.healthcare = +data.healthcare;
    return data;
  });
 
    
    
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
    
     var tip = d3.tip().attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
        return "<strong>State:</strong> <span style='color:red'>" + d.state + "</span>" + "</br>" +
            "<strong>Poverty:</strong> <span style='color:red'>" + d.poverty + "</span>" + 
        "</br>" + "<strong>Obesity:</strong> <span style='color:red'>" + d.obesity + "</span>";
        });
    
    svg_bonus.call(tip);
    
    var newXScale = d3.scaleLinear()
    .domain([8, 25])
    .range([0, width]);
    
    var newYScale = d3.scaleLinear()
    .domain([20, 36])
    .range([height, 0]);
    
    renderXAxis(newXScale);
    renderYAxis(newYScale);  

// Add circles to dots


svg_bonus.selectAll(".dot")
            .transition()
            .duration(900)
            .attr("cx", function(d) { return newXScale(d.poverty); })
            .attr("cy", function(d) { return newYScale(d.obesity); });
            

svg_bonus.selectAll(".dottext")
    .transition()
    .duration(900)
    .attr("x", function(d) { return newXScale(d.poverty); })
    .attr("y", function(d) { return newYScale(d.obesity); });
 
svg_bonus.selectAll(".dot")
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

}


else if (chosenAxisNum==='2')  {  

   var tip = d3.tip().attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
        return "<strong>State:</strong> <span style='color:red'>" + d.state + "</span>" + "</br>" +
            "<strong>Income:</strong> <span style='color:red'>" + d.income + "</span>" + 
        "</br>" + "<strong>Lacks Healthcare:</strong> <span style='color:red'>" + d.healthcare + "</span>";
        });
    
    svg_bonus.call(tip);
    
    var newXScale = d3.scaleLinear()
    .domain([35000, 75000])
    .range([ 0, width ]);
    var newYScale = d3.scaleLinear()
    .domain([2, 28])
    .range([ height, 0]);
    renderXAxis(newXScale);
    renderYAxis(newYScale);
    
    svg_bonus.selectAll(".dot")
            .transition()
            .duration(900)
            .attr("cx", function(d) { return newXScale(d.income); })
            .attr("cy", function(d) { return newYScale(d.healthcare); });
    
   svg_bonus.selectAll(".dottext")
       .transition()
       .duration(900)
       .attr("x", function(d) { return newXScale(d.income); })
       .attr("y", function(d) { return newYScale(d.healthcare); });  
    
    svg_bonus.selectAll(".dot")
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);
    
 }
          
else if (chosenAxisNum==='3') {
    
    
    var newXScale = d3.scaleLinear()
    .domain([8, 28])
    .range([ 0, width ]);
    var newYScale = d3.scaleLinear()
    .domain([0, 30])
    .range([ height, 0]);
    renderXAxis(newXScale);
    renderYAxis(newYScale);
    
      var tip = d3.tip().attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
        return "<strong>State:</strong> <span style='color:red'>" + d.state + "</span>" + "</br>" +
            "<strong>Smokes:</strong> <span style='color:red'>" + d.smokes + "</span>" + 
        "</br>" + "<strong>Lacks Healthcare:</strong> <span style='color:red'>" + d.healthcare + "</span>";
        });
    
    svg_bonus.call(tip);
    
     svg_bonus.selectAll(".dot").transition().duration(900)
                .attr("cx", function(d) { return newXScale(d.smokes); })
                .attr("cy", function(d) { return newYScale(d.healthcare); });
    
     svg_bonus.selectAll(".dottext")
         .transition()
         .duration(900)
         .attr("x", function(d) { return newXScale(d.smokes); })
         .attr("y", function(d) { return newYScale(d.healthcare); })
    
    svg_bonus.selectAll(".dot")
    .append("text")
    .text(function(d) {
     return d.abbr; })
    .attr("x", function(d) { return newXScale(d.smokes); })
    .attr("y", function(d) { return newYScale(d.healthcare); })
    .attr("font-family", "Arial")
    .attr("font-size", "9px")
    .attr("text-anchor", "middle")
    .attr("fill", "white"); 
    
    svg_bonus.selectAll(".dot")
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);
    
};        
  };       
});
});