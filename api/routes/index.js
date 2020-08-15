var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
res.send("API is working properly");
});


router.get("/data/:libName/:dataSet",async function(req, res, next) {

    let currentLib = req.params.libName;
    let dataSetName = req.params.dataSet;
    console.log(dataSetName)
    const parsedData = require("../../src/parsers/parserNeo4j/parseData");

    let data = await parsedData.parseNeo4jDataComponent(currentLib,dataSetName)
    //let data = await parsedData.parseNeo4jDataForD3()
   // console.log(data)
    if(currentLib == "cytoscape") res.send({data: {elements: data}});
    else res.send({data: data});
});

module.exports = router;
