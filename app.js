const express=require("express")
const bodyParser=require("body-parser");
const { default: mongoose } = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/TodoList");

const HomeitemsSchema=mongoose.Schema({
    name:String
})
const HomeItem=mongoose.model("item",HomeitemsSchema); 

const item1=new HomeItem({
    name:"1st"
})
const item2=new HomeItem({
    name:"2nd"
})
const defaultItems=[item1,item2];

const listItemsSchema=mongoose.Schema({
    name:String,
    items:[HomeitemsSchema]
})

const List=new mongoose.model("List",listItemsSchema)

const app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res)=>{
    HomeItem.find({})
    .then(item=>{
        if(item.length==0){
            HomeItem.insertMany(defaultItems)
            .then(result=>{
                console.log("Updated");
            })
            .catch(error=>{
                console.log("error1")
            })
            res.redirect("/")
        }
        else{
            res.render("index",{name : "Home",newitem : item})
        }
    })
    .catch(error=>{
        console.log("errors2")
    })
});

app.get("/:route",(req,res)=>{
    const customName=req.params.route;
    List.findOne({name:customName})
        .then((item)=>{
            if(!item){
                const list=new List({
                    name:customName,
                    items:defaultItems
                })
                list.save()
                console.log("Added")
                res.redirect("/"+customName)
                
            }
            else{
                res.render("index",{name : item.name,newitem : item.items})
            }
        })
        .catch((error)=>{
            console.log("error4")
        })
})

app.post("/",(req,res)=>{
    let a=req.body.items; 
    let ListName=req.body.button;
    let item=new HomeItem({
        name:a
    });
    if(ListName=="Home"){
        item.save();
        res.redirect('/')
    }
    else{
        List.findOne({name:ListName})
            .then((result)=>{
                result.items.push(item)
                result.save()
                res.redirect('/'+req.body.button)
            })
            .catch((error)=>{
                console.log("error5")
            })
    }
})

app.post("/delete",(req,res)=>{
    let a=req.body.checkbox;
    let ListName =req.body.List; 
    if(ListName=="Home"){
        HomeItem.deleteMany({_id:a})
        .then(result => {
            console.log(`Deleted documents.`+a);
        })
        .catch(error => {
            console.error(`Error deleting documents`);
        });
        res.redirect('/')
        }
        else{
            List.findOneAndUpdate({name:ListName},{$pull:{items:{_id:a}}})
                .then(result => {
                    console.log(`Deleted documents.`+a);
                })
                .catch(error => {
                    console.error(`Error deleting documents`);
                });
                res.redirect("/"+ListName)
    }
})
app.listen(80,()=>{
    console.log("listening");
})