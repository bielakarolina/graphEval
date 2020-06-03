
var OrientDB = require('orientjs');
module.exports = {
    queryNeoData: async function (log = false) {
        let server = OrientDB({
            host: 'localhost',
            port: 2424,
            username: 'admin',
            password: 'admin',
            useToken: true
        });


        server.create({
            name: 'graphdb',
            type: 'graph',
            storage: 'plocal'
        })
            .then(
                function (create) {
                    console.log('Created Database:', create.name);
                }
            );


        var db = server.use('graphdb');

        var hitters =
            console.log('Using Database:', db.name);

        try {
            const {records} = await db.query(
                'SELECT name, battavg FROM Player WHERE battavg >= :ba AND team = :team',
            ).then(
                function (players) {
                    console.log(players);
                }
            );
            if (log) console.log(allFields)
        } finally {
            server.close();

        }
        return allFields;
    },
    importJson: async function () {
        const fs = require('fs');
        // var request = require('request');
        // request("https://api.stackexchange.com/2.2/questions?pagesize=3&order=desc&sort=creation&tagged=java&site=stackoverflow&filter=!5-i6Zw8Y)4W7vpy91PMYsKM-k9yzEsSC1_Uxlf", function (error, response, body) {
        //     if (!error && response.statusCode == 200) {
        //         console.log("*******************************");
        //         console.log(response);
        //      //   var importedJSON = JSON.parse(response.body);
        //         //console.log(importedJSON);
        //     }
        // })

        const fetch = require('node-fetch');

        let url = "https://api.stackexchange.com/2.2/questions?pagesize=10&order=desc&sort=creation&tagged=java&site=stackoverflow&filter=!5-i6Zw8Y)4W7vpy91PMYsKM-k9yzEsSC1_Uxlf";

        let settings = { method: "Get" };

        let json = await fetch(url, settings)
            .then(res => res.json())
            .then((json) => {
               return json;
            });
      //  console.log(json);
        fs.writeFile("json.json",JSON.stringify(json.items), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }

            console.log("JSON file has been saved.");
        });



        let q = json.items;

        var fields = Object.keys(q[0]);
        var replacer = function(key, value) { return value === null ? '' : value }
        var s = q.map(function(row){
            return fields.map(function(fieldName){
                return JSON.stringify(row[fieldName], replacer)
            }).join(',')
        })
        var csv = s.unshift(fields.join(',')) // add header column
       // console.log(csv)

        let questions = [];
        let tags = [];
        let idTags = [];
        let answers = [];
        let users = [];
        q.forEach(function (item,index) {


            let question = {
                id: item.question_id,
                title: item.title,
                share_link: item.share_link,
                favorite_count: item.favorite_count
            };
            question["tagged"] = [];
            item.tags.forEach(function (t, ind) {
                let tag = {
                    id: index.toString()+ind,
                    name:t
                };
                if(idTags[tag.name] === undefined) {
                    tags.push(tag);
                    idTags[tag.name] = tag.id;
                    question["tagged"].push(tag.id);
                } else question["tagged"].push(idTags[tag.name]);
            });
            question["answers"] = [];
            if(item.answers !==undefined)
            item.answers.forEach(function (a) {
                let answer = {
                    id: a.answer_id
                };

                question["answers"].push(answer.id);
                let owner = a.owner;
                let userAnswerer = {
                    id: owner.user_id,
                    display_name: owner.display_name,
                    role: "answerer"
                };
                users.push(userAnswerer);
                answer["provided"] = userAnswerer.id;
                answers.push(answer);
            });

            let o = item.owner;
                if(o !==undefined){
                    let userOwner = {
                        id: o.user_id,
                        display_name: o.display_name,
                        role: "owner"
                    };
                    users.push(userOwner);
                    question["provided"]=userOwner.id
                }
            questions.push(question);

        });
        console.log(questions);
        console.log(answers);
        console.log(users);
        console.log(tags);


       var jsonObj = JSON.parse(questions);
        var jsonContent = JSON.stringify(questions);
        console.log(jsonContent);

        fs.writeFile("stack.csv", csv, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }

            console.log("JSON file has been saved.");
        });

        // fs.writeFile("json.json", s, 'utf8', function (err) {
        //     if (err) {
        //         console.log("An error occured while writing JSON Object to File.");
        //         return console.log(err);
        //     }
        //
        //     console.log("JSON file has been saved.");
        // });
        fs.close()
    }
};
