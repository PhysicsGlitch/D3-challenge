// First step is to import the csv into D3 and retrieve the arrays I need

var state_obesity = [];
var state_poverty = [];
var state_abbr = [];

d3.csv("assets/data/data.csv").then(function(data) {
  data.forEach(function(data) {
    data.obesity = +data.obesity;
    data.poverty = +data.poverty;
    state_obesity.push(+data.obesity);
    state_poverty.push(+data.poverty);
    state_abbr.push(data.abbr);
  });
  console.log(data[0]);
  console.log(state_obesity);
  console.log(state_poverty);

// having mapped the dictionary values I need for the plat now I need to push these to a list so they can be plotted in Plotly
    

    
var trace1 = {
  x: state_poverty,
  y: state_obesity,
  mode: 'markers+text',
  type: 'scatter',
  name: 'Team A',
  text: state_abbr,
  marker: {
    color: 'rgb(17, 157, 255)',
    size: 35,
    line: {
      color: 'rgb(231, 99, 250)',
      width: 6
    }},
};

var scatter_data = [trace1];

var scatter_layout = { xaxis: {
    range: [8, 22],
    autotick: false,
    showgrid: false,
    zeroline: false,
    showline: true,
    tickmode: 'linear',
    tick0: 10,
    dtick: 2,
    showticklabels: true
  },
  yaxis: {
    range: [20, 38],
    autotick: false,
    tickmode: 'linear',
    tick0: 22,
    dtick: 2,
    showgrid: false,
    zeroline: true,
    showline: true,
    showticklabels: true
  },                      
  title: 'Obesity vs Poverty',
  showlegend: false,
  height: 800,
  width: 1400
};

    
// Finally, I create my plot and bind it to the proper html tag
    
Plotly.newPlot('scatter', scatter_data, scatter_layout);
});