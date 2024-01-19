import express from "express";
import https from 'https'
import fs from 'fs'

import cors from 'cors'
import { config } from 'dotenv'
config()

const app = express();

// Import routers
import adminRoutes from './routes/admin.js'
import apiRoutes from './routes/api.js'

app.use(cors())

app.use('/api/admin', adminRoutes)
app.use('/api', apiRoutes)

app.get('/', async (req, res) => {
    try {
        res.json({ message: "Hey there" })
    } catch (error) {
        res.json({
            error: "Unable to GET / Route",
            message: error
        })
    }
})

const server = https.createServer(
  {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  },
  app
);


server.listen(process.env.PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server is running on port ${process.env.PORT}`);
})