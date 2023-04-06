// Get the data endpoint
const bellybutton = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init() {

  let selector = d3.select("#selDataset");

  d3.json(bellybutton).then(data => {
    let sampleIDs = data.names;

    for (let i = 0; i < sampleIDs.length; i++){
      selector
        .append("option")
        .text(sampleIDs[i])
        .property("value" , sampleIDs[i]);
    }

  let firstsample = sampleIDs[0];

  function buildMetadata(sample){
    let metadata = data.metadata;

    let currentSample = metadata.filter((subject) => subject.id == sample)

    

   let panel =  d3.select('#sample-metadata');

      for (let i = 0; i < currentSample.length; i++){
            console.log(currentSample[i])
      }

      // figure out how to get through the object insde the array 

      console.log(currentSample)
    
      
  }



  buildMetadata(firstsample);

})
}
init();