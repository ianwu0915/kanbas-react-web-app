import express from 'express'  // Import express
import Hello from './Hello.js'  // Import Hello.js
import Lab5 from './Lab5/index.js'
import cors from "cors";

const app = express()  // Create an express app
app.use(cors());   
app.use(express.json()); // Enable JSON parsing
app.listen(process.env.PORT || 4000) // Start the server on port 4000

Hello(app)
Lab5(app)
