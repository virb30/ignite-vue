import express from 'express'
import cookieParser from 'cookie-parser'
import subscribe from './subscribe'
import webhooks from './webhooks'

const app = express()

app.use(cookieParser())
app.post('/subscribe', subscribe)
app.all('/webhooks', webhooks)

export default app
