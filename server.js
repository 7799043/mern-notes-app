require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// const userRouter = require('./routes/userRouter')
// const noteRouter = require('./routes/noteRouter')
// const path = require('path')


const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) =>{
   res.json('hello')
});


const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})


// Connect to MongoDB
const URI = process.env.MONGODB_URL
// mongoose.connect(URI, {
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, err =>{
//     if(err) throw err;
//     console.log('Connected to MongoDB')
// })

mongoose.connect(URI)
    .then(() => {
        console.log('Successfully Connected');
    })
    .catch(() => {
        console.error('Error');
    });