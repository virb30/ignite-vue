import express from 'express'
import cookieParser from 'cookie-parser'
import subscribe from './subscribe'

const app = express()

app.use(cookieParser())
app.post('/subscribe', subscribe)

export default app
