const express = require('express')
const routes = require('./routes')
const app = express()
const session = require('express-session')

const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'miaw',
    resave: false,
    saveUninitialized: true
  }))

app.use('/', routes)


app.listen(PORT, ()=> {
    console.log(`Semangat ${PORT}`)
})