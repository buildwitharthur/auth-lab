import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'

import { healthRouter } from './routes/health.js'

const app = express()

app.use(
    cors({
        origin: process.env.WEB_URL ?? 'http://localhost:5173',
        credentials: true,
    }),
)

app.use(express.json())
app.use(cookieParser())

app.use(healthRouter)

const port = Number(process.env.PORT) || 3333

app.listen(port, () => {
    console.log(`HTTP server running on port ${port}`)
})
