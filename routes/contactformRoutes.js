const express = require("express");
const Email = require("./../utils/email");
const router = express.Router();

router.post("/submit",async (req,res)=>{
    let info = req.body
    let user = {
        email:"valuersconnect@gmail.com"
    }
    let email = new Email(user,"");
    await email.send("contactform",info);
    res.json({
        msg:"Contact Form submitted Successfully!"
    })
})

module.exports = router;