const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser')

//using cors to be able to connect to the page correctly
const cors = require('cors');

// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

//main method to collect to the database
async function main() {
    //connects to online database 
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.rpvx1ef.mongodb.net/?retryWrites=true&w=majority');

}
//creates the books schema to store the books 
const bookSchema = new mongoose.Schema({
    title: String,
    cover: String,
    author: String
});

//generate model for schema to interact with database 
const bookModel = mongoose.model('books', bookSchema);

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//listens for the post request 
app.post('/api/books', (req, res) => {
    //creates a record in the database that it is equal to the request 
    bookModel.create({
        title: req.body.title,
        cover: req.body.cover,
        author: req.body.author
    })
    res.send("Data recieved");
})

//links to the pages
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/datarep', (req, res) => {
    res.send('Welcome to data rep!')
})


app.get('/Hello/:name', (req, res) => {
    console.log(req.params.name);
    res.send('Hello' + req.params.name)

})

app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/name', (req, res) => {
    console.log(req.query.lname);
    res.send('Hello: ' + req.query.lname + '' + req.query.fname)
})

app.post('/name', (req, res) => {
    console.log(req.body)
    res.send("hello from post" + req.body.fname + '' + req.body.lname);

})

//accessing and display book array
app.get('/api/books', (req, res) => {

    bookModel.find((error, data) => {
        res.json(data);
    })


})
//allow us to search by ID
app.get('/api/books/:id', (req, res) => {

    console.log(req.params.id);
    bookModel.findById(req.params.id, (error, data) => {
        res.json(data);
    })
}
)
//writes to the console
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})