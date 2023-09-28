const express=require("express");
const router=express.Router();
const {signup,login,logout}=require("../controllers/auth");

router.post("/api/signup",signup);
router.post('/api/login',login);
router.get('/api/logout',logout);

module.exports=router;