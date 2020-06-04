var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
res.send("API is working properly");
});


router.get("/data/:libName/:dataSet",async function(req, res, next) {

    let currentLib = req.params.libName;
    if(currentLib === "Vis") {
        const parsedData = require("../../src/parsers/parserNeo4j/parseDataForVis");
        let data = await parsedData.parseNeo4jDataForVis();
        res.send({data: data});
    }
    else if(currentLib === "D3"){
        const parsedData = require("../../src/parsers/parserNeo4j/parseDataForVis");
        let data = await parsedData.parseNeo4jDataForD3();
        res.send({data: data});
    }
    else if(currentLib === "Cytoscape"){
        const parsedData = require("../../src/parsers/parserNeo4j/parseDataForVis");
        let data = await parsedData.parseNeo4jDataForCytoscape();
        console.log(data);
        res.send({elements: data});
   }
});

router.get("/dataD3",async function(req, res, next) {
    const test = require("../../src/dataBase/test");
    let cleanNeo4JDataBase = await test.cleanNeo4JDataBase();
    res.send({data: dataStackOverflow});
});

module.exports = router;
