const express=require("express");
const{createWebinar}=require("../controllers/webinarController");
const {verifyToken,isExpert}=require("../middleWares/authMiddleware")


const router=express.Router();

router.route("/").post(verifyToken,isExpert,createWebinar);

module.exports = router;