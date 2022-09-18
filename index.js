const express = require("express");
const path = require("path");
const fs  = require("fs");
const app= express();
const port = 80;
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/portfolio'); // this is for database


// columns name
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    description: String
   
  });
//this is for table name
 const Contactus = mongoose.model('contactus', contactSchema);


app.use('/static', express.static('static'))
app.use(express.urlencoded())



//set the template engine as pug
// app.set('view engine' , 'pug')

//set views directory
app.set('views', path.join(__dirname,'views'))


//set template as ejs
 app.set('view engine', 'ejs');

// end  point
// app.get("/",(req,res)=>{
//         res.status(200).render("index.ejs")
    // });
    app.get("/", function(req, res) {  
        res.status(200).render("index.ejs");
      });


app.post("/", (req, res)=>{
    var myData = new Contactus(req.body);
    myData.save().then(()=>{
    res.send(  ` <script>
    alert('success data submitted')
    </script>
    ` )
    }).catch(()=>{
    res.status(400).send(`<script>
    alert("oops data not submitted please try again")
    </script>`)
});
})    







// app.post("/",(req,res)=>{
//       name=req.body.name
//       password=req.body.password
//       description=req.body.description
//       let output = `the name of the client is ${name}, password is ${password} and info abt him is ${description}`
//       fs.writeFileSync('output.txt',output)
//         const params={'message': 'this is good thing'}
//         res.status(200).render("index.pug",params)
//     });












// app.get("/demo",(req,res)=>{
//     res.status(200).render('demo',{title:'hey asher',message:'hello there and thanksss for using express'})
// });


// app.get("/home",(req,res)=>{
//     res.send("this is my home first express app with asher")
// });
// app.get("/about",(req,res)=>{
//     res.send("this is my about  first express app with asher")
// });
// app.post("/about",(req,res)=>{
//     res.send("this is post about page of  my first express app with asher")
// });
// app.get("/this",(req,res)=>{
//     res.status(404).send("this page not found")
// });
// app.get("/contact",(req,res)=>{
//     res.status(200).send("this page is contact us");
// });

app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`);
})
