import "dotenv/config";

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'

import { createAccountRouter } from './routes/create-account.js'
import { healthRouter } from './routes/health.js'
import { loginRouter } from './routes/login.js'

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
app.use(createAccountRouter)
app.use(loginRouter)

const port = Number(process.env.PORT) || 3333

app.listen(port, () => {
    console.log(`HTTP server running on port ${port}`)
})
