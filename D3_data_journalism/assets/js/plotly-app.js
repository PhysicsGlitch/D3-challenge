// First step is to import the csv into D3 and retrieve the arrays I need

var state_obesity = [];
var state_poverty = [];
var state_abbr = [];
var state_smokes = [];
var state_income = [];
var state_health = [];

d3.csv("assets/data/data.csv").then(function(data) {
  data.forEach(function(data) {
    data.obesity = +data.obesity;
    data.poverty = +data.poverty;
    data.income = +data.income;
    data.smokes = +data.smokes;
    data.healthcare = +data.healthcare;
    state_obesity.push(+data.obesity);
    state_poverty.push(+data.poverty);
    state_health.push(+data.healthcare);
    state_smokes.push(+data.smokes);
    state_income.push(+data.income);
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
      width: 3
    }},
};

var scatter_data = [trace1];

var scatter_layout = { xaxis: {
     title: {
      text: 'Poverty (%)',
      font: {
        family: 'Arial, monospace',
        size: 18
      }
    },
    range: [8, 22],
    autotick: false,
    showgrid: false,
    zeroline: false,
    showline: true,
    tickmode: 'linear',
    tickwidth: 2,
    tick0: 10,
    dtick: 2,
    showticklabels: true
  },
    xaxis2: {
     title: {
      text: 'Smoke (%)',
      font: {
        family: 'Arial, monospace',
        size: 18
      }
    },
    range: [8, 22],
    autotick: false,
    showgrid: false,
    zeroline: false,
    showline: true,
    tickmode: 'linear',
    tickwidth: 2,
    tick0: 10,
    dtick: 2,
    showticklabels: true
  },
                      
  yaxis: {
      title: {
      text: 'Lacks Healthcare (%)',
      font: {
        family: 'Arial, monospace',
        size: 18
      },
    position: 1,
    automargin: true
    },
    range: [20, 38],
    autotick: false,
    tickmode: 'linear',
    tickwidth: 2,
    tick0: 22,
    dtick: 2,
    showgrid: false,
    zeroline: true,
    showline: true,
    showticklabels: true
  },
  yaxis2: {
          title: "y2",
          titlefont: {color: "green"},
          tickfont: {color: "green"},
          overlaying: 'yaxis',
          side: "left",
          position: -1,
          automargin: true
        },
  title: {
    text:'Percent Obesity vs Poverty by State',
    font: {
      family: 'Arial, monospace',
      size: 24
    },
  },
  showlegend: false,
  height: 800,
  width: 1400,
  hovermode: 'closest'
};

    
// Finally, I create my plot and bind it to the proper html tag
    
Plotly.newPlot('scatter', scatter_data, scatter_layout);
});