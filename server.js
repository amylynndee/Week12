let express = require('express')
let api_routes = require('./routes/api.js')

// create web application
let app = express()

// be able to handle JSON requests, convert data to JavaScript
app.use(express.json())

app.use('/api', api_routes)

//Start server running
let server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port', server.address().port)
})

