// Get the data endpoint
const bellybutton = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


function init(){
// Fetch the JSON data and console log it
d3.json(bellybutton).then(data => {

 // set arrays equal to the data 
  let  names = data.names;
  let  metadata = data.metadata;
  let  sampleData = data.samples;
// log each array 
  //console.log(names);
  //console.log(metadata);
  //console.log(sampleData)
// grab first sample to start chart  
  let firstSample = names[0];
  console.log(firstSample)

  function selectData(testSubject){
   return testSubject.id === firstSample
  }

 let  samples = sampleData.filter(selectData);
 
  let sortedValues =  samples.sort((a , b ) => b.sample_values - a.sample_values);
  let labels =  sortedValues[0].otu_ids.slice(0 , 10)
  let values = sortedValues[0].sample_values.slice(0, 10)
  console.log(labels)
  console.log(values)

  let reversedLabels = "otu" + labels.reverse()
  let reversedValues = values.reverse()


let trace1 = {
  x: reversedValues,
  y: reversedLabels,
  type: "bar",
  orientation: "h"
}

let tracedata = [trace1]

Plotly.newPlot("bar" , tracedata)


})

}

init();
