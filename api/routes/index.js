var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
res.send("API is working properly");
});


router.get("/data",async function(req, res, next) {
    const test = require("../../src/dataBase/test");

    const parsedData = require("../../src/parsers/parserNeo4j/parseDataForVis");
    console.log("duuupa");
    let dataStackOverflow = await test.loadStackOverflowData();
    console.log(dataStackOverflow);

    let data = await parsedData.parseNeo4jDataForVis();
    //console.log(dataStackOverflow);
   // let cleanNeo4JDataBase = await test.cleanNeo4JDataBase();
    res.send({data: data});
});

router.get("/dataD3",async function(req, res, next) {
    const test = require("../../src/dataBase/test");
    let cleanNeo4JDataBase = await test.cleanNeo4JDataBase();
    res.send({data: dataStackOverflow});
});

module.exports = router;
