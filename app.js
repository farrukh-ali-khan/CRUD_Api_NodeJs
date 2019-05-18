// avoid duplicate variables initialization
'use strict';

// Require packages
const
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// Object id for delete and update
var ObjectId = mongoose.ObjectId;

// Import Model
var User = require('./models/userModel');

// Initialize
const app = express();

// Database connection
mongoose.connect('mongodb://localhost/crud', { useNewUrlParser: true });

// Using body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Api routes

// get all user
app.get('/user', (req, res) => {
    User.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.send("error " + err);
        });
});

// post user
app.post('/user/add', (req, res) => {
    var myData = new User(req.body);
  myData.save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// delete user by id
app.delete('/user/delete/:id', (req, res) =>{
    User.deleteOne({_id: req.params.id}, (err) => {
        if(err){
            console.log(err);
        }
        res.send('Deleted Successfully');
    })
});

// update user by id
app.put('/user/update/:id', (req, res) =>{
    var query = {_id: req.params.id};
    User.updateOne(query,  {$set:{username: req.body.username,title: req.body.title,description: req.body.description}}, (err) => {
        if(err){
            console.log(err);
        }
        res.send('Updated Successfully');
    })
});

// Server listening
const server = app.listen(3000, function () {
    const port = server.address().port

    console.log("app listening at ", port)
});