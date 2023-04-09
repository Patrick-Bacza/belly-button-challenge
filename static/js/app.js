// Get the data endpoint
const bellybutton = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Function to grab and create Metadata Sample
function buildMetadata(sample){

  d3.json(bellybutton).then(data => {
    let metadata = data.metadata;

  let currentSample = metadata.filter((subject) => subject.id == sample);

  let panel =  d3.select('#sample-metadata');

  currentSample.forEach(sampleMetadata => {
        panel.html("")
        for (let key in sampleMetadata){
        panel
          .append("table")
          .text(`${key} : ${sampleMetadata[key]}`)
          .property("value" , `${key} : ${sampleMetadata[key]}`)
        };
      });
})
}

function buildCharts(sample) {
  d3.json(bellybutton).then(data => {

    let samples = data.samples;
  // Horizontal Bar Chart
  // filter sample data by the id 
    let filteredSample = samples.filter((sampleData) => sampleData.id == sample)
    let sortedValues = filteredSample.sort((a , b) => b.sample_values - a.sample_values)
    let labels =  sortedValues[0].otu_ids.slice(0 , 10)
    let values = sortedValues[0].sample_values.slice(0, 10)
    let hoverText = sortedValues[0].otu_labels.slice(0, 10)
    let reversedLabels =  labels.reverse()
    let otu = "OTU"
    let stringLabels = reversedLabels.map((label) => otu.concat(" " , label.toString()))
    let reversedValues = values.reverse()

    let trace1 = {
      x: reversedValues,
      y: stringLabels,
      text: hoverText,
      type: "bar",
      orientation: "h"
    }

    let layout = {
      title: `Top Ten OTUs Found in Subject ${sample}`
    }
    
    let tracedata = [trace1]
    
    Plotly.newPlot("bar" , tracedata , layout)

  // Bubble Chart
    let trace2 = {
      x: filteredSample[0].otu_ids,
      y: filteredSample[0].sample_values,
      mode: 'markers',
      marker: {
        color: filteredSample[0].otu_ids,
        size: filteredSample[0].sample_values
      },
      text: filteredSample[0].otu_labels
    }
    let bubbleData = [trace2]

    let layout2 = {
      title: "OTU ID" , 
      height: 600 , 
      width: 1500
    }

    Plotly.newPlot("bubble" , bubbleData , layout2)
  

  })

}

// call 

function init() {
 
  // create variable that holds reference to select element 

  let dropdownMenu = d3.select("#selDataset");

  // get the sample names and use a for loop to create dropdown select options
  d3.json(bellybutton).then(data => {

    let sampleIDs = data.names;

    for (let i = 0; i < sampleIDs.length; i++){
      dropdownMenu
        .append("option")
        .text(sampleIDs[i])
        .property("value" , sampleIDs[i]);
    }
    // grab the first sample name in the array
    let firstSample = sampleIDs[0]
    // Create Initial panel and charts with the first sample
    buildMetadata(firstSample)
    buildCharts(firstSample)

})
}

function optionChanged(newSample) {
  buildMetadata(newSample)
  buildCharts(newSample)
}
init();