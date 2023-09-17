import express from "express"
import cors from "cors"
import fs from "fs";
import csv from "csv-parser";

const app = express()

app.use(cors({
    origin: "http://localhost:5500"
}))

app.get("/", (req, res) => {
    const data = [];
    fs.createReadStream("data.csv")
        .pipe(csv())
        .on("data", (row) => {
            data.push(row);
        })
        .on("end", () => {
            // Send the parsed data as a JSON response
            res.json(data);
        })
        .on("error", (error) => {
            console.error("Error reading CSV file:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server listening on port ${port} 🚀`))