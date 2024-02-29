const {HomeItem}=require("../model/model")     
const {List}=require("../model/model")     
const {defaultItems}=require("../model/model")     

const mainRoute=(req,res)=>{
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
        console.log(error)
    })
}
const otherRoute=(req,res)=>{
        const customName=req.params.router;
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
}

const deleteItems=(req,res)=>{
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
}

const addItems=(req,res)=>{
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
}

module.exports={
    mainRoute,otherRoute,deleteItems,addItems
}
