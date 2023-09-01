const express=require("express")
const bodyParser=require("body-parser");
const { default: mongoose } = require("mongoose");
const date=require(__dirname+"/date.js")

mongoose.connect("mongodb://127.0.0.1:27017/TodoList");


const HomeitemsSchema=mongoose.Schema({
    name:String
})


HomeItem=new mongoose.model("item",HomeitemsSchema);


const item1=new HomeItem({
    name:"1st"
})

const item2=new HomeItem({
    name:"2nd"
})
var items=[item1,item2];
// item2.save();

const app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res)=>{
    let d=date.getDate();
    HomeItem.find({})
    .then(item=>{
        if(item.length==0){
            HomeItem.insertMany(items)
            .then(result=>{
                console.log("Updated");
            })
            .catch(error=>{
                console.log("error1")
            })
            res.redirect("/")
        }
        else{
            res.render("index",{name : d,newitem : item})
        }
    })
    .catch(error=>{
        console.log("errors2")
    })
});

app.get("/work",(req,res)=>{
    res.render("index",{name:"Work",newitem: Workitems});
});

app.post("/",(req,res)=>{
    if(req.body.button=="Work"){
        var b=req.body.items; 
        Workitems.push(b);
        res.redirect('/work')
    }
    else{
        var a=req.body.items; 
        var item=new HomeItem({
            name:a
        });
        item.save();
        res.redirect('/')
    }
})

HomeItem.find({})
.then(item=>{
    console.log(item.length)
})
app.listen(80,()=>{
    console.log("listening");
})