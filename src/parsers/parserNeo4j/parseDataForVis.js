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
                    relationshipTitle = singleField;
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
    }
};