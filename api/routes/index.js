var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
res.send("API is working properly");
});


router.get("/data",async function(req, res, next) {
    const test = require("../../src/dataBase/test");
    let data = await test.doIt();
    console.log(data);
    res.send({data: data});
});

module.exports = router;
