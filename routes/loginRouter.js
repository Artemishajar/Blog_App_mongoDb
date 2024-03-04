const express = require("express");
const router = express.Router();
const {login,
    loginPage} = require("../controllers/usercont.js"); 
router.use(express.json());
router.get('/',loginPage);
router.post('/',login);  
 

module.exports=router;