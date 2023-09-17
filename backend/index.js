import express from "express"
import cors from "cors"
import fs from "fs";
import readline from "readline";

const app = express()

app.use(cors({
    origin: "http://localhost:5500"
}))

app.get("/", (req, res) => {
    const data = [];
    const filePath = "powerliftingData.csv";

    // Create a readable stream to read the CSV file line by line
    const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        output: process.stdout,
        terminal: false
    });

    let lineCt = 0;

    rl.on("line", (line) => {
        if(lineCt != 0){
            // Split each line into an array using a comma as the delimiter
            const values = line.split(",");
        
            // Assuming the first value is 'x' and the second is 'y'
            const weight = parseFloat(values[5]);
            const squatMax = parseFloat(values[6]);

            // Push the data to the array
            data.push({ weight, squatMax });
        }
        lineCt++;
    });

    rl.on("close", () => {
        // Send the parsed data as a JSON response
        res.json(data);
    });

    rl.on("error", (error) => {
        console.error("Error reading CSV file:", error);
        res.status(500).json({ error: "Internal Server Error" });
    });
});


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server listening on port ${port} 🚀`))