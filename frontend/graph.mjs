const graphDiv = document.getElementById("graph");

fetch(
    "https://dssd-oa.onrender.com/" //use "http://localhost:3000" if running sample express backend locally, or replace with your own backend endpoint url
).then(async res => {
    const data = await res.json();
    
    // Create a scatterplot using Plotly
    const trace = {
        x: data.map(item => item.weight), // Assuming your data has a "weight" property
        y: data.map(item => item.squatMax), // Assuming your data has a "squatMax" property
        mode: 'markers',
        type: 'scatter',
        marker: { size: 10 }
    };

    const layout = {
        title: 'Weight vs Squat Max',
        xaxis: {
            title: 'Weight (lbs)', // Customize the x-axis title
            // Add more x-axis customizations here if needed
        },
        yaxis: {
            title: 'Squat Max (lbs)', // Customize the y-axis title
            // Add more y-axis customizations here if needed
        }
    };

    Plotly.newPlot(graphDiv, [trace], layout);
});

