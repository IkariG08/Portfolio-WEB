const express = require("express");
const bodyParser = require("body-parser"); 
const app = express();
const https=require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");


const url="https://api.toys/api/rock_paper_scissors";

app.get("/", (req, res) => {
    const url=
    res.render("index");
});

app.get("/city", (req,res) => {
    var l_url=url
})

app.get("/waifu", (req, res) => {
    var l_url=url + "/rock"
    https.get(l_url, (response) => {
        //console.log(response);
        console.log(response.statusCode);
        if(response.statusCode==200){
            response.on("data",(data) => {
                //console.log(data);
                const player=JSON.parse(data);
                console.log(player);
                res.write("<h1> On my selection of rock, we get: </h1><br/>");
                res.write("<h2>" + player.cpu + "</h2><br/>");
                res.write("<h1>" + player.move + "</h1><br/>");
                res.write(player.cpu);
                res.send();
        });
    } else{
        throw  new Error("Bad response");
    }

    });     
});


app.use((err,req,res,next)=>{
    console.error(err.stack);
    res
        .status(500)
        .render("error",{ 
            message: err.message ,
        });
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});