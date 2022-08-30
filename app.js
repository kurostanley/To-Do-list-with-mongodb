const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();


app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb://localhost:27017/todolistDB")


const itemSchema = {
    name: String,
};

const Item = mongoose.model("Item", itemSchema); //Item is collection name

const item1 = new Item({ name: "try to"});
const item2 = new Item({ name: "add "});
const item3 = new Item({ name: "some todo "});

const d = [item1, item2, item3];



app.get('/', function(req, res){
    Item.find({}, function(err,f){
        if(f.length === 0){
            Item.insertMany(d, function(err){
                if(err){
                    console.log(err)
                }else{
                    console.log("Initial")
                }
            })
            res.redirect('/')
        }else{
            res.render('index', {newListItem: f, name: 'Lin'});
        }   
    })
});




// add new to-do
app.post('/', function(req, res){
    let i =  req.body.inputfield;
    const item = new Item({
        name: i,
    });
    item.save();
    res.redirect('/')
})


// delete a to-do
app.post('/delete', function(req, res){
    Item.findByIdAndRemove(req.body.checkbox, function (e){
        if(!e){
            console.log("success delete");
            res.redirect('/')
        }
    })
})

// add reset button
app.post('/reset', function(req, res){
    Item.remove({},function(e){
        console.log('reset');
    });
    res.redirect('/');
})



// server configuration
app.listen(3000, () => console.log('server started listening on port 3000'))







