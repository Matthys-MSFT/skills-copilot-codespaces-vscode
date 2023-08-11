// Create web server
// 1. Create web server
// 2. Define routes
// 3. Start web server

// 1. Create web server
// Import express
const express = require('express')
// Create web server
const app = express()
// Listen to incoming request
app.listen(3000, () => {
    console.log('Server started')
})

// 2. Define routes
// GET /comments
app.get('/comments', (req, res) => {
    res.send('GET /comments')
}
)
// POST /comments
app.post('/comments', (req, res) => {
    res.send('POST /comments')
}
)
// GET /comments/:id
app.get('/comments/:id', (req, res) => {
    res.send('GET /comments/:id')
}
)
// PUT /comments/:id
