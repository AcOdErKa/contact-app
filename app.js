const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

app = express();
const route = require('./routes/route');
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/contactlist', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB Database @27017")
});

mongoose.connection.on('error', (err) => {
    console.log("Connection Error: " + err);
})

app.use(cors());
app.use(bodyparser.json());
app.use('/api', route);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res) => {
    res.send('Welcome to contact-list server');
})
app.listen(PORT, (err, cb) => {
    if(err) {
        console.log("Server failed to start");
    }else{
        console.log("Connected to port: "+PORT);
    }
})
