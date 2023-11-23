const express=require("express");
const app=express();
const bodyParser=require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);

const names=[];

app.get("/", (req,res) => {
    res.render("index");
})

app.get("/greet", (req,res) => {
    var name=req.query.name;
    names.push(name);
    for(i=0;i<names.length;i++){
        console.log(names[i]);
        res.write("<h1> Hello " + names[i] + "!! </h1>");
    }
    


})

app.listen(3000, () =>{
    console.log("Listening on port 3000");
});