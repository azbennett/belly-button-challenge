const json_location = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(json_location);
console.log("Data: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(json_location).then(function(data) {
  console.log(data);
  var dropdown = d3.select("#selDataset");
  data.names.forEach((name) => {
    dropdown.append("option").text(name).property("value", name);
  });

  const test_subject_id = data.names[0];
  bars(test_subject_id);
  bubbles(test_subject_id);
  guage(test_subject_id);
  demoinfo(test_subject_id);

});

function optionChanged(subjectID) {
    //runs my functions again when the drop down is changed
    bars(subjectID);
    bubbles(subjectID);
    guage(subjectID);
    demoinfo(subjectID);
  }

function demoinfo(subjectID) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      //grab the data
      var metadata = data.metadata;
      var resultData = metadata.filter(IDfunction => IDfunction.id == subjectID);
      var result = resultData[0];
  
      //select our div
      var demo_details = d3.select("#sample-metadata");
  
      //make sure we have nothing to start with from previous ID
      demo_details.html("");
  
      //add the meta data to the html page
      Object.entries(result).forEach(([key, value]) => {
        demo_details.append("h6").text(`${key}: ${value}`);
      });
    });
  };

  function bars(subjectID) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      //grab the data
      var samples = data.samples;
      var resultData = samples.filter(IDfunction => IDfunction.id == subjectID);
      var result = resultData[0];
  
      //top 10 using slice()
      var otu_ids = result.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      var sample_values = result.sample_values.slice(0, 10).reverse();
      var otu_labels = result.otu_labels.slice(0, 10).reverse();
  
      //trace
      var trace = {
        x: sample_values,
        y: otu_ids,
        text: otu_labels,
        type: "bar",
        orientation: "h"
      };
  
      //data
      var data = [trace];
  
      //layout
      var layout = {
        title: "Top 10 OTUs Found in Individual",
        margin: { t: 30, l: 150 }
      };
  
      //print my bar chart
      Plotly.newPlot("bar", data, layout);
    });
  }

  function bubbles(subjectID) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        //grab the data
        var samples = data.samples;
        var resultData = samples.filter(IDfunction => IDfunction.id == subjectID);
        var result = resultData[0];
    
        //grab the OTU info
        var otu_ids = result.otu_ids;
        var sample_values = result.sample_values;
        var otu_labels = result.otu_labels;
    
        //trace
        var bubbleTrace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
            }
        };
    
        //data      
        var bubbleData = [bubbleTrace];
  
        //layout
        var bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30 }
        };
    
        //print my bubble chart
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  
    });
  }

  //https://plotly.com/javascript/gauge-charts/#basic-gauge
  function guage(subjectID) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        //grab the data
        var metadata = data.metadata;
        var resultData = metadata.filter(IDfunction => IDfunction.id == subjectID);
        var result = resultData[0];
        var wfreq = result.wfreq;
    
        //trace
        var gaugeTrace = {
        type: "indicator",
        mode: "gauge+number",
        value: wfreq,
        title: { text: "Belly Button Washing Frequency<br>Scrubs per Week" },
        gauge: {
          axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
          bar: { color: "black" },
          steps: [
            { range: [0, 1], color: "#ffffe5" }, //https://www.colorhexa.com/ffffe5-to-005824
            { range: [1, 2], color: "#eaf1d5" },
            { range: [2, 3], color: "#d4e3c5" },
            { range: [3, 4], color: "#bfd5b5" },
            { range: [4, 5], color: "#aac7a5" },
            { range: [5, 6], color: "#95b995" },
            { range: [6, 7], color: "#6a9e74" },
            { range: [7, 8], color: "#408254" }, 
            { range: [8, 9], color: "#005824" } 
          ]
        }
      };
        //data
        var gaugeData = [gaugeTrace];
    
        //layout
        var gaugeLayout = {
            width: 600,
            height: 500,
            margin: { t: 0, b: 0 }
        };
    
        //print out the chart
        Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  
    });
  }
