require('dotenv').config()
const express = require('express')
const http = require('http')
const helmet = require('helmet')
const cors = require('cors')

const homeRoutes = require('./routes/home')
const authRoutes = require('./routes/auth')

const app = express()
const server = http.createServer(app)

// middlewares
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 

// routes
app.use('/', homeRoutes)
app.use('/auth', authRoutes)
// TODO: Undefined routes

// errors
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err)
    res.status(500).json({ error: 'Internal Server Error' })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`CLID server listening on ${PORT}`)
})
