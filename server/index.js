require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const PORT = process.env.PORT || 5000

//middleware
app.use(express.json())

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://aurorawebdev:${process.env.DB_PASSWORD}@comic.ikptc.mongodb.net/${process.env.DB_USERNAME}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('Connect DB Success')
    } catch (error) {
        console.log(error)
    }
}
connectDB()

app.get('/', (req, res) => {
    res.send('hello word')
})

app.listen(PORT, () => {
    console.log('Successfully')
})