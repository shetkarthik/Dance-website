const express = require("express");
const path = require("path");
// const fs = require("fs");
const app =express();
const bodyparser = require("body-parser")
const port = 80;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String

  });
  const Contact = mongoose.model('Contact', contactSchema);

 app.use('/static', express.static('static'))
 app.use(express.urlencoded())

app.set('view engine','pug')
app.set('views' , path.join(__dirname, 'views'))

app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this data is saved to the database")
    }).catch(()=>{
        res.status(400).send("Item didnt approved")
    });
    // res.status(200).render('contact.pug');
})
    app.listen(port,()=>{
        console.log("the application is stated succesfully ");
    })

