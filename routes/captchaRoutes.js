const express = require("express");
const router = express.Router();
const axios = require('axios')

router.post("/verify",async (req, res) => {
  await axios
  .post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_KEY}&response=${req.body.value}`)
  .then((response) => {
    response = JSON.stringify(response.data)
    console.log(`statusCode: ${response}`)
    res.json({response})
  })
  .catch(error => {
    console.error(error)
    res.json({err: error.message})
  })

});

module.exports = router;
