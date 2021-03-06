

const express = require("express");
var _ = require('lodash');
const mongoose=require("mongoose");
const ejs = require("ejs");

//database code
mongoose.connect(process.env.DATABASE);
const itemsSchema = new mongoose.Schema({
  title:String,
  post:String
});
const Item = mongoose.model('Item', itemsSchema);




const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  Item.find({},function(err,foundItem) {
    
    res.render("home",{homeStartingContent:foundItem});
  })
})

app.get("/contact",function(req,res){
 res.render("contact",{contactContent:contactContent});
})

app.get("/about",function(req,res){
 res.render("about",{aboutContent:aboutContent});
})

app.get("/compose",function(req,res){
 
  res.render("compose");
})

app.get('/posts/:postID', function (req, res) {
  let temp=req.params.postID;
 
  Item.findOne({_id:temp},function(err,value) {
    res.render("post",{title:value.title,content:value.post});
  })
  
  
});

app.post("/compose",function(req,res){

  const newItem = new Item({ title: req.body.postTitle,post:req.body.postBody });
 newItem.save();
  
  res.redirect("/");
})










let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}


app.listen(port, function() {
  console.log("Server started Successfully");
});
