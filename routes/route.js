const express=require("express")
const router=express.Router();
const {mainRoute}=require("../controller/route")
const {otherRoute}=require("../controller/route")
const {deleteItems}=require("../controller/route")
const {addItems}=require("../controller/route")

router.route("/").get(mainRoute).post(addItems);

router.get("/:router",otherRoute)
router.post("/delete",deleteItems)

module.exports=router;