const express=require("express")
const bodyParser=require("body-parser");
const mongoose = require("mongoose");
const Route=require("./routes/route")

const Mongo_URL= process.env.MONGO_URL || "mongodb://127.0.0.1:27017/TodoList"
mongoose.connect(Mongo_URL);


const app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use("/",Route);

const PORT=process.env.PORT || 80
app.listen(PORT,()=>{
    console.log("listening");
})