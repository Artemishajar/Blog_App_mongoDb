const express = require("express");
const router = express.Router();
const {registerPage,
    register} = require("../controllers/usercont.js"); 
router.use(express.json());
router.get('/',registerPage);
router.post('/',register);  
 

module.exports=router;