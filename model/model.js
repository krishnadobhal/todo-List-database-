const mongoose = require("mongoose");
const Mongo_URL= process.env.MONGO_URL || "mongodb://127.0.0.1:27017/TodoList"
mongoose.connect(Mongo_URL);

const HomeitemsSchema=mongoose.Schema({
    name:String
})
const HomeItem=mongoose.model("item",HomeitemsSchema); 

const item1=new HomeItem({
    name:"Add Items"
})
const item2=new HomeItem({
    name:"<--Click Here to delete"  
})
const defaultItems=[item1,item2];

const listItemsSchema=mongoose.Schema({
    name:String,
    items:[HomeitemsSchema]
})

const List=new mongoose.model("List",listItemsSchema)

module.exports={
    HomeItem,List,defaultItems
}