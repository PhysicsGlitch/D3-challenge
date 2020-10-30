## D3 Visualizations

The D3 Library was employed to chart various health risk factors according to US Census Data https://data.census.gov/cedsci/
The 2014 Census Data on State obesity, poverty, income and lack of healthcare indices were plotted with the D3 library.

The basic code creates an SVG element and then the D3 library binds data to the variosu DOM elements to create a final plot.

A dynamic D3 visualization was also added which allows the user to select different axes within the same svg plot to show different data.
Tool tips to show exact values were also implemented. 

The basic code is commented out in the javascript files that show how the texts work. But at a high overview level D3 append text element
to an svg container and then create mouseover, update and tooltip functions. In this code, each needed element was given its own
css class. And then D3 could select that class and then add the functionality needed.