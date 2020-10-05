

var margin = {top: 60, right: 60, bottom: 30, left: 60},
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

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

  // Add X axis
  var x = d3.scaleLinear()
    .domain([8, 25])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([20, 36])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
 svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.poverty); } )
      .attr("cy", function (d) { return y(d.obesity); } )
      .attr("r", 10)
      .style("fill", "#69b3a2")
  
 svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter().append("text").text(function(d){
                    return d.abbr;
                })
                .attr("x", function (d) {
                    return x(d.poverty);
                })
                .attr("y", function (d) {
                    return y(d.obesity);
                });
               
});;
    
