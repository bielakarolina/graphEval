module.exports = {

    parseNeo4jDataForVis: async function () {
        const test = require("../../dataBase/test");
        let dataStackOverflow = await test.loadStackOverflowData();
        let nodes = [];
        let edges = [];
        let ids = {};
        let groups ={};
        dataStackOverflow.forEach(function (fields) {
            let c = 0;
            fields.forEach(function (singleField, index) {
                if (index % 2 !== 1) {
                    let id = singleField["identity"];
                    let label = singleField["labels"];
                    let properties = singleField["properties"];
                    if(groups[label[0]]===undefined) {
                        groups[label[0]] = c;
                        c+=1;
                    }
                    let node = {
                        id: id["low"],
                        label: properties["title"] || properties["name"] || properties["display_name"] || label[0],
                        group: groups[label[0]],
                        properties: properties,
                    };
                    let p = id["low"].toString();

                    if(ids[p]===undefined) {
                        ids[p]=true;
                        nodes.push(node);
                    }

                }
                else {
                    let relationshipTitle = singleField;
                    let from = fields[index - 1];
                    let fromIdentity = from["identity"];
                    let to = fields[index + 1];
                    let toIdentity = to["identity"];

                   // console.log(to);
                    let edge = {
                        from: fromIdentity["low"],
                        to: toIdentity["low"],
                        title: relationshipTitle
                    };
                    edges.push(edge);
                }
            })
        });
        // console.log(nodes, edges);
        return {nodes: nodes, edges: edges};
    },

    parseNeo4jDataForD3: async function () {
        const test = require("../../dataBase/test");
        let dataStackOverflow = await test.loadStackOverflowData();
        let nodes = [];
        let edges = [];
        let ids = {};
        let groups ={};
        dataStackOverflow.forEach(function (fields) {
            let c = 0;
            fields.forEach(function (singleField, index) {
                if (index % 2 !== 1) {
                    let id = singleField["identity"];
                    let label = singleField["labels"];
                    let properties = singleField["properties"];
                    if(groups[label[0]]===undefined) {
                        groups[label[0]] = c;
                        c+=1;
                    }
                    let node = {
                        id: id["low"],
                        label: properties["title"] || properties["name"] || properties["display_name"] || label[0],
                        type: groups[label[0]],
                        properties: properties,
                    };
                    let p = id["low"].toString();

                    if(ids[p]===undefined) {
                        ids[p]=true;
                        nodes.push(node);
                    }

                }
                else {
                    let relationshipTitle = singleField;
                    let from = fields[index - 1];
                    let fromIdentity = from["identity"];
                    let to = fields[index + 1];
                    let toIdentity = to["identity"];

                    // console.log(to);
                    let edge = {
                        source: fromIdentity["low"],
                        target: toIdentity["low"],
                        title: relationshipTitle
                    };
                    edges.push(edge);
                }
            })
        });
        // console.log(nodes, edges);
        return {nodes: nodes, links: edges};
    },
    parseNeo4jDataForCytoscape: async function () {
        const test = require("../../dataBase/test");
        let dataStackOverflow = await test.loadStackOverflowData();
        let elements = [];
        let edges = [];
        let ids = {};
        let groups ={};
        dataStackOverflow.forEach(function (fields) {
            let c = 0;
            fields.forEach(function (singleField, index) {
                let data = {};


                if (index % 2 !== 1) {
                    let position = {"position":{"x":1452.639173965406,"y":609.3619416544145}};
                    data = {position};

                    let id = singleField["identity"];
                    let label = singleField["labels"];
                    let properties = singleField["properties"];
                    if(groups[label[0]]===undefined) {
                        groups[label[0]] = c;
                        c+=1;
                    }
                    let node = {
                        id: id["low"],
                        text: properties["title"] || properties["name"] || properties["display_name"] || label[0],
                        type: groups[label[0]],
                        group: "nodes",
                    };
                    let p = id["low"].toString();

                    if(ids[p]===undefined) {
                        ids[p]=true;
                        data = {...node};
                        elements.push({data: data});
                    }

                }
                else {
                    let relationshipTitle = singleField;
                    let from = fields[index - 1];
                    let fromIdentity = from["identity"];
                    let to = fields[index + 1];
                    let toIdentity = to["identity"];

                    // console.log(to);
                    let edge = {
                        id: fromIdentity["low"]+toIdentity["low"],
                        source: fromIdentity["low"],
                        target: toIdentity["low"],
                        text: relationshipTitle,
                        group: "edges"
                    };
                    data = {...edge};
                    elements.push({data: data});
                }
            })
        });
        // console.log(nodes, edges);
        return elements;
    }
};